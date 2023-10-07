import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

const InteractionButton = ({ type, onPress }) => {
  let iconSource;

  // Je nachdem welchen Interaktionsbutton-Typ du möchtest, setze das entsprechende Icon
  switch (type) {
    case 'like':
      iconSource = require('../assets/ThumbsUpIcon.png');
      break;
    case 'dislike':
      iconSource = require('../assets/ThumbsDownIcon.png');
      break;
    case 'superlike':
      iconSource = require('../assets/HeartIcon.png');
      break;
      case 'superlikePushed':
        iconSource = require('../assets/HeartSolidIcon.png');
        break;
    case 'comment':
      iconSource = require('../assets/CommentIcon.png');
      break;
    case 'star':
      iconSource = require('../assets/StarIcon.png');
      break;
    case 'starPushed':
        iconSource = require('../assets/StarSolidIcon.png');
      break;

    default:
      // Fallback, falls der Typ nicht erkannt wird
      iconSource = require('../assets/DefaultIcon.png');
      break;
  }
  

  return (
    <View style={styles.interactionContainer}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={iconSource} style={styles.icon} />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#72c770', // Hintergrundfarbe des Buttons
    padding: 2,
    marginHorizontal: 2,
  },
  icon: {
    width: 20,
    height: 20,
    // Weitere Stiloptionen für das Icon, wenn benötigt
  },
});

export default InteractionButton;
