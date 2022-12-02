import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection, searchKeyword, limit) => {
  const variables={
    first: limit,
    orderBy: orderBy,
    orderDirection: orderDirection,
    searchKeyword: searchKeyword,
  }
  const { data, fetchMore, loading, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables:variables
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  const repositories = data ? data.repositories : null;

  return { repositories, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;
