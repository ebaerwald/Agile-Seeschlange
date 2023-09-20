import { configureStore, createAsyncThunk } from 'redux';
import { passId, passObject, createRootSlice } from './root';

const initialStateQuestion = {
    id: null,
    title: null,
    text: null,
    tags: [],
    score: 0,
    views: 0,
    closed: false,
    groupId: null,
    files: null,
    createdAt: new Date(),
    closedAt: null,
    status: 'idle', 
    error: null,
};

const initialStateQuestions = {
    questions: [],
    status: 'idle',
    error: null,
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getQuestionRoute = '';
const getQuestionsFromGroupRoute = '';
const getQuestionsFromUserRoute = '';
const getQuestionsRoute = '';
const createQuestionRoute = '';
const updateQuestionRoute = '';

// ----------------------

export const getQuestion = createAsyncThunk('getQuestion', passId(getQuestionRoute, questionId, 'GET'));
export const getQuestionsFromGroup = createAsyncThunk('getQuestionsFromGroup', passId(getQuestionsFromGroupRoute, groupId, 'GET'));
export const getQuestionsFromUser = createAsyncThunk('getQuestionsFromUser', passId(getQuestionsFromUserRoute, userId, 'GET'));
export const getQuestions = createAsyncThunk('getQuestions', passObject(getQuestionsRoute, questionIds, 'GET'));
export const createQuestion = createAsyncThunk('createQuestion', passObject(createQuestionRoute, question, 'POST'));
export const updateQuestion = createAsyncThunk('updateQuestion', passObject(updateQuestionRoute, question, 'PUT'));

const questionSlice = createRootSlice('question', initialStateQuestion, [getQuestion, createQuestion, updateQuestion]);
const questionsSlice = createRootSlice('questions', initialStateQuestions, [getQuestions, getQuestionsFromGroup, getQuestionsFromUser]);

export const store = configureStore({
    reducer: {
        question: questionSlice.reducer,
        questions: questionsSlice.reducer,
    },
});

export const selectQuestion = (state) => state.question;
export const selectQuestions = (state) => state.questions;
