import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../hooks/useRepositories";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
});

const RepositoryList = () => {
  
  const { repositories  } = useRepositories();
  

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item }) => (
    <RepositoryItem
      fullName={item.fullName}
      description={item.description}
      language={item.language}
      forksCount={item.forksCount}
      stargazersCount={item.stargazersCount}
      reviewCount={item.reviewCount}
      ratingAverage={item.ratingAverage}
      avatarUrl={item.ownerAvatarUrl}
    />
  );
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
