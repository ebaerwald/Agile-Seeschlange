import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InteractionButton from '../components/InteractionButton'; // Importiere die Button-Komponente

const Answer = ({ user, answer }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [superlikeCount, setSuperlikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const handleLike = () => {
    console.log('Es wurde geliket');
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    console.log('Es wurde gedisliket');
    setDislikeCount(dislikeCount + 1);
  };

  const handleSuperlike = () => {
    console.log('Es wurde gesuperliket');
  };

  const handleComment = () => {
    console.log('Es wurde kommentiert');
    setCommentCount(commentCount + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Text>Antwort von {user}:</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text>{answer}</Text>
      </View>
      {/* Interaktionscontainer */}
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
        <Text>{commentCount}</Text>
          <InteractionButton label="Comment" type="comment" onPress={handleComment} />
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
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    alignItems: 'center',
  },
  answerContainer: {
    backgroundColor: '#a4ea7a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
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
});

export default Answer;
