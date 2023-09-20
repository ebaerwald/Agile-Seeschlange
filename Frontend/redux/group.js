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

export const getGroup = createAsyncThunk('getGroup', passId('', groupId, 'GET'));
export const getGroups = createAsyncThunk('getGroups', passObject('', groupIds, 'GET'));
export const createGroup = createAsyncThunk('createGroup', passObject('', group, 'POST'));
export const updateGroup = createAsyncThunk('updateGroup', passObject('', group, 'PUT'));

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