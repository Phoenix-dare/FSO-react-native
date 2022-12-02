import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (id,limit) => {
  const variables={
    id:id,
    first:limit
  }
  const { data, fetchMore, loading, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables:variables
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  const repository = data ? data.repository : null;

  return { repository, loading, fetchMore: handleFetchMore, ...result };
};

export default useSingleRepository;
