import Text from "./Text";
import { View, Pressable,StyleSheet} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import useCreateReview from "../hooks/useCreateReview";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: 150,
  },
  input: {
    fontFamily: theme.fonts.specific,
  },
  submit: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingLeft: 100,
    paddingTop: 15,
    paddingBottom: 15,
    margin: 2,
    color: "white",
    width: 250,
  },
});

const ReviewForm = () => {
  const [createReviews, { error, loading }] = useCreateReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReviews({
        ownerName,
        repositoryName,
        text,
        rating: Number(rating),
      });
      navigate(`/${data?.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Username cannot be empty"),
    repositoryName: yup.string().required("repositoryName cannot be empty"),

    rating: yup.number().required("provide a rating between 0-100"),
    text: yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            style={styles.input}
            name="ownerName"
            placeholder="Repository Owner's Name"
          />
          <FormikTextInput
            style={styles.input}
            name="repositoryName"
            placeholder="Repository Name"
          />
          <FormikTextInput
            style={styles.input}
            name="rating"
            placeholder="Rating between 0-100"
          />
          <FormikTextInput
            style={styles.input}
            name="text"
            placeholder="Review"
            multiline
          />
          <Pressable onPress={handleSubmit}>
            <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
