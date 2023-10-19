import { passId, passObject } from "./root";

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

const getGroupRoute = 'http://localhost:3001/api/group'; //get //groupId
const getGroupsRoute = 'http://localhost:3001/api/groups'; //get // random groups

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

export async function getGroups(imp, groupIds)
{
    const groups = await passObject(getGroupsRoute, groupIds, 'GET');
    imp.set.groupsStore = groups;
    return groups;
}

export async function createGroup(imp, group)
{
    const newGroup = await passObject(createGroupRoute, group, 'POST');
    imp.set.groupStore = newGroup;
    return newGroup;
}

export async function updateGroup(imp, group)
{
    const updatedGroup = await passObject(updateGroupRoute, group, 'PUT');
    imp.set.groupStore = updatedGroup;
    return updatedGroup;
}
