import { passId, passObject, passIdObject } from "./root";

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

const getGroupRoute = 'http://localhost:3001/api/group'; //get //groupId //finished
const getGroupsRoute = 'http://localhost:3001/api/groups'; //get // random groups //finished

const createGroupRoute = 'http://localhost:3001/api/group'; //post pass id
const updateGroupRoute = 'http://localhost:3001/api/group'; //put

const deleteGroupRoute = 'http://localhost:3001/api/group'; //del

const addUserToGroupRoute = 'http://localhost:3001/api/addUserToGroup'; //put

const deleteUserFromGroupRoute = 'http://localhost:3001/api/deleteUserFromGroup'; //del
const addTagToGroupRoute = 'http://localhost:3001/api/addTagToGroup'; //post

const deleteTagFromGroupRoute = 'http://localhost:3001/api/deleteTagFromGroup'; //del


// ----------------------

export async function getGroup(imp, groupId)
{
    const group = await passId(getGroupRoute, groupId, 'GET');
    imp.set.groupStore = group;
    return group;
}

export async function getGroups(imp)
{
    const groups = await passNone(getGroupsRoute, 'GET');
    imp.set.groupsStore = groups;
    return groups;
}

export async function createGroup(imp, object)
{
    const newGroup = await passObject(createGroupRoute, object, 'POST');
    imp.set.groupStore = newGroup;
    return newGroup;
}

export async function updateGroup(imp, object)
{
    const updatedGroup = await passIdObject(updateGroupRoute, object, 'PUT');
    imp.set.groupStore = updatedGroup;
    return updatedGroup;
}

export async function deleteGroup(imp, groupId)
{
    const deletedGroup = await passId(deleteGroupRoute, groupId, 'DELETE');
    imp.set.groupStore = deletedGroup;
    return deletedGroup;
}

export async function addUserToGroup(imp, object)
{
    const group = await passObject(addUserToGroupRoute, object, 'PUT');
    imp.set.groupStore = group;
    return addedUser;
}
export async function deleteUserFromGroup(imp, object)
{
    const group = await passObject(deleteUserFromGroupRoute, object, 'DELETE');
    imp.set.groupStore = group;
    return group;
}

export async function addTagToGroup(imp, object)
{
    const group = await passObject(addTagToGroupRoute, object, 'POST');
    imp.set.groupStore = group;
    return group;
}

export async function deleteTagFromGroup(imp, object)
{
    const group = await passObject(deleteTagFromGroupRoute, object, 'DELETE');
    imp.set.groupStore = group;
    return group;
}