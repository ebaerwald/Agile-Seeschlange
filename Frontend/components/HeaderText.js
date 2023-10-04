import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderText = ({ title, type }) => {
  const getTextAlign = () => {
    switch (type) {
      case 'center':
        return 'center';
      case 'left':
        return 'left';
      case 'right':
        return 'right';
      default:
        return 'center'; // Standardwert: zentriert
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.titleText, { textAlign: getTextAlign() }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    marginBottom: 10,
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default HeaderText;
