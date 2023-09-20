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

export const getUser = createAsyncThunk('getUser', passId('', userId, 'GET'));
export const getUserFromQuestion = createAsyncThunk('getUsersFromQuestion', passId('', questionId, 'GET'));
export const getUserFromAnswer = createAsyncThunk('getUsersFromAnswer', passId('', answerId, 'GET'));
export const getUsers = createAsyncThunk('getUsers', passObject('', userIds, 'GET'));
export const getUsersFromGroup = createAsyncThunk('getUsersFromGroup', passId('', groupId, 'GET'));
export const createUser = createAsyncThunk('createUser', passObject('', user, 'POST'));
export const updateUser = createAsyncThunk('updateUser', passObject('', user, 'PUT'));

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







