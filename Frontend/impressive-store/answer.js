import { passId, passObject } from "./root";

export const answerStore = {
    id: null,
    answerOwner: null,
    title: null,
    text: null,
    tags: [],
    score: 0,
    questionId: null,
    parentAnswer: null,
    files: null,
    createdAt: new Date(),
    mostHelpfull: false,
    updatedAt: null
};

export const answersStore = {
    answers: []
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

// const getAnswersFromQuestionRoute = ''; // bei den Threads

const createAnswerRoute = 'http://localhost:3001/api/answer'; //post pass id
const updateAnswerRoute = 'http://localhost:3001/api/answer'; //put
const deleteAnswerRoute = 'http://localhost:3001/api/answer'; //del pass id


// ----------------------

export async function getAnswer(imp, answerId)
{
    const answer = await passId(getAnswerRoute, answerId, 'GET');
    imp.set.answerStore = answer;
    return answer;
}

export async function getAnswers(imp, answerIds)
{
    const answers = await passObject(getAnswersRoute, answerIds, 'GET');
    imp.set.answersStore = answers;
    return answers;
}

export async function getAnswersFromQuestion(imp, questionId)
{
    const answers = await passId(getAnswersFromQuestionRoute, questionId, 'GET');
    imp.set.answersStore = answers;
    return answers;
}

export async function getAnswersFromUser(imp, userId)
{
    const answers = await passId(getAnswersFromUserRoute, userId, 'GET');
    imp.set.answersStore = answers;
    return answers;
}

export async function getMostHelpfullAnswerFromQuestion(imp, questionId)
{
    const answer = await passId(getMostHelpfullAnswerFromQuestionRoute, questionId, 'GET');
    imp.set.answerStore = answer;
    return answer;
}

export async function getMostHelpfullAnswersFromGroup(imp, groupId)
{
    const answers = await passId(getMostHelpfullAnswersFromGroupRoute, groupId, 'GET');
    imp.set.answersStore = answers;
    return answers;
}

export async function getMostHelpfullAnswersFromUser(imp, userId)
{
    const answers = await passId(getMostHelpfullAnswersFromUserRoute, userId, 'GET');
    imp.set.answersStore = answers;
    return answers;
}

export async function createAnswer(imp, answer)
{
    const newAnswer = await passObject(createAnswerRoute, answer, 'POST');
    imp.set.answerStore = newAnswer;
    return newAnswer;
}

export async function updateAnswer(imp, answer)
{
    const updatedAnswer = await passObject(updateAnswerRoute, answer, 'PUT');
    imp.set.answerStore = updatedAnswer;
    return updatedAnswer;
}