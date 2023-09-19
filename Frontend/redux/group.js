import { configureStore, createAsyncThunk } from 'redux';
import { getProperty, getProperties, createProperty, updateProperty, createRootSlice } from './root';

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

export const getGroup = createAsyncThunk('getGroup', getProperty('', groupId));
export const getGroups = createAsyncThunk('getGroups', getProperties('', groupIds));
export const createGroup = createAsyncThunk('createGroup', createProperty('', initialState));
export const updateGroup = createAsyncThunk('updateGroup', updateProperty('', group));

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