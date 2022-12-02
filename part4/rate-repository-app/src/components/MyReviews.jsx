import ReviewItemContainer from "./ReviewItemContainer";
import useMyReviews from "../hooks/useMyReviews"
import { StyleSheet,FlatList,View } from "react-native";

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: "lightgray",
    },
})

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
const { me,fetchMore,refetch } = useMyReviews(5,true)


const reviews = me ? me.reviews.edges.map((edge) => edge.node) : [];
const onEndReached = () => {
    fetchMore();
  };
return (
<FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItemContainer review={ item }  refetch={refetch}/>}
        keyExtractor={({ id }) => id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
)
}
export default MyReviews;