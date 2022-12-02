import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import useCreateUser from "../hooks/useCreateUser";
import useSignIn from "../hooks/useSignIn.js";
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
const SignUp = () => {
  const [createUser, { error, loading }] = useCreateUser();
  const [signIn] = useSignIn();

  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const initialValues = {
    username: "",
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username cannot be empty")
      .min(1, "username cannot be empty")
      .max(30, "Character limit exceeded"),

    password: yup
      .string()
      .required("Password cannot be empty")
      .min(5, "Password should have minimum five characters")
      .max(50, "Password too long"),

    confirm: yup
      .string()
      .required("Please confirm password")
      .oneOf([yup.ref("password")], "Passwords do not match."),
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
            name="username"
            placeholder="Username"
          />
          <FormikTextInput
            style={styles.input}
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput
            style={styles.input}
            name="confirm"
            placeholder="Confirm Password"
            secureTextEntry
          />

          <Pressable onPress={handleSubmit}>
            <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
