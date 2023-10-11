import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const DataInputField = ({ placeholder, value, onChangeText, type = 'UserData' }) => {
  // Der Standardwert für `type` ist 'UserData', es sei denn, ein anderer Wert wird übergeben.
  const inputStyle =
    type === 'UserData' ? styles.userDataInput :
    type === 'Question' || type === 'Answer' ? styles.noBorderInput :
    styles.defaultInput; // Fallback für unbekannte `type`

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 2,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  userDataInput: {
    // Stile für UserData
  },
  noBorderInput: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultInput: {
  },
});

export default DataInputField;
