import { authorize, refresh } from 'react-native-app-auth';
require('dotenv').config();

export async function useOAuth()
{
    const config = {
      issuer: 'https://accounts.google.com',
      clientId: process.env.CLIENT_ID,
      redirectUrl: 'com.yourapp:/oauthredirect',
      scopes: ['openid', 'profile', 'email'],
    };
    
    // Step 1: Initiate Device Authorization Flow
    const { device_code, user_code, verification_uri_complete } = await authorize(config);
    
    // Step 2: Display user_code and verification_uri_complete to the user
    console.log(`Visit ${verification_uri_complete} and enter code: ${user_code}`);
    
    // Step 3: Poll for token (this can be done in the background)
    const tokenResult = await refresh(config, {
      refreshToken: null, // Set to null initially
      clientId: config.clientId,
    });
    
    console.log('Access token:', tokenResult.accessToken);
    sessionStorage.setItem('token', tokenResult.accessToken);
}
