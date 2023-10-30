import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;
  
    return <Image source={imageSource} style={styles.image} />;
  }

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 200,
    height: 150,
    borderRadius: 10,
  },
});