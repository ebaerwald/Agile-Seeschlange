import { configureStore, createAsyncThunk } from 'redux';
import { getProperty, getProperties, createProperty, updateProperty, createRootSlice } from './root';
import { getProperty } from './root';

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

export const getUser = createAsyncThunk('getUser', getProperty('', userId));
export const getUsers = createAsyncThunk('getUsers', getProperties('', userIds));
export const createUser = createAsyncThunk('createUser', createProperty('', user));
export const updateUser = createAsyncThunk('updateUser', updateProperty('', user));
export const getUsersFromGroup = createAsyncThunk('getUsersFromGroup', getProperties('', groupId));
export const getUsersFromQuestion = createAsyncThunk('getUsersFromQuestion', getProperties('', questionId));
export const getUsersFromAnswer = createAsyncThunk('getUsersFromAnswer', getProperties('', answerId));









