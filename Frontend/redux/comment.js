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

export const getComment = createAsyncThunk('getComment', passId('', commentId, 'GET'));
export const getComments = createAsyncThunk('getComments', passObject('', commentIds, 'GET'));
export const getCommentsFromQuestion = createAsyncThunk('getCommentsFromQuestion', passId('', questionId, 'GET'));
export const getCommentsFromAnswer = createAsyncThunk('getCommentsFromAnswer', passId('', answerId, 'GET'));
export const createComment = createAsyncThunk('createComment', passObject('', comment, 'POST'));
export const updateComment = createAsyncThunk('updateComment', passObject('', comment, 'PUT'));

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

