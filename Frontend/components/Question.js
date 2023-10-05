import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Answer from '../components/Answer';
import InteractionButton from '../components/InteractionButton';

const Question = ({ subject, user, question, navigation }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [superlikeCount, setSuperlikeCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  // TestAntworten:
  const dummyAnswers = [
    { user: 'Benutzer1', text: 'Dies ist Antwort 1' },
    { user: 'Benutzer2', text: 'Dies ist Antwort 2' },
  ];

  const [answerCount] = [dummyAnswers.length];
  
  const handleLike = () => {
    setLikeCount(likeCount + 1);
    console.log('Button Like wurde geklickt');
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
    console.log('Button Dislike wurde geklickt');
  };

  const handleSuperlike = () => {
    setSuperlikeCount(superlikeCount + 1);
    console.log('Button SuperLike wurde geklickt');
  };

  const handleComment = () => {
    console.log('Button Commit wurde geklickt');
  };
  

  const toggleAnswers = () => {
    if (!showAnswers) {
      // Abruf der Daten von Server, voerst nur DummyTestantworten
      // const fetchedAnswers = []; 
      // setAnswers(fetchedAnswers);
      setAnswers(dummyAnswers);
    } else {
      setAnswers([]); // Antworten ausblenden
    }
    setShowAnswers(!showAnswers);
  };

  const handleSolveQuestion = () => {
    // Hier kannst du die Logik hinzufügen, um die Frage zu lösen
    console.log('Frage soll gelöst werden');
  };

  const handleShortPress = () => {
    toggleAnswers();
    console.log('Einfacher Klick wurde erkannt');
  };

  const handleLongPress = () => {
    console.log('Laaaaaaaanger Klick wurde erkannt');
    navigation.navigate('Register');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleShortPress} onLongPress={handleLongPress}>
      <View style={styles.fachContainer}>
      <Text>{`${user} fragt:`}</Text>
        <View style={styles.fach}>
          <Text>{subject}</Text>
        </View>
      </View>
      <View style={styles.fragenContainer}>
        <View style={styles.frage}>
          <Text>{question}</Text>
        </View>
      </View>
      {/* Interaktionscontainer für Frage */}
      <View style={styles.interactionContainer}>
        <View style={styles.interactionButtonContainer}>
          <InteractionButton label="Like" type="like" onPress={handleLike} />
          <Text>{likeCount}</Text>
        </View>
        <View style={styles.interactionButtonContainer}>
          <Text>{dislikeCount}</Text>
          <InteractionButton label="Dislike" type="dislike" onPress={handleDislike} />
        </View>
        <View style={styles.interactionButtonContainer}>
          <InteractionButton label="Superlike" type="superlike" onPress={handleSuperlike} />
        </View>
        <View style={styles.interactionButtonContainer}>
          <InteractionButton label="Comment" type="comment" onPress={handleComment} />
        </View>
        <Text>{answerCount}</Text>
      </View>
      <View style={styles.menueContainer}>
      {/* Button zum Anzeigen/Ausblenden von Antworten */}
      <TouchableOpacity style={styles.showAnswersButton} onPress={toggleAnswers}>
      </TouchableOpacity>
      {/* Antworten anzeigen, wenn showAnswers true ist */}
      {showAnswers && (
        <View>
          {/* Hier die Antworten anzeigen */}
          {answers.map((answer, index) => (
            <Answer key={index} user={answer.user} answer={answer.text} />
          ))}
        </View>
      )}
      </View>
      {/* Button "Frage lösen" */}
      <TouchableOpacity style={styles.solveButton} onPress={handleSolveQuestion}>
        <Text>Frage lösen</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
    marginBottom: 5,
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
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  interactionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  interactionButton: {
    backgroundColor: '#a4ea7a',
    padding: 2,
    borderRadius: 1,
  },
  likeCountContainer: {
    backgroundColor: '#a4ea7a',
    padding: 5,
    borderRadius: 1,
    marginLeft: 5,
  },
  menueContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solveButton: {
    alignItems: 'center',
    backgroundColor: '#a4ea7a',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  }
});

export default Question;