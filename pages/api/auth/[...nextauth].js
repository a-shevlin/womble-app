import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "@/app/firebase";
import NextAuth from "next-auth"
import SpotifyProvider from 'next-auth/providers/spotify'
import { doc, setDoc, getDoc, FieldValue, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref } from "firebase/storage";

const scopes = [
  "user-top-read",
  "user-read-recently-played",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-modify-playback-state"
].join(" ")

const params = {
  scope: scopes,
}

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();

export async function refreshAccessToken(token) {
  // console.log("refreshing with token: ", token);
  const params = new URLSearchParams()
  params.append("grant_type", "refresh_token")
  params.append("refresh_token", token.refreshToken)
  const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
          'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      body: params
  })
  const data = await response.json()
  // console.log("response data", data);
  return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.expires_in * 1000
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
   
    // ...add more providers here
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({user, account, profile}) {
      try {
        if (account.provider === 'spotify') {
          console.log("in signIn");
          console.log(account);
          const userRef = doc(db, 'users', user.id);
          
          // Check if user already exists
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            // Only write if user does not exist
            await setDoc(userRef, { ...user, spotifyProfile: profile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
            

          } else {
            await updateDoc(userRef, { updatedAt: serverTimestamp() })
          }
        }
      } catch (error) {
        console.error('Error Writing to Firestore:', error);
        return false;
      }
      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log("JWT TOken", token);
      if (account) {
        console.log("access token expires: ", new Date(account.expires_at * 1000))
        console.log("current time:", new Date())
        // console.log("account: ", account)
        
        if ( new Date().valueOf() < account.expires_at * 1000) {
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.accessTokenExpires = account.expires_at
          // console.log("token: ", token);
          
        }
      } else { 
        // access token has expired
        // console.log("grabbing token")
        let newToken =  await refreshAccessToken(token)
        // console.log(`new Token ${newToken}`)
        token = {...token, ...newToken};
      }
      return token
    },
    async session({session, token}) {
      if(!token) {
        console.error("Token is undefined");
        return session; // return the session object as is or modify as needed.
      }
      let newSession = {...session};
      // console.log("session: ", session);
      // console.log("token", token);
      // Send properties to the client, like an access_token from a provider.
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires * 1000) {
        newSession.accessToken = token.accessToken
      } else {
        let newSpotifyToken = await refreshAccessToken(token);
        newSession.accessToken = newSpotifyToken.accessToken
      }
      return newSession
    }
  }
}
export default NextAuth(authOptions)