import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  text:{
margin:2,
padding:2,
font:theme.fonts.specific
 }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style = {styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/signin">
            <Text style={styles.text}>Sign-In</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
