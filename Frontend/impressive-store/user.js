import { passId, passObject, passIdObject } from "./root";
import * as Crypto from "expo-crypto";
import config from "../config";

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

const ipv4 = config.serverIP;
const getUserRoute = "http://" + ipv4 + ":3001/api/user"; // don not work, body is not allowed for ger requests
const signUpUserRoute = "http://" + ipv4 + ":3001/api/user/signup"; //finished
const logInUserRoute = "http://" + ipv4 + ":3001/api/user/login"; //finished
const updateUserRoute = "http://" + ipv4 + ":3001/api/user"; //finished waiting for commit
const addFavoriteQuestionRoute =
  "http://" + ipv4 + ":3001/api/user/addfavoritequestion"; //finished
const deleteUserRoute = "http://" + ipv4 + ":3001/api/user"; //delete backend function falsch geschrieben // finished

// ----------------------

export async function getUser(imp, object) {
  const user = await passObject(getUserRoute, object, "GET"); // object: {googleUserId} // TODO: change to id
  imp.set.userStore(user);
  return user;
}

export async function signUpUser(imp, object) {
  try {
    const user = await passObject(signUpUserRoute, object, "POST"); // object: {email, name, lastname, googleUserId} works
    imp.set.userStore(user);
    return user;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export async function logInUser(imp, object)
{
  try 
  {
    const user = await passObject(logInUserRoute, object, "POST"); 
    imp.set.userStore(user);
    return user;
  }
  catch (error) {
    console.log(error);
    return null;
  }
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

export async function deleteUser(imp, object) {
  const user = await passObject(deleteUserRoute, object, "DELETE"); // works
  imp.set.userStore(user);
  return user;
}
