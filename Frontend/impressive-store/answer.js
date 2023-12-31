import { passId, passObject, passIdObject } from "./root";
import config from '../config';

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

const ipv4 = config.serverIP;
const createAnswerRoute = 'http://' + ipv4 + ':3001/api/answer'; //post pass id
const updateAnswerRoute = 'http://' + ipv4 + ':3001/api/answer'; //put
const deleteAnswerRoute = 'http://' + ipv4 + ':3001/api/answer'; //del pass id


// ----------------------

export async function createAnswer(imp, object)
{
    const answer = await passObject(createAnswerRoute, object, 'POST'); // works
    imp.set.answerStore(answer);
    return answer;
}

export async function updateAnswer(imp, answerId, object)
{
    const answer = await passIdObject(updateAnswerRoute, answerId, object, 'PUT'); // dont work errorMessage is not defined
    imp.set.answerStore(answer);
    return answer;
}

export async function deleteAnswer(imp, answerId)
{
    const answer = await passId(deleteAnswerRoute, answerId, 'DELETE'); // works
    imp.set.answerStore(answer);
    return answer;
}