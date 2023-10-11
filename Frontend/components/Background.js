import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Footer from './Footer';
const Background = ({ children, showFooter, showBurgerBun }) => {
  const handleBurgerMenuClick = () => {
    console.log('Button Burgermenü wurde geklickt');
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.header}>
        {/* Burger-Menü hier hinzufügen */}
        {showBurgerBun && (
          <TouchableOpacity onPress={handleBurgerMenuClick}>
            <Image source={require('../assets/WaveIcon.png')} style={styles.image} />
          </TouchableOpacity>
        )}
      </View>
      {children}
      {showFooter && (
        <View style={styles.footer}>
          {/* Hier Footer-Inhalt hinzufügen */}
          <Footer />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: 'rgba(31, 85, 167, 0.30)',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default Background;
