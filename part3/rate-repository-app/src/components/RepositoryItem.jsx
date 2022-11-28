import { View, Text, Image, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 25,
    margin: 10,
    padding: 10,
  },
  flexContainerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  flexContainerBottom: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
  },
  flexContainerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  
  heading: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.extrabold,
    color: theme.colors.textPrimary,
  },
  language: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.subheading,
    color: "white",
    backgroundColor: theme.colors.primary,
    width: "fit-content",
    padding: 3,
    borderRadius: 5,
  },
  body: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textSecondary,
  },
  bottom: {
    fontSize: theme.fontSizes.bodysmall,
    fontWeight: theme.fontWeights.extrabold,
    color: theme.colors.textSecondary,
    padding:3,
    margin:3,
    
  },
});

const RepositoryItem = ({
  fullName,
  language,
  description,
  forksCount,
  ratingAverage,
  reviewCount,
  stargazersCount,
  avatarUrl,
}) => (
  <View style={styles.container}>
    <View style={styles.flexContainerRow}>
      <Image style={styles.icon} source={{ uri: avatarUrl }} />

      <View style={styles.flexContainerColumn}>
        <Text style={styles.heading}>Fullname : {fullName}</Text>
        <Text style={styles.language}>Language : {language}</Text>
        <Text style={styles.body}>Description : {description}</Text>
      </View>
    </View>

    <View style={styles.flexContainerRow}>
      <View style={styles.flexContainerBottom}>
        <Text style={styles.body}>{ratingAverage}</Text>
        <Text style={styles.bottom}>Rating </Text>
      </View>
      <View style={styles.flexContainerBottom}>
        <Text style={styles.body}>{forksCount >= 1000 ? `${Math.round(forksCount/100)/10} k` : forksCount}</Text>
        <Text style={styles.bottom}>Forks</Text>
      </View>
      <View style={styles.flexContainerBottom}>
        <Text style = {styles.body}>{reviewCount}</Text>
        <Text style={styles.bottom}>Reviews </Text>
      </View>
      <View style={styles.flexContainerBottom}>
        <Text style={styles.body}>{stargazersCount>=1000 ?`${Math.round(stargazersCount/100)/10} k` : stargazersCount}</Text>
        <Text style={styles.bottom}>Stars</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
