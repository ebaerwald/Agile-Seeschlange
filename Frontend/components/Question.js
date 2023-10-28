import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Answer from '../components/Answer';
import InteractionButton from '../components/InteractionButton';
import DataInputField from '../components/DataInputField';



const Question = ({ subject, user, question, navigation, newQuestion }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [superlikeCount, setSuperlikeCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [fach, setFach] = useState('');
  const [answer, setAnswer] = useState('');
  const [interactionButtonTypeStar, setInteractionButtonTypeStar] = useState('star');
  const [interactionButtonTypeSuperlike, setInteractionButtonTypeSuperlike] = useState('superlike');

  // TestAntworten:
  const dummyAnswers = [
    { user: 'Benutzer1', text: 'Dies ist Antwort 1' },
    { user: 'Benutzer2', text: 'Dies ist Antwort 2' },
  ];
  const [answerCount] = [dummyAnswers.length];


  // 
  const handleStar = () => {
    if (interactionButtonTypeStar === 'star') {
      setInteractionButtonTypeStar('starPushed');
    } else {
      setInteractionButtonTypeStar('star');
    }
    console.log('Star wurde geklickt');
  };

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    console.log('Button Like wurde geklickt');
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
    console.log('Button Dislike wurde geklickt');
  };
  
  const handleSuperlike = () => {
    if (interactionButtonTypeSuperlike === 'superlike') {
      setInteractionButtonTypeSuperlike('superlikePushed');
    } else {
      setInteractionButtonTypeSuperlike('superlike');
    }
    console.log('Superlike wurde geklickt');
  };

  const toggleAnswers = () => {
    if (!showAnswers) {
      // Abruf der Daten von Server, vorerst nur DummyTestantworten
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
    if(!newQuestion){
    toggleAnswers();
    console.log('Einfacher Klick wurde erkannt');
    } else
    console.log('Es ist eine neue Frage und hat keine Antworten');
  };

  const handleLongPress = () => {
    if(!newQuestion){
      console.log('Laaaaaaaanger Klick wurde erkannt');
      navigation.navigate('SingleQuestion');
      } else
      console.log('Es ist eine neue Frage und hat keine Antworten');
    };


  return (

    <TouchableOpacity style={styles.QuestionContainer} onPress={handleShortPress} onLongPress={handleLongPress}>
     { /* Container für allgemeine Infos der Frage, wie z. B. welches Fach und welcher Benutzer gefragt hat */}
      <View style={styles.generalInfoContainer}>

      <View style={styles.userContainer}>
        {!newQuestion ? (
          <Text>{`${user} fragt im Fach`} </Text>
        ) : (
          <Text>Du fragst im Fach: </Text>
        )}
      </View>
      <View style={styles.fachContainer}>
        {!newQuestion ? (
          <Text>{subject}</Text>
        ) : (
          <DataInputField placeholder="Dein Fach*" value={fach} onChangeText={text => setFach(text)} type="Question" />
        )}
      </View>
      </View>

      <View style={styles.fragenContainer}>
      {!newQuestion ? (
        <Text style={styles.text}>{question}</Text>
        ) : (
          <DataInputField placeholder="Formuliere deine Frage möglichst präzise*" value={answer} onChangeText={text => setAnswer(text)} type="Answer" />
        )}
      </View>


      {/* Interaktionscontainer für Frage */}
      {!newQuestion && (
        <View style={styles.interactionContainer}>
          <View style={styles.interactionButtonContainer}>
            <InteractionButton type={interactionButtonTypeStar} onPress={handleStar} />
          </View>
          <View style={styles.interactionButtonContainer}>
            <InteractionButton label="Like" type="like" onPress={handleLike} />
            <Text>{likeCount}</Text>
          </View>
          <View style={styles.interactionButtonContainer}>
            <Text>{dislikeCount}</Text>
            <InteractionButton label="Dislike" type="dislike" onPress={handleDislike} />
          </View>
          <View style={styles.interactionButtonContainer}>
          <InteractionButton type={interactionButtonTypeSuperlike} onPress={handleSuperlike} />
          </View>
          <View style={styles.interactionButtonContainer}>
            <InteractionButton label="Comment" type="comment" /*onPress={handleComment}*/ />
          </View>
          <Text>{answerCount}</Text>
        </View>
      )}
      <View style={styles.menueContainer}>
        {/* Button zum Anzeigen/Ausblenden von Antworten */}
        {!newQuestion && (
          <TouchableOpacity style={styles.showAnswersButton} onPress={toggleAnswers}>
          </TouchableOpacity>
        )}
        {/* Antworten anzeigen, wenn showAnswers true ist */}
        {!newQuestion && showAnswers && (
          <View>
            {/* Hier die Antworten anzeigen */}
            {answers.map((answer, index) => (
              <Answer key={index} user={answer.user} answer={answer.text} />
            ))}
          </View>
        )}
        {/* Button "Frage lösen" */}
        {!newQuestion && (
          <TouchableOpacity style={styles.solveButton} onPress={handleSolveQuestion}>
            <Text>Frage lösen</Text>
          </TouchableOpacity>
        )}
      </View>

    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  QuestionContainer: {
    backgroundColor: '#72c770',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
  },
  generalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
  },
  userContainer: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#72c770',
    justifyContent: 'left', 
  },
  fachContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#a4ea7a',
    marginLeft: 10,
  },
  text: {
    fontSize: 14,

  },
  fragenContainer: {
    marginBottom: 5,
    backgroundColor: '#a4ea7a',
    padding: 10,
    borderRadius: 5,
    marginTop: 5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderBottomWidth: 1, // Breite der Linie
    borderBottomColor: 'black', // Farbe der Linie
    borderBottomStyle: 'dashed', // Stil der Linie (gestrichelt)
    padding: 10, // Platzierung des Inhalts
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
  },
});

export default Question;