import { configureStore, createAsyncThunk } from 'redux';
import { createRootSlice, passId, passObject } from './root';

const initialStateGroup = {
    id: null,
    name: null,
    description: null,
    tags: [],
    userIds: [],
    groupOwnerId: null,
    status: 'idle',
    error: null,
};

const initialStateGroups = {
    groups: [],
    status: 'idle',
    error: null,
};

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const getGroupRoute = '';
const getGroupsRoute = '';
const createGroupRoute = '';
const updateGroupRoute = '';

// ----------------------

export const getGroup = createAsyncThunk('getGroup', passId(getGroupRoute, groupId, 'GET'));
export const getGroups = createAsyncThunk('getGroups', passObject(getGroupsRoute, groupIds, 'GET'));
export const createGroup = createAsyncThunk('createGroup', passObject(createGroupRoute, group, 'POST'));
export const updateGroup = createAsyncThunk('updateGroup', passObject(updateGroupRoute, group, 'PUT'));

const groupSlice = createRootSlice('group', initialStateGroup, [getGroup, createGroup, updateGroup]);
const groupsSlice = createRootSlice('groups', initialStateGroups, [getGroups]);

export const store = configureStore({
    reducer: {
        group: groupSlice.reducer,
        groups: groupsSlice.reducer,
    },
});

export const selectGroup = (state) => state.group;
export const selectGroups = (state) => state.groups;