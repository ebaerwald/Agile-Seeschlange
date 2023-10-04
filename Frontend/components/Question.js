import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Question = ({ subject, user, question }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fachContainer}>
        <Text>Fach:</Text>
        <View style={styles.fach}>
          <Text>{subject}</Text>
        </View>
      </View>
      <View style={styles.fragenContainer}>
        <Text>{`${user} fragt:`}</Text>
        <View style={styles.frage}>
          <Text>{question}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#72c770',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  fachContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fragenContainer: {
    marginBottom: 10,
  },
  frage: {
    backgroundColor: '#a4ea7a',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  fach: {
    backgroundColor: '#a4ea7a',
    padding: 10,
    borderRadius: 5,
  },
});

export default Question;
