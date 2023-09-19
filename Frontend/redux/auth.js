import { configureStore, createAsyncThunk } from 'redux';
import { authorize, refresh } from 'react-native-app-auth';
import { getProperty } from './root';

require('dotenv').config();

const initialState = {
    acessToken: null,
    error: null,
    status: 'idle',
};

export const normalAuthorize = createAsyncThunk('normalAuthorize', async (userData) => {
    try {
        if (userData.password == null || (userData.email && userData.username) == null) throw new Error("Invalid parameters");
        const response = await fetch('http://localhost:3000/api/v1/user/authorize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, userData }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        throw new Error(data);
    } catch (error) {
        throw new Error(error.message);
    }
});

export const oAuth2Authorize = createAsyncThunk('fetchUser', async () => {
    try {
        const config = {
            issuer: 'https://accounts.google.com',
            clientId: process.env.CLIENT_ID,
            redirectUrl: '../pages/index.js',
            scopes: ['openid', 'profile', 'email'],
        };
    
        const { user_code, verification_uri_complete } = await authorize(config);
    
        console.log(`Visit ${verification_uri_complete} and enter code: ${user_code}`);
    
        const tokenResult = await refresh(config, {
            refreshToken: null, 
            clientId: config.clientId,
        });
    
        const accessToken = tokenResult.accessToken;
        const response = fetch ('http://localhost:3000/api/v1/user/authorize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        throw new Error(data);
    }
    catch (error) {
        throw new Error(error.message);
    }
});

const userSlice = ({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authorize.pending, (state) => {
                state.acessToken = null;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(authorize.fulfilled, (state, action) => {
                state.acessToken = action.payload.acessToken;
                state.error = null;
                state.status = 'succeeded'
            })
            .addCase(authorize.rejected, (state, action) => {
                state.acessToken = null;
                state.error = action.payload;
            });
    },
});

export const store = configureStore({
    reducer: {
        user: userSlice.reducers,
    },
});

export const selectAcessToken = (state) => state.user.acessToken;

export const selectError = (state) => state.user.error;









