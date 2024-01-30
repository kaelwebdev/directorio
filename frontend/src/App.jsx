import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import graphqlLogo from './assets/graphql.svg'
import apollosLogo from './assets/apollo.svg'
import './App.css'
import {Persons} from './Personas'
import PersonForm from './PersonForm'
import { usePersons } from './persons/custom_hooks'
import { PhoneForm } from './PhoneForm'

function App() {

  const {data, error, loading} = usePersons();


  if (error) return <span style={'color: red'}>{error}</span>
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://graphql.org/" target="_blank">
          <img src={graphqlLogo} className="logo graphql" alt="Graphql logo" />
        </a>
        <a href="https://www.apollographql.com/docs/" target="_blank">
          <img src={apollosLogo} className="logo apollo" alt="Apollo logo" />
        </a>
      </div>
      <h1>
        (GraphQL + Apollo Server) +
        <br/>
        (React + Vite + GraphQL + Apollo Client)
        </h1>
      {
        loading ? <p>...Loading</p> :
        (
          <>
            <Persons persons={data?.allPersons}/>
            <PersonForm/>
            <PhoneForm/>
          </>
        )
      }
     
    </>
  )
}

export default App
