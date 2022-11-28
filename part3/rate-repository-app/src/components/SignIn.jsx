import Text from "./Text";
import { View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignin";


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: 150,
  },
  input: {
    font: theme.fonts.specific,
  },
  signin: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingLeft: 100,
    paddingTop: 15,
    paddingBottom: 15,
    margin: 2,
    color: "white",
    width: 250,
  },
};

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Provide atleast three characters")
    .required("Username cannot be empty"),
  password: yup
    .string()
    .min(8, "Provide atleast eight characters")
    .required("Password cannot be empty"),
});
const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            styles={styles.input}
            name="username"
            placeholder="Username"
          />
          <FormikTextInput
            styles={styles.input}
            name="password"
            placeholder="Password"
            secureTextEntry
          />

          <Pressable onPress={handleSubmit}>
            <Text style={styles.signin}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
