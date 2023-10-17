import { passId, passObject } from "./root";

export const groupStore = {
    id: null,
    name: null,
    description: null,
    tags: [],
    userIds: [],
    groupOwnerId: null
};

export const groupsStore = {
    groups: []
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getGroupRoute = '';
const getGroupsRoute = '';
const createGroupRoute = '';
const updateGroupRoute = '';

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
