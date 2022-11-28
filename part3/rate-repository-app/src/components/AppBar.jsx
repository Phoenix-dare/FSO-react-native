import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import theme from "../theme";
import { LOGGED_USER } from "../graphql/queries";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    margin: 2,
    padding: 2,
    font: theme.fonts.specific,
  },
  // ...
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const user = useQuery(LOGGED_USER,{
    fetchPolicy: 'cache-and-network',
  });
  

 


  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    await apolloClient.refetchQueries({
      include: "all",
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        {!user.data?.me ? (
          <Pressable>
            <Link to="/signin">
              <Text style={styles.text}>Sign-In</Text>
            </Link>
          </Pressable>
        ) : (
          <Pressable onPress={handleLogout}>
            <Text style={styles.text}>Sign-Out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
