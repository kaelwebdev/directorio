import { gql } from '@apollo/client'

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $phone: String, $city: String!, $street: String!)
{
    addPerson(
        name: $name
        phone: $phone
        city: $city
        street: $street
    ) {
        name
        phone
        address {
            city
            street
        }
        id
    }
}
`

export const EDIT_PHONE = gql`
mutation editPhone($name: String!, $phone: String!)
{
    editNumber(
        name: $name
        phone: $phone
    ) {
        name
        phone
        address {
            city
            street
        }
        id
    }
}
`



