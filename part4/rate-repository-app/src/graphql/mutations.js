import { gql } from '@apollo/client';


export const SIGN_IN = gql`
mutation SignIn($username:String!,$password:String!){
    authenticate(credentials: { username:$username , password: $password }) {
      accessToken
    }
  }
`;
export const CREATE_USER = gql`
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
  }
}
`

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    rating
    text
    user {
      username
      id
    }
    repositoryId
    
  }
}
`
export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
