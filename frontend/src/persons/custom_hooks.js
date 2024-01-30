import { useQuery, useMutation } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import { CREATE_PERSON, EDIT_PHONE  } from './mutations'

export const usePersons = () => {
    const result = useQuery(ALL_PERSONS);
    return result; //return {data, error, loading}
}

export const useCreatePerson = () => {
    const [createPerson,  { data, loading, error }] = useMutation(
        CREATE_PERSON,
        { 
            refetchQueries: [
                {
                    query: ALL_PERSONS
                }
            ],
            onError: (error) => {
                return {
                    message: error.graphQLErrors[0].message,
                    code: error.graphQLErrors[0]?.extensions?.code
                }
            }
        }
    )
    return [createPerson,  { data, loading, error }];
}

export const useUpdatePhone = () => {
    const [editPhone,  { data, loading, error }] = useMutation(
        EDIT_PHONE,
        { 
            /*refetchQueries: [
                {
                    query: ALL_PERSONS
                }
            ],*/
            onError: (error) => {
                return {
                    message: error.graphQLErrors[0].message,
                    code: error.graphQLErrors[0]?.extensions?.code
                }
            }
        }
    )
    return [editPhone,  { data, loading, error }];
}