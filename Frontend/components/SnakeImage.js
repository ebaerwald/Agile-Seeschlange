import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SnakeImage = ({ size }) => {
  const imageSize = size === 'small' ? { width: 125, height: 100 } : { width: 350, height: 275 };

  return (
    <View style={styles.imageContainer}>
      <Image
        style={[styles.image, imageSize]}
        source={require('../assets/seesnake.png')}
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    // Die Breite und Höhe wird jetzt dynamisch basierend auf dem "size" Prop gesetzt
  },
});

export default SnakeImage;
