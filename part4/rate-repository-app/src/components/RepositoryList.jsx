import React from "react";
import { FlatList, View, StyleSheet, Pressable, } from "react-native";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native"

import useRepositories from "../hooks/useRepositories";
import SortRepositories from "./SortRepositories";
import RepositoryItem from "./RepositoryItem";
import SearchBar from "./SearchBar";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
});

export class RepositoryListContainer extends React.Component {
  

  renderHeader = () => {
    const { search, setSearch, sort, setSort } = this.props;
    return (
      <>
        <SearchBar search={search} setSearch={setSearch} />
        <SortRepositories sort={sort} setSort={setSort} />
      </>
    );
  };
  ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderItem = ({ item }) => {
    const {navigate}=this.props
   return(

   <>
      <Pressable onPress={()=> navigate(`/${item.id}`)}>
        <RepositoryItem
          fullName={item.fullName}
          description={item.description}
          language={item.language}
          forksCount={item.forksCount}
          stargazersCount={item.stargazersCount}
          reviewCount={item.reviewCount}
          ratingAverage={item.ratingAverage}
          avatarUrl={item.ownerAvatarUrl}
        />
      </Pressable>
    </>
   )
   };
  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    const ItemSeparator = this.ItemSeparator;
    const renderItem = this.renderItem;
    const renderHeader = this.renderHeader;
    const onEndReach = this.props.onEndReach;


    return (
      <>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      </>
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const [sort, setSort] = useState("CREATED_AT-DESC");
  const splitValues = sort?.split("-");

  const orderBy = splitValues[0];
  const orderDirection = splitValues[1];
  const limit=5
  const { repositories,fetchMore } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearch,
    limit
  );

  const onEndReach = () => {
    fetchMore()
  };

  return (
    <>
      <RepositoryListContainer
        repositories={repositories}
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        onEndReach={onEndReach}
        navigate={navigate}
      />
    </>
  );
};
export default RepositoryList;
