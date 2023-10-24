import { passId, passObject, passIdObject, passNone } from "./root";

export const questionStore = {
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
    updatedAt: null
};

export const questionsStore = {
    questions: []
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getQuestionRoute = 'http://localhost:3001/api/thread'; //get //questionId //finished

const getQuestionsRoute = 'http://localhost:3001/api/threads'; //get // random questions //finished

const createQuestionRoute = 'http://localhost:3001/api/thread'; // post // finished

const updateQuestionRoute = 'http://localhost:3001/api/thread'; // pass id put // finished

const deleteQuestionRoute = 'http://localhost:3001/api/thread'; // del pass id // finished

// ----------------------

export async function getQuestion(imp, questionId)
{
    const question = await passId(getQuestionRoute, questionId, 'GET');
    imp.set.questionStore = question;
    return question;
}

export async function getQuestions(imp)
{
    const questions = await passNone(getQuestionsRoute, 'GET');
    imp.set.questionsStore = questions;
    return questions;
}

export async function createQuestion(imp, object)
{
    const question = await passObject(createQuestionRoute, object, 'POST');
    imp.set.questionStore = question;
    return question;
}

export async function updateQuestion(imp, questionId, object)
{
    const question = await passIdObject(updateQuestionRoute, questionId, object, 'PUT');
    imp.set.questionStore = question;
    return question;
}

export async function deleteQuestion(imp, questionId)
{
    const question = await passId(deleteQuestionRoute, questionId, 'DELETE');
    imp.set.questionStore = question;
    return question;
}
