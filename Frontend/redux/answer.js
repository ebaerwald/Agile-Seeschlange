import { configureStore, createAsyncThunk } from 'redux';
import { createRootSlice, passId, passObject } from './root';

const initialStateAnswer = {
    id: null,
    title: null,
    text: null,
    tags: [],
    score: 0,
    views: 0,
    closed: false,
    questionId: null,
    files: null,
    createdAt: new Date(),
    mostHelpfull: false,
    status: 'idle', 
    error: null,
};

const initialStateAnswers = {
    answers: [],
    status: 'idle',
    error: null,
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getAnswerRoute = '';
const getAnswersRoute = '';
const getAnswersFromQuestionRoute = '';
const getAnswersFromUserRoute = '';
const getMostHelpfullAnswerFromQuestionRoute = '';
const getMostHelpfullAnswersFromGroupRoute = '';
const getMostHelpfullAnswersFromUserRoute = '';
const createAnswerRoute = '';
const updateAnswerRoute = '';

// ----------------------

export const getAnswer = createAsyncThunk('getAnswer', passId(getAnswerRoute, answerId, 'GET'));
export const getAnswers = createAsyncThunk('getAnswers', passObject(getAnswersRoute, answerIds, 'GET'));
export const getAnswersFromQuestion = createAsyncThunk('getAnswersFromQuestion', passId(getAnswersFromQuestionRoute, questionId, 'GET'));
export const getAnswersFromUser = createAsyncThunk('getAnswersFromUser', passId(getAnswersFromUserRoute, userId, 'GET'));
export const getMostHelpfullAnswerFromQuestion = createAsyncThunk('getMostHelpfullAnswerFromQuestion', passId(getMostHelpfullAnswerFromQuestionRoute, questionId, 'GET'));
export const getMostHelpfullAnswersFromGroup = createAsyncThunk('getMostHelpfullAnswersFromGroup', passId(getMostHelpfullAnswersFromGroupRoute, groupId, 'GET'));
export const getMostHelpfullAnswersFromUser = createAsyncThunk('getMostHelpfullAnswersFromUser', passId(getMostHelpfullAnswersFromUserRoute, userId, 'GET'));
export const createAnswer = createAsyncThunk('createQuestion', passObject(createAnswerRoute, answer, 'POST'));
export const updateAnswer = createAsyncThunk('updateQuestion', passObject(updateAnswerRoute, answer, 'PUT'));

const answerSlice = createRootSlice('answer', initialStateAnswer, [getAnswer, createAnswer, updateAnswer, getMostHelpfullAnswerFromQuestion]);
const answersSlice = createRootSlice('answers', initialStateAnswers, [getAnswers, getAnswersFromQuestion, getAnswersFromUser]);

export const store = configureStore({
    reducer: {
        answer: answerSlice.reducer,
        answers: answersSlice.reducer,
    },
});

export const selectAnswer = (state) => state.answer;
export const selectAnswers = (state) => state.answers;
