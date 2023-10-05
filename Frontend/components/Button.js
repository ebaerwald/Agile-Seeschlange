import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

import loginIcon from '../assets/LoginInIcon.png';
import registerIcon from '../assets/SignInIcon.png';
import AnswerSnake from '../assets/AnswerSnake.png';

const Button = ({ onPress, iconType, text }) => {
  const getIconSource = () => {
    if (iconType === 'Login') {
      return loginIcon;
    } else if (iconType === 'Register') {
      return registerIcon;
    } else if (iconType === 'Answer') {
      return AnswerSnake;
    } else {
      return require('../assets/DefaultIcon.png');
    }
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.buttonContentContainer}>
        <View style={styles.buttonIconContainer}>
          <Image style={styles.buttonIconImage} source={getIconSource()} />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#72c770',
    borderRadius: 20,
    padding: 10,
  },
  buttonContentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a4ea7a',
    borderRadius: 20,
    padding: 2,
  },
  buttonIconContainer: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  buttonIconImage: {
    width: 35,
    height: 35,
  },
  buttonTextContainer: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
  },
});

export default Button;
