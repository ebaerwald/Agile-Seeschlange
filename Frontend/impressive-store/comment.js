import { passId, passObject } from "./root";

export const commentStore = {
    id: null,
    text: null,
    userId: null,
    questionAnswerId: null,
    isQuestion: false
};

export const commentsStore = {
    comments: []
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

export async function getComment(imp, commentId)
{
    const comment = await passId(getCommentRoute, commentId, 'GET');
    imp.set.commentStore = comment;
    return comment;
}

export async function getComments(imp, commentIds)
{
    const comments = await passObject(getCommentsRoute, commentIds, 'GET');
    imp.set.commentsStore = comments;
    return comments;
}

export async function getCommentsFromQuestion(imp, questionId)
{
    const comments = await passId(getCommentsFromQuestionRoute, questionId, 'GET');
    imp.set.commentsStore = comments;
    return comments;
}

export async function getCommentsFromAnswer(imp, answerId)
{
    const comments = await passId(getCommentsFromAnswerRoute, answerId, 'GET');
    imp.set.commentsStore = comments;
    return comments;
}

export async function createComment(imp, comment)
{
    const newComment = await passObject(createCommentRoute, comment, 'POST');
    imp.set.commentStore = newComment;
    return newComment;
}

export async function updateComment(imp, comment)
{
    const updatedComment = await passObject(updateCommentRoute, comment, 'PUT');
    imp.set.commentStore = updatedComment;
    return updatedComment;
}
