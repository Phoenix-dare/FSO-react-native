import { format, parseISO } from "date-fns";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "400",
    flexWrap: "wrap",
  },
  reviewContainer: {
    display: "flex",
    flex: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 3,
    margin: 3,
    textAlign: "justify",
  },
  rating: {
    flexShrink: 1,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 3,
    margin: 3,
    borderColor: theme.colors.primary,
  },

  ratingText: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 7,
    paddingRight: 5,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  reviewText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.bodysmall,
    fontWeight: theme.fontWeights.normal,
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.extrabold,
  },

  date: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  button: {
    position: "relative",
    backgroundColor: theme.colors.primary,
    textAlign: "center",
    borderRadius: 5,
    padding: 4,
    margin: 2,
    color: "white",
    width: 200,
  },

  deleteButton: {
    position: "relative",
    backgroundColor: theme.colors.danger,
    textAlign: "center",
    borderRadius: 5,
    padding: 4,
    margin: 2,
    color: "white",
    width: 100,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
const ReviewItemContainer = ({ review, refetch }) => {
  const navigate = useNavigate();

  const [deleteReview] = useMutation(DELETE_REVIEW, {});
  
  const handleDelete = () => {
    Alert.alert("Delete this review?", "Press delete to confirm.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deleteReview({
            variables: { id: review.id },
          });
          refetch();
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}> {review.rating}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.name}>{review.user.username}</Text>
          <Text style={styles.date}>
            {format(parseISO(review.createdAt), "dd/MM/yyyy")}
          </Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigate(`/${review.repositoryId}`)}>
          <Text style={styles.button}>View Repository</Text>
        </Pressable>
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteButton}>Delete Review</Text>
        </Pressable>
      </View>
    </>
  );
};
export default ReviewItemContainer;
