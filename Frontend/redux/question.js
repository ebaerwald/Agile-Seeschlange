import { configureStore, createAsyncThunk } from 'redux';
import { getProperty, getProperties, createProperty, updateProperty, createRootSlice } from './root';

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

export const getQuestion = createAsyncThunk('getQuestion', getProperty('', questionId));
export const getQuestions = createAsyncThunk('getQuestions', getProperties('', questionIds));
export const getQuestionsFromGroup = createAsyncThunk('getQuestionsFromGroup', getProperties('', groupId));
export const getQuestionsFromUser = createAsyncThunk('getQuestionsFromUser', getProperties('', userId));
export const createQuestion = createAsyncThunk('createQuestion', createProperty('', initialState));
export const updateQuestion = createAsyncThunk('updateQuestion', updateProperty('', question));

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
