import { configureStore, createAsyncThunk } from 'redux';
import { passId, passObject, createRootSlice } from './root';

require('dotenv').config();

const initialStateUser = {
    id: null,
    username: null,
    email: null,
    hashedPassword: null,
    questionIds: [],
    answerIds: [],
    favoredQuestionIds: [],
    favoredAnswerIds: [],
};

const initialStateUsers = {
    users: [],
    status: 'idle',
    error: null,
};

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

export const getUser = createAsyncThunk('getUser', passId(getUserRoute, userId, 'GET'));
export const getUserFromQuestion = createAsyncThunk('getUsersFromQuestion', passId(getUserFromQuestionRoute, questionId, 'GET'));
export const getUserFromAnswer = createAsyncThunk('getUsersFromAnswer', passId(getUserFromAnswerRoute, answerId, 'GET'));
export const getUsers = createAsyncThunk('getUsers', passObject(getUsersRoute, userIds, 'GET'));
export const getUsersFromGroup = createAsyncThunk('getUsersFromGroup', passId(getUsersFromGroupRoute, groupId, 'GET'));
export const createUser = createAsyncThunk('createUser', passObject(createUserRoute, user, 'POST'));
export const updateUser = createAsyncThunk('updateUser', passObject(updateUserRoute, user, 'PUT'));

const userSlice = createRootSlice('user', initialStateUser, [getUser, createUser, updateUser, getUserFromQuestion, getUserFromAnswer]);
const usersSlice = createRootSlice('users', initialStateUsers, [getUsers, getUsersFromGroup]);

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        users: usersSlice.reducer,
    },
});

export const selectUser = (state) => state.user;
export const selectUsers = (state) => state.users;







