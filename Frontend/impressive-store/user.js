import { passId, passObject } from "./root";

export const userStore = {
    id: null,
    username: null,
    email: null,
    hashedPassword: null,
    questionIds: [],
    answerIds: [],
    favoredQuestionIds: [],
    favoredAnswerIds: []
}

export const usersStore = {
    users: []
}

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getUserRoute = '';
const getUserFromQuestionRoute = '';
const getUserFromAnswerRoute = '';
const getUsersRoute = '';
const getUsersFromGroupRoute = '';
const createUserRoute = '';
const updateUserRoute = '';

// ----------------------

export async function getUser(imp, userId)
{
    const user = await passId(getUserRoute, userId, 'GET');
    imp.set.userStore = user;
    return user;
}

export async function getUserFromQuestion(imp, questionId)
{
    const user = await passId(getUserFromQuestionRoute, questionId, 'GET');
    imp.set.userStore = user;
    return user;
}

export async function getUserFromAnswer(imp, answerId)
{
    const user = await passId(getUserFromAnswerRoute, answerId, 'GET');
    imp.set.userStore = user;
    return user;
}

export async function getUsers(imp, userIds)
{
    const users = await passObject(getUsersRoute, userIds, 'GET');
    imp.set.usersStore = users;
    return users;
}

export async function getUsersFromGroup(imp, groupId)
{
    const users = await passId(getUsersFromGroupRoute, groupId, 'GET');
    imp.set.usersStore = users;
    return users;
}

export async function createUser(imp, user)
{
    const newUser = await passObject(createUserRoute, user, 'POST');
    imp.set.userStore = newUser;
    return newUser;
}

export async function updateUser(imp, user)
{
    const updatedUser = await passObject(updateUserRoute, user, 'PUT');
    imp.set.userStore = updatedUser;
    return updatedUser;
}