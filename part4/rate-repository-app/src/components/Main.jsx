import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import Appbar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ReviewForm from "./ReviewForm";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Appbar />
      <Routes>
        {" "}
        <Route path="/" element={<RepositoryList />} exact />{" "}
        <Route path="/signin" element={<SignIn />} exact />{" "}
        <Route path="/signup" element={<SignUp />} exact />{" "}
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/createReview" element={<ReviewForm />} exact />
        <Route path="/myReviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />{" "}
      </Routes>
    </View>
  );
};

export default Main;
