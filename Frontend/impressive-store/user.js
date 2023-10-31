<<<<<<< HEAD
import { passId, passObject, passIdObject } from "./root";
import * as Crypto from "expo-crypto";
import config from "../config";
=======
import { passObject, passIdObject } from "./root";
import * as Crypto from 'expo-crypto';
// import * as Linking from 'expo-linking';

>>>>>>> origin/EB-OAuth2

export const userStore = {
  id: null,
  username: null,
  email: null,
  favoredQuestionIds: [],
};

export const usersStore = {
  users: [],
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions
<<<<<<< HEAD
const ipv4 = config.serverIP;
const getUserRoute = "http://" + ipv4 + ":3001/api/user"; // don not work, body is not allowed for ger requests
const createUserRoute = "http://" + ipv4 + ":3001/api/user/signup"; //finished
const updateUserRoute = "http://" + ipv4 + ":3001/api/user"; //finished waiting for commit
const addFavoriteQuestionRoute =
  "http://" + ipv4 + ":3001/api/user/addfavoritequestion"; //finished
const deleteUserRoute = "http://" + ipv4 + ":3001/api/user"; //delete backend function falsch geschrieben // finished
=======

const ipv4 = '10.25.3.174';
const getUserRoute = 'http://' + ipv4 + ':3001/api/user'; // don not work, body is not allowed for ger requests
const createUserRoute = 'http://' + ipv4 + ':3001/api/user/signup'; //finished
const updateUserRoute = 'http://' + ipv4 + ':3001/api/user'; //finished waiting for commit
const addFavoriteQuestionRoute = 'http://' + ipv4 + ':3001/api/user/addfavoritequestion'; //finished
const deleteUserRoute = 'http://' + ipv4 + ':3001/api/user'; //delete backend function falsch geschrieben // finished
const redirectUri = 'http://' + ipv4 + ':3001/api/user/oAuth2'; //finished
>>>>>>> origin/EB-OAuth2

// ----------------------

export async function getUser(imp, object) {
  const user = await passObject(getUserRoute, object, "GET"); // object: {googleUserId} // TODO: change to id
  imp.set.userStore(user);
  return user;
}

export async function createUser(imp, object) {
  const user = await passObject(createUserRoute, object, "POST"); // object: {email, name, lastname, googleUserId} works
  console.log(user);
  imp.set.userStore(user);
  return user;
}

export async function hashPassword(password) {
  const hashPassword = await Crypto.digestStringAsync(
    // works
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashPassword;
}

export async function updateUser(imp, userId, object) {
  const user = await passIdObject(updateUserRoute, userId, object, "PUT"); // works but why do i have to pass the id if the id is not used in the backend?
  imp.set.userStore(user);
  return user;
}

export async function addFavoriteQuestion(imp, object) {
  const user = await passObject(addFavoriteQuestionRoute, object, "PUT"); // works but why do i have to pass an user object and not only the google user id?
  imp.set.userStore(user);
  return user;
}

<<<<<<< HEAD
export async function deleteUser(imp, object) {
  const user = await passObject(deleteUserRoute, object, "DELETE"); // works
  imp.set.userStore(user);
  return user;
}
=======
export async function deleteUser(imp, object)
{
    const user = await passObject(deleteUserRoute, object, 'DELETE'); // works
    imp.set.userStore(user);
    return user;
}

// export async function oAuth2Authorize()
// {
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=638776641502-vbf7kufc0kb8qqb9jtkpt5gtqgu49b45.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=code&scope=openid&access_type=offline`;
//     try {
//         const supported = await Linking.canOpenURL(url);
    
//         if (supported) {
//           await Linking.openURL(url);
//         } else {
//           console.error(`Don't know how to open this URL: ${url}`);
//         }
//       } catch (error) {
//         console.error('An error occurred: ', error);
//       }
// }
>>>>>>> origin/EB-OAuth2
