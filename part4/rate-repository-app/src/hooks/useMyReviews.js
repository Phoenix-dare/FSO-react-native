import { useQuery } from "@apollo/client";

import { LOGGED_USER} from "../graphql/queries";

const useMyReviews = (limit,bool) => {
  const variables={
    first:limit,
    includeReviews:bool
  }
  const { data, fetchMore, loading, ...result } = useQuery(LOGGED_USER, {
    fetchPolicy: "cache-and-network",
    variables:variables
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  const me = data ? data.me : null;

  return { me, loading, fetchMore: handleFetchMore, ...result };
};

export default useMyReviews;
