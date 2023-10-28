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

const ipv4 = '192.168.178.67';
const getQuestionRoute = 'http://' + ipv4 + ':3001/api/thread'; //get //questionId //finished

const getQuestionsRoute = 'http://' + ipv4 + ':3001/api/threads'; //get // random questions //finished

const createQuestionRoute = 'http://' + ipv4 + ':3001/api/thread'; // post // finished

const updateQuestionRoute = 'http://' + ipv4 + ':3001/api/thread'; // pass id put // finished

const deleteQuestionRoute = 'http://' + ipv4 + ':3001/api/thread'; // del pass id // finished

// ----------------------

export async function getQuestion(imp, questionId)
{
    const question = await passId(getQuestionRoute, questionId, 'GET'); // works
    imp.set.questionStore (question);
    return question;
}

export async function getQuestions(imp)
{
    const questions = await passNone(getQuestionsRoute, 'GET'); // works
    imp.set.questionsStore(questions);
    return questions;
}

export async function createQuestion(imp, object)
{
    const question = await passObject(createQuestionRoute, object, 'POST'); // works but to less information in the response
    imp.set.questionStore(question);
    return question;
}

export async function updateQuestion(imp, questionId, object)
{
    const question = await passIdObject(updateQuestionRoute, questionId, object, 'PUT'); //fehler im backend Cannot read properties of undefined (reading 'map')
    imp.set.questionStore(question);
    return question;
}

export async function deleteQuestion(imp, questionId)
{
    const question = await passId(deleteQuestionRoute, questionId, 'DELETE'); // works
    imp.set.questionStore(question);
    return question;
}
