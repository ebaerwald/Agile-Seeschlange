import { configureStore, createAsyncThunk } from 'redux';
import { authorize, refresh } from 'react-native-app-auth';
import { passObject, createRootSlice } from './root';

require('dotenv').config();

const initialState = {
    acessToken: null,
    error: null,
    status: 'idle',
};

export const normalAuthorize = createAsyncThunk('normalAuthorize', passObject('', userData, 'POST', async(userData) => {
    if (userData.password == null || (userData.email && userData.username) == null) throw new Error("Invalid parameters");
}));

export const oAuth2Authorize = createAsyncThunk('oAuth2Authorize', async () =>{
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
        const response = fetch ('', {
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

const authSlice = createRootSlice('auth', initialState, [normalAuthorize, oAuth2Authorize]);

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export const selectAuth = (state) => state.auth;









