import { configureStore, createAsyncThunk } from 'redux';
import { getProperty, getProperties, createProperty, updateProperty, createRootSlice } from './root';

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

export const getComment = createAsyncThunk('getComment', getProperty('', commentId));
export const getComments = createAsyncThunk('getComments', getProperties('', commentIds));
export const getCommentsFromQuestion = createAsyncThunk('getCommentsFromQuestion', getProperties('', questionId));
export const getCommentsFromAnswer = createAsyncThunk('getCommentsFromAnswer', getProperties('', answerId));
export const createComment = createAsyncThunk('createComment', createProperty('', comment));
export const updateComment = createAsyncThunk('updateComment', updateProperty('', comment));

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

