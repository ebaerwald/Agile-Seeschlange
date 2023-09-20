import { configureStore, createAsyncThunk } from 'redux';
import { createRootSlice, passId, passObject } from './root';

const initialStateComment = {
    id: null,
    text: null,
    userId: null,
    questionAnswerId: null,
    isQuestion: false,
    status: 'idle',
    error: null
};

const initialStateComments = {
    comments: [],
    status: 'idle',
    error: null,
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getCommentRoute = '';
const getCommentsRoute = '';
const getCommentsFromQuestionRoute = '';
const getCommentsFromAnswerRoute = '';
const createCommentRoute = '';
const updateCommentRoute = '';

// ----------------------

export const getComment = createAsyncThunk('getComment', passId(getCommentRoute, commentId, 'GET'));
export const getComments = createAsyncThunk('getComments', passObject(getCommentsRoute, commentIds, 'GET'));
export const getCommentsFromQuestion = createAsyncThunk('getCommentsFromQuestion', passId(getCommentsFromQuestionRoute, questionId, 'GET'));
export const getCommentsFromAnswer = createAsyncThunk('getCommentsFromAnswer', passId(getCommentsFromAnswerRoute, answerId, 'GET'));
export const createComment = createAsyncThunk('createComment', passObject(createCommentRoute, comment, 'POST'));
export const updateComment = createAsyncThunk('updateComment', passObject(updateCommentRoute, comment, 'PUT'));

const commentSlice = createRootSlice('comment', initialStateComment, [getComment, createComment, updateComment]);
const commentsSlice = createRootSlice('comments', initialStateComments, [getComments, getCommentsFromQuestion, getCommentsFromAnswer]);

export const store = configureStore({
    reducer: {
        comment: commentSlice.reducer,
        comments: commentsSlice.reducer,
    },
});

export const selectComment = (state) => state.comment;
export const selectComments = (state) => state.comments;

