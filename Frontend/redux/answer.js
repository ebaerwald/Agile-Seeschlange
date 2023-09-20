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

export const getAnswer = createAsyncThunk('getAnswer', passId('', answerId, 'GET'));
export const getAnswers = createAsyncThunk('getAnswers', passObject('', answerIds, 'GET'));
export const getAnswersFromQuestion = createAsyncThunk('getAnswersFromQuestion', passId('', questionId, 'GET'));
export const getAnswersFromUser = createAsyncThunk('getAnswersFromUser', passId('', userId, 'GET'));
export const getMostHelpfullAnswerFromQuestion = createAsyncThunk('getMostHelpfullAnswerFromQuestion', passId('', questionId, 'GET'));
export const getMostHelpfullAnswersFromGroup = createAsyncThunk('getMostHelpfullAnswersFromGroup', passId('', groupId, 'GET'));
export const getMostHelpfullAnswersFromUser = createAsyncThunk('getMostHelpfullAnswersFromUser', passId('', userId, 'GET'));
export const createAnswer = createAsyncThunk('createQuestion', passObject('', answer, 'POST'));
export const updateAnswer = createAsyncThunk('updateQuestion', passObject('', answer, 'PUT'));

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
