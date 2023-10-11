import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({ onImageClick }) => {
  const handleImageClick = (imageNumber) => {
    console.log('Button im Footer wurde geklickt');
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => handleImageClick(1)}>
        <Image source={require('../assets/SettingsIcon.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleImageClick(2)}>
        <Image source={require('../assets/ExploreIcon.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleImageClick(3)}>
        <Image source={require('../assets/GroupIcon.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleImageClick(4)}>
        <Image source={require('../assets/HomeIcon.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default Footer;
