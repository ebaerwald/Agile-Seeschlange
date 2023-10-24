import { passId, passObject } from "./root";
import { hash } from "bcryptjs";

export const userStore = {
    id: null,
    username: 'null',
    email: null,
    favoredQuestionIds: []
}

export const usersStore = {
    users: []
}

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getUserRoute = 'http://localhost:3001/api/user'; //finished
const createUserRoute = 'http://localhost:3001/api/user/signup'; //finished
const updateUserRoute = 'http://localhost:3001/api/user'; //finished waiting for commit
const addFavoriteQuestionRoute = 'http://localhost:3001/api/user/addfavoritequestion'; //finished
const deleteUserRoute = 'http://localhost:3001/api/user'; //delete backend function falsch geschrieben // finished

// ----------------------

export async function getUser(imp, object)
{
    const user = await passObject(getUserRoute, object, 'GET');
    imp.set.userStore = user;
    return user;
}


export async function createUser(imp, object)
{
    const user = await passObject(createUserRoute, object, 'POST');
    imp.set.userStore = user;
    return user;
}

export async function hashPassword(password)
{
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
}

export async function updateUser(imp, object)
{
    const user = await passObject(updateUserRoute, object, 'PUT');
    imp.set.userStore = user;
    return user;
}

export async function addFavoriteQuestion(imp, object)
{
    const user = await passObject(addFavoriteQuestionRoute, object, 'PUT');
    imp.set.userStore = user;
    return user;
}

export async function deleteUser(imp, object)
{
    const user = await passObject(deleteUserRoute, object, 'DELETE');
    imp.set.userStore = user;
    return user;
}