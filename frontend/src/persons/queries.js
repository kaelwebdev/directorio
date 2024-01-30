import { gql } from '@apollo/client'

export const ALL_PERSONS = gql`
    query AllPersons {
      allPersons {
        name
        phone
        id
      }
    }
`