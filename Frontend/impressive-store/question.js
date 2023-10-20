import { passId, passObject } from "./root";

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

const getQuestionWithAnswersRoute = 'http://localhost:3001/api/thread'; //get //questionId

const getQuestionsRoute = 'http://localhost:3001/api/threads'; //get // random questions

const createQuestionRoute = 'http://localhost:3001/api/thread'; // post
const updateQuestionRoute = 'http://localhost:3001/api/thread'; // pass id put
const deleteQuestionRoute = 'http://localhost:3001/api/thread'; // del pass id

// ----------------------

export async function getQuestion(imp, questionId)
{
    const question = await passId(getQuestionRoute, questionId, 'GET');
    imp.set.questionStore = question;
    return question;
}

export async function getQuestionsFromGroup(imp, groupId)
{
    const questions = await passId(getQuestionsFromGroupRoute, groupId, 'GET');
    imp.set.questionsStore = questions;
    return questions;
}

export async function getQuestionsFromUser(imp, userId)
{
    const questions = await passId(getQuestionsFromUserRoute, userId, 'GET');
    imp.set.questionsStore = questions;
    return questions;
}

export async function getQuestions(imp, questionIds)
{
    const questions = await passObject(getQuestionsRoute, questionIds, 'GET');
    imp.set.questionsStore = questions;
    return questions;
}

export async function createQuestion(imp, question)
{
    const newQuestion = await passObject(createQuestionRoute, question, 'POST');
    imp.set.questionStore = newQuestion;
    return newQuestion;
}

export async function updateQuestion(imp, question)
{
    const updatedQuestion = await passObject(updateQuestionRoute, question, 'PUT');
    imp.set.questionStore = updatedQuestion;
    return updatedQuestion;
}