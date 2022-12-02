import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input:{
    borderColor:"gray",
    borderWidth:1,
    padding:2,
    margin:2,
    borderRadius:5,
    width:250,
    height:40
    },
    error:{
    borderColor:'red',
    borderWidth:2,
    borderRadius:5,
    width:250,
    height:40
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [!error ? styles.input : styles.error ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;