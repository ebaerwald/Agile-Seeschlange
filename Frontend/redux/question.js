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

export const getQuestion = createAsyncThunk('getQuestion', passId('', questionId, 'GET'));
export const getQuestionsFromGroup = createAsyncThunk('getQuestionsFromGroup', passId('', groupId, 'GET'));
export const getQuestionsFromUser = createAsyncThunk('getQuestionsFromUser', passId('', userId, 'GET'));
export const getQuestions = createAsyncThunk('getQuestions', passObject('', questionIds, 'GET'));
export const createQuestion = createAsyncThunk('createQuestion', passObject('', question, 'POST'));
export const updateQuestion = createAsyncThunk('updateQuestion', passObject('', question, 'PUT'));

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
