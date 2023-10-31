import * as user from "../impressive-store/user";
import * as question from "../impressive-store/question";
import * as group from "../impressive-store/group";
import * as answer from "../impressive-store/answer";
import * as tag from "../impressive-store/tag";
import { impContext } from "../impressive-store/provider";

import { useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import Background from '../components/Background';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as React from 'react';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/96f22eaf46e6f1bcdb9f',
};

const TestBackendPage = () => {

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '96f22eaf46e6f1bcdb9f',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        "scheme": "agile-seeschlange"
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(code);
    }
  }, [response]);

    const { imp } = useContext(impContext);
    useEffect(() => {
        console.log(imp);
    }, [imp]);

    return (
      <ScrollView>
        <Background showFooter={true} showBurgerBun={true}>
          <View style={styles.outerBox}>
            <Text>{JSON.stringify(user)}</Text>
            <Text>Username: {imp.userStore.username}</Text>
            <Text>Email: {imp.userStore.email}</Text>
            <Text>Google User ID: {imp.userStore.googleUserId}</Text>
            <Text>{JSON.stringify(imp.questionsStore)}</Text>
            <Text>{JSON.stringify(imp.groupsStore)}</Text>
            <Button
              title="Test"
              onPress={() => {
                imp.set.userStore({
                  ...imp.userStore,
                  username: "Test",
                })
              }}
            />
            <Button
              title="Sign In with Google"
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            />
            <Button
              title="Create User"
              onPress={async() => {
                user.createUser(imp, {
                  "email": 'test@testuser.de',
                  "name": 'Test',
                  "lastName": 'User',
                  "googleUserId": '1234567890',
                  }
                );
              
              }}
            />
            <Button 
              title="Get User"
              onPress={async() => {
                user.getUser(imp, {"googleUserId": '1234567890'})
              }}
              />
            <Button
              title="Hash Password"
              onPress={async() => {
                const hashedPassword = await user.hashPassword('test12345')
                console.log(hashedPassword);
              }}
              />
            <Button
              title="Update User"
              onPress={
                async() => {
                  user.updateUser(imp, "65393a3f8f3f5e0aed17322d", {
                    "userObject": {
                      "email": 'moin@moin.de',
                      "name": 'Moin',
                      "googleUserId": '1234567890'
                    },
                  })
              }}
              />
            {/* <Button
              title="Add favorite Question"
              onPress={
                async() => {
                  user.addFavoriteQuestion(imp, {
                    userObject: {
                      googleUserId: '1234567890',
                    },
                    threadId: '5f9e9b3b9b7b7b0b3c3c3c3c',
                  })
              }
              }
              />
              <Button
              title="Delete User"
              onPress={
                async() => {
                  user.deleteUser(imp, {
                    googleUserId: '1234567890',
                  })
                }
              }
              />
              <Button
                title="Create Question"
                onPress={
                  async() => {
                    question.createQuestion(imp, {
                      title: 'Super Titel',
                       text: 'Lorem Impsum dolor sit amet',
                       views: 500, 
                       score: 10
                    });
                  }
                }
              />
              <Button
               title="Get Question"
                onPress={
                  async() => {
                    const res = await question.getQuestion(imp, '65393f82702a94d7bc2256dd');
                    console.log(res);
                  }
                }
                />
              <Button
                title="Get Questions"
                onPress={
                  async() => {
                    question.getQuestions(imp);
                  }
                }
              /> */}
              <Button
                title="Log Questions Store"
                onPress={ () => {
                  console.log(imp.questionsStore);

                }}
                />
                <Button
                  title="Update Question"
                  onPress={
                    async() => {
                      question.updateQuestion(imp, '65393f82702a94d7bc2256dd', {
                        title: 'Super Titel2',
                        text: 'Lorem Impsum Lorem Lorem',
                        views: 400, 
                        score: 10
                      });
                    }
                  }
                  />
                <Button
                  title="Delete Question"
                  onPress={async() => {
                    question.deleteQuestion(imp, '65393f82702a94d7bc2256dd');
                  }}
                  />
                <Button 
                  title="Get Groups"
                  onPress={async() => {
                    group.getGroups(imp);
                  }}
                  />
                <Button
                  title="Log Groups Store"
                  onPress={ () => {
                    console.log(imp.groupsStore);

                }}
                />
                <Button
                  title="Get Group"
                  onPress={ async() => {
                    const res = await group.getGroup(imp, '6511548e4b428087320a7ead');
                    console.log(res);
                  }
                }
                />
                <Button
                  title="Create Group"
                  onPress={ async() => {
                    group.createGroup(imp, {
                      name: "Best Group", 
                      description: "Best describtion", 
                      groupOwner: "65394b05d8e739fc66ce7bb4"
                    })
                  }
                }
                />
                <Button
                  title="Update Group"
                  onPress={ async() => {
                    group.updateGroup(imp, "6511548e4b428087320a7ead", {
                      name: "Best Group12345", 
                      description: "Best describtion", 
                      groupOwner: "65394b05d8e739fc66ce7bb4"
                    })
                  }
                }
                />
                <Button
                  title="Add User to Group"
                  onPress={ async() => {
                    group.addUserToGroup(imp, {
                      userId: "65394b05d8e739fc66ce7bb4",
                      groupId: "6511548e4b428087320a7ead"
                    })
                  }
                }
                />
                <Button
                  title="Delete User from Group"
                  onPress={ async() => {
                    group.deleteUserFromGroup(imp, {
                      userId: "65394b05d8e739fc66ce7bb4",
                      groupId: "6511548e4b428087320a7ead"
                    })
                  }
                }
                />
                <Button
                  title="Create Answer"
                  onPress={ async() => {
                    answer.createAnswer(imp, {
                      answerOwner: "65394b05d8e739fc66ce7bb4",
                      title: "A Answer to all questions you might ask",
                      text: "Lorem Impsum dolor sit amet",
                      score: 10,
                      parentThread: "651ab66ddc81a30aeffe2b1a"
                    })
                  }
                }
                />
                <Button
                  title="Update Answer"
                  onPress={async() => {
                    answer.updateAnswer(imp, "653aa5311e8f913e7f367fb4", {
                      answerOwner: "65394b05d8e739fc66ce7bb4",
                      title: "A Answer to all questions you might ask",
                      text: "Lorem Doloris",
                      score: 10,
                      parentThread: "651ab66ddc81a30aeffe2b1a"
                    })
                  }}
                  />
                  {/* <Button
                    title="Delete Answer"
                    onPress={
                      async()=> {
                        answer.deleteAnswer(imp, "653aa5311e8f913e7f367fb4");
                      }
                    }
                    />
                    <Button
                      title="Create Tag"
                      onPress={
                        async() => {
                          tag.createTag(imp, {
                            name: "Best Tag",
                            description: "Best description"
                          })
                        }
                      }
                      />
                      <Button 
                        title="Get Tag"
                        onPress={
                          async() => {
                            const res = await tag.getTag(imp, "653abf8a2d4e6b5e3b6a5b8f");
                            console.log(res);
                          }
                        }
                        />
                        <Button
                          title="Delete Tag"
                          onPress={
                            async() => {
                              tag.deleteTag(imp, "653abf8a2d4e6b5e3b6a5b8f");
                            }
                          }
                          /> */}

              
          </View>
        </Background>
      </ScrollView>
    );
    
  
    
  };
  
  const styles = StyleSheet.create({
    outerBox: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 2,
      overflow: 'scroll'
    },
  });
  
  export { TestBackendPage };