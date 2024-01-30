import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import { v1 as uuid } from 'uuid';
import axios from 'axios';

const persons = [
    {
        id: "abc123",
        name: "Pablo",
        phone: "",
        city: "Medellin",
        street: "cra 1 #2-3",
    },
    {
        id: "def456",
        name: "Pepito",
        phone: "370-67-32",
        city: "Popayan",
        street: "cra 1 #4-5",
    },
    {
        id: "hij789",
        name: "Pepita",
        phone: "340-78-51",
        city: "Bogota",
        street: "cra 1 #6-7",
    },
]

const typeDefinitions = `
    enum YesNo{
        YES
        NO
    }
    type Address {
        city: String!
        street: String!
    }

    type Person {
        id: String!
        name: String!
        phone: String
        address: Address!
    }

    type Query {
        personCount: Int!
        allPersons(withPhone:YesNo): [Person]!
        findPerson(name: String!): Person
    }

    type  Mutation {
        addPerson(
            name: String!
            phone: String
            city: String!
            street: String!
        ): Person

        editNumber(
            name: String!
            phone: String!
        ): Person
    }

`
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: async (root, args) => {
            const {data: personsFromRestApi } = await axios.get('http://localhost:3000/persons')

            if (!args.withPhone) return personsFromRestApi

            const byPhone = person => args.withPhone === "YES" ? person.phone : !person.phone
            
            return personsFromRestApi.filter(byPhone)
        },
        findPerson: async (root, args) => {
            const {name} = args
            const {data: personsFromRestApi } = await axios.get('http://localhost:3000/persons')

            return personsFromRestApi.find(person => person.name === name)
        }
    },
    Person: {
        address: (root) => {
            return {
                city: root.city,
                street: root.street
            }
        }
    },
    Mutation: {
        addPerson: async (root, args) => {
            const {data: personsFromRestApi } = await axios.get('http://localhost:3000/persons')

            if (personsFromRestApi.find((p)=> p.name === args.name)) {
                
                throw new GraphQLError("Error, name must be unique XD", {
                    extensions: {
                      code: 'USER_INPUT_ERROR_GraphQLError',
                      //myExtension: "foo",
                    },
                  });

                  
            }
            const newPerson = {...args, id: uuid() }
            const {data: personCreated } = await axios.post("http://localhost:3000/persons", newPerson);
            console.log(personCreated);
            return personCreated;
        },
        editNumber: async (root, args) => {
            const {data: personsFromRestApi } = await axios.get('http://localhost:3000/persons')
            const personIndex = personsFromRestApi.findIndex(p => p.name === args.name)
            if (personIndex === -1) {
                 
                throw new GraphQLError("Error, not found person", {
                    extensions: {
                      code: 'USER_INPUT_ERROR_GraphQLError',
                      //myExtension: "foo",
                    },
                  });
            }

            const person = personsFromRestApi[personIndex]
            const updatedPerson = {...person, phone: args.phone}
            const {data: response } = await axios.put(`http://localhost:3000/persons/${personsFromRestApi[personIndex].id}`, updatedPerson)
           
            /*
            const person = personsFromRestApi[personIndex]
            const updatedPerson = {...person, phone: args.phone}
            personsFromRestApi[personIndex] = updatedPerson*/

            return response;
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
