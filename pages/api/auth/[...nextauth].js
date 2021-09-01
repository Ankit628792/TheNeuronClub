import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    theme: 'light',
    // ... other options
  };

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      maxAge: 60 * 60,
    }),
    // Passwordless / email sign in
    Providers.Email({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60,
    }),
  ],
  // Optional SQL or MongoDB database to persist users
  database: process.env.DATABASE_URL,
  options
})

