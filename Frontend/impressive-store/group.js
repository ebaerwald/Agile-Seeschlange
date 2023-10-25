import { passId, passObject, passIdObject, passNone } from "./root";

export const groupStore = {
    id: null,
    name: null,
    description: null,
    tags: [],
    userIds: [],
    groupOwnerId: null,
    createdAt: new Date(),
    updatedAt: null
};

export const groupsStore = {
    groups: []
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const ipv4 = '10.25.3.174';
const getGroupRoute = 'http://' + ipv4 + ':3001/api/getGroup'; //get //groupId //finished
const getGroupsRoute = 'http://' + ipv4 + ':3001/api/getGroups'; //get // random groups //finished

const createGroupRoute = 'http://' + ipv4 + ':3001/api/group'; //post pass id
const updateGroupRoute = 'http://' + ipv4 + ':3001/api/group'; //put

const deleteGroupRoute = 'http://' + ipv4 + ':3001/api/group'; //del

const addUserToGroupRoute = 'http://' + ipv4 + ':3001/api/addUserToGroup'; //put

const deleteUserFromGroupRoute = 'http://' + ipv4 + ':3001/api/deleteUserFromGroup'; //del
const addTagToGroupRoute = 'http://' + ipv4 + ':3001/api/addTagToGroup'; //post

const deleteTagFromGroupRoute = 'http://' + ipv4 + ':3001/api/deleteTagFromGroup'; //del


// ----------------------

export async function getGroup(imp, groupId)
{
    const group = await passId(getGroupRoute, groupId, 'GET'); //works
    imp.set.groupStore(group);
    return group;
}

export async function getGroups(imp)
{
    const groups = await passNone(getGroupsRoute, 'GET'); //works
    imp.set.groupsStore(groups);
    return groups;
}

export async function createGroup(imp, object)
{
    const newGroup = await passObject(createGroupRoute, object, 'POST'); // backend error: Cannot read properties of undefined (reading 'map')
    imp.set.groupStore(newGroup);
    return newGroup;
}

export async function updateGroup(imp, groupId, object)
{
    const updatedGroup = await passIdObject(updateGroupRoute, groupId, object, 'PUT'); // works
    imp.set.groupStore(updatedGroup);
    return updatedGroup;
}

export async function deleteGroup(imp, groupId)
{
    const deletedGroup = await passId(deleteGroupRoute, groupId, 'DELETE');
    imp.set.groupStore(deletedGroup);
    return deletedGroup;
}

export async function addUserToGroup(imp, object)
{
    const group = await passObject(addUserToGroupRoute, object, 'POST'); // works to less information in the response missing user ids
    imp.set.groupStore(group);
    return group;
}
export async function deleteUserFromGroup(imp, object)
{
    const group = await passObject(deleteUserFromGroupRoute, object, 'DELETE'); // works
    imp.set.groupStore(group);
    return group;
}

export async function addTagToGroup(imp, object)
{
    const group = await passObject(addTagToGroupRoute, object, 'POST'); // works
    imp.set.groupStore = group;
    return group;
}

export async function deleteTagFromGroup(imp, object)
{
    const group = await passObject(deleteTagFromGroupRoute, object, 'DELETE'); // works
    imp.set.groupStore = group;
    return group;
}