namespace NodeJS {
  interface ProcessEnv {
    // spotify
    SPOTIFY_CLIENT_ID: string,
    SPOTIFY_CLIENT_SECRET: string,

    // google
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CLIENT_SECRET: string,

    // next-auth
    NEXTAUTH_URL: string,
    NEXTAUTH_SECRET: string,

    // firebase
    FIREBASE_API_KEY: string,
    FIREBASE_AUTH_DOMAIN: string,
    FIREBASE_DATABASE_URL: string,
    FIREBASE_PROJECT_ID: string,
    FIREBASE_STORAGE_BUCKET: string,
    FIREBASE_MESSAGING_SENDER_ID: string,
    FIREBASE_APP_ID: string,
    FIREBASE_MEASUREMENT_ID: string,
    // firebase admin
    FIREBASE_ADMIN_SERVICE_ACCOUNT: string,
    FIREBASE_ADMIN_PRIVATE_SERVICE_KEY: string

    // tokens
    COOKIE_SECRET_CURRENT: string,
    COOKIE_SECRET_PREVIOUS: string;
  }
}