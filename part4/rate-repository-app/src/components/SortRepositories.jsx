import { Picker } from "@react-native-picker/picker";
import { Text } from "react-native";

const SortRepositories = ({sort,setSort}) => {
    return (
      <>
        <Text>Sort by:</Text>
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue) => setSort(itemValue)}
        >
          <Picker.Item label="Latest Repositories" value="CREATED_AT-DESC" />
          <Picker.Item label="Oldest Repositories" value="CREATED_AT-ASC" />
          <Picker.Item label="Highest Rated" value="RATING_AVERAGE-DESC" />
          <Picker.Item label="Lowest  Rated" value="RATING_AVERAGE-ASC" />
        </Picker>
      </>
    );
  };
  export default SortRepositories;