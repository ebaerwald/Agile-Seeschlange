import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SnakeImage = ({ size }) => {
  // Definieren Sie die Breite und Höhe basierend auf dem übergebenen "size" Prop
  const imageSize = size === 'small' ? { width: 125, height: 100 } : { width: 350, height: 275 };

  return (
    <View style={styles.imageContainer}>
      <Image
        style={[styles.image, imageSize]} // Verwenden Sie das berechnete imageSize-Objekt für Breite und Höhe
        source={require('../assets/seesnake.png')}
        resizeMode="contain" // Setzen Sie die resizeMode-Eigenschaft auf "contain"
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
