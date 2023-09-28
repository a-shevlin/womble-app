import { getSession } from 'next-auth/react';
import { refreshAccessToken } from './auth/[...nextauth]';

export default async function handler(req: any, res: any) {
  const session = await getSession({req});
  
  // console.log(session);
  if (!session) {
    return res.status(401).send('Unauthorized: ', res);
  } else {
    let accessToken = session?.accessToken;
    // Use session.accessToken to fetch profile from Spotify and return it

    const url = "https://api.spotify.com/v1/" + req.query.url;
    let result = await fetch(url,  {
      method: "GET",
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    });

    if(result.status === 401) {
      const refreshedToken = await refreshAccessToken(session);
      accessToken = refreshedToken.accessToken;
      
      result = await fetch(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
    }

    if (!result.ok) {
      // Log error details for non-2xx responses.
      const text = await result.text();
      console.error('API Error:', result.status, text);
      return res.status(result.status).send(text);
    }
    const data = await result.json();
    res.send(data);
  }
}

// RESPONSE

// export type UserData = {
//   "country": "string",
//   "display_name": "string",
//   "email": "string",
//   "explicit_content": {
//     "filter_enabled": false,
//     "filter_locked": false
//   },
//   "external_urls": {
//     "spotify": "string"
//   },
//   "followers": {
//     "href": "string",
//     "total": 0
//   },
//   "href": "string",
//   "id": "string",
//   "images": [
//     {
//       "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
//       "height": 300,
//       "width": 300
//     }
//   ],
//   "product": "string",
//   "type": "string",
//   "uri": "string"
// }