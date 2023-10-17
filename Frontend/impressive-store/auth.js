import { authorize, refresh } from 'react-native-app-auth';

export const authStore = {
    acessToken: null
}

// ++++++++++++++++++++++
// TODO: Replace these with the backend routes
// * Pay attention to the HTTP method, which is the last argument in the passId and passObject functions

const normalAuthorizeRoute = '';
const oAuth2AuthorizeRoute = '';

// ----------------------

export async function normalAuthorize(imp, userData)
{
    const response = await passObject(normalAuthorizeRoute, userData, 'POST');
    imp.set.authStore = response;
    return response;
}

export async function oAuth2Authorize()
{
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
        const response = fetch (oAuth2AuthorizeRoute, {
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
}


