import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

import { View, Pressable, Text, StyleSheet, FlatList } from "react-native";
import theme from "../theme";

import RepositoryItem from "./RepositoryItem";
import useSingleRepository from "../hooks/useSingleRepository";
import ReviewItemContainer from "./ReviewItemContainer";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
  button: {
    position: "relative",
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    borderRadius: 5,
    padding:4,
    margin:"auto",
    color: "white",
    width:300,
  },
});
const RepositoryInfo = ({ repository }) => {
  

  return (
    <View>
      <RepositoryItem
        fullName={repository?.fullName}
        description={repository?.description}
        language={repository?.language}
        forksCount={repository?.forksCount}
        stargazersCount={repository?.stargazersCount}
        reviewCount={repository?.reviewCount}
        ratingAverage={repository?.ratingAverage}
        avatarUrl={repository?.ownerAvatarUrl}
      />

      <Pressable onPress={() => Linking.openURL(repository.url)}>
        <Text style={styles.button}>Open in Github</Text>
      </Pressable>
    </View>
  );
};


const SingleRepository = () => {
  const id = useParams().id;
  const limit = 5;
  const { repository, fetchMore } = useSingleRepository(id, limit);
  const reviews = repository ? repository.reviews.edges.map((edge) => edge.node) : [];

  const onEndReached = () => {
    fetchMore();
  };
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItemContainer review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <RepositoryInfo
            repository={repository}
            
          />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default SingleRepository;
