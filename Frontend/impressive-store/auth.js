import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';


export const authStore = {
    userData: null
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

// export async function configureGoogleSignIn()
// {
//     GoogleSignin.configure({
//         webClientId:
//           process.env.CLIENT_ID,
//         offlineAccess: true,
//         forceCodeForRefreshToken: true,
//       });
// }

// export async function googleSigIn(imp)
// {
//     try {
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
  
//         console.log(userInfo);
//         imp.set.authStore = userInfo;
//     } catch (error) {
//         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//           console.log('User cancelled the login flow');
//         } else if (error.code === statusCodes.IN_PROGRESS) {
//           console.log('Signing in');
//         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//           console.log('Play services not available');
//         } else {
//           console.log('Some other error happened');
//           console.log(error.message);
//           console.log(error.code);
//         }
//     }
// }



// export async function authorizationRequest()
// {
//     const oAuth2Client = new google.auth.OAuth2(
//         process.env.CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         process.env.REDIRECT_URI
//     );
    
//     const authorizationUrl =  oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: 'https://accounts.google.com/o/oauth2/auth',
//         include_granted_scopes: true,
//         prompt: 'consent',
//         redirect_uri: process.env.REDIRECT_URI // the google sever sends a response to the redirect_uri
//     });

//     window.location.href = authorizationUrl;
// }

// export async function getAcessToken(authorizationCode)
// {
//     const oAuth2Client = new google.auth.OAuth2(
//         process.env.CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         process.env.REDIRECT_URI
//     );
    
//     const { tokens } = await oAuth2Client.getToken(authorizationCode);

//     const access_token = tokens.access_token;
//     const refresh_token = tokens.refresh_token;
//     const id_token = tokens.id_token;
//     oAuth2Client.setCredentials(tokens);
// }

// export async function getUserInformation(idToken)
// {
//     try {
//         const ticket = await client.verifyIdToken({
//           idToken: idToken,
//           audience: 'YOUR_CLIENT_ID', // Your OAuth2 client ID
//         });
//         const payload = ticket.getPayload();
//         const email = payload.email; // User's email address
//         const userId = payload.sub; // Google User ID
    
//         return { email, userId };
//       } catch (error) {
//         console.error('Error verifying Google ID token:', error);
//         return null;
//       }
// }


