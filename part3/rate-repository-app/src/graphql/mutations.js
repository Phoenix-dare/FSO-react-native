import { gql } from '@apollo/client';


export const SIGN_IN = gql`
mutation SignIn($username:String!,$password:String!){
    authenticate(credentials: { username:$username , password: $password }) {
      accessToken
    }
  }
`;
export const CREATE_USER = gql`
mutation {
    createUser(user: { username: "myusername", password: "mypassword" }) {
      id
      username
    }
  }`