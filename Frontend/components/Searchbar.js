import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const Searchbar = ({ onChangeText, placeholder }) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/SearchIcon.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        onChangeText={(newText) => {
          setText(newText);
          onChangeText(newText); 
        }}
        value={text}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15,
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 20, 
  },
  input: {
    height: 30,
    flex: 1, 
  },
});

export default Searchbar;
