import TextInput from "./TextInput";
import { Text } from "react-native";

const SearchBar = ({ search, setSearch }) => {
  return (
    <>
      <Text>Search:</Text>

      <TextInput
        onChangeText={(value) => setSearch(value)}
        value={search}
        placeholder="search"
      />
    </>
  );
};
export default SearchBar;
