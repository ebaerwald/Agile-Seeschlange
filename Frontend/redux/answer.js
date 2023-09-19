import { configureStore, createAsyncThunk } from 'redux';
import { getProperty, getProperties, createProperty, updateProperty, createRootSlice } from './root';

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

export const getAnswer = createAsyncThunk('getAnswer', getProperty('', answerId));
export const getAnswers = createAsyncThunk('getAnswers', getProperties('', answerIds));
export const getAnswersFromQuestion = createAsyncThunk('getAnswersFromQuestion', getProperties('', questionId));
export const getAnswersFromUser = createAsyncThunk('getAnswersFromUser', getProperties('', userId));
export const getMostHelpfullAnswerFromQuestion = createAsyncThunk('getMostHelpfullAnswerFromQuestion', getProperty('', questionId));
export const getMostHelpfullAnswersFromGroup = createAsyncThunk('getMostHelpfullAnswersFromGroup', getProperty('', groupId));
export const getMostHelpfullAnswersFromUser = createAsyncThunk('getMostHelpfullAnswersFromUser', getProperty('', userId));
export const createAnswer = createAsyncThunk('createQuestion', createProperty('', answer));
export const updateAnswer = createAsyncThunk('updateQuestion', updateProperty('', answer));

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
