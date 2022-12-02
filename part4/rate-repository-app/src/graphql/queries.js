import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query RepositoryQuery(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          description
          forksCount
          fullName
          id
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;
export const LOGGED_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username

      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
export const GET_SINGLE_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      createdAt
      description
      forksCount
      fullName
      language
      url
      name
      ownerAvatarUrl
      ownerName
      reviewCount
      stargazersCount
      watchersCount
      ratingAverage

      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
