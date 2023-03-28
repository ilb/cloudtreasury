import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthUsecases from '../../../src/usecases/AuthUsecases.mjs';
import { createScope, handle } from '../../../src/core/index.mjs';
import JsonContext from '../../../src/core/contexts/JsonContext.mjs';
import PageResponse from '../../../src/core/responses/PageResponse.mjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        login: { label: 'Login', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const data = { req };
          const context = await JsonContext.build(data);
          const result = await handle(AuthUsecases, 'signIn', [], PageResponse, context);
          return result.props;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    }),
    CredentialsProvider({
      name: 'Ldap',
      id: 'ldap',
      credentials: {
        login: { label: 'Login', type: 'text' },
      },
      async authorize(credentials, req) {
        try {
          const data = { req };
          const context = await JsonContext.build(data);
          const result = await handle(AuthUsecases, 'signInLdap', [], PageResponse, context);
          return result.props;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      },
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      const scope = await createScope({ session: token });
      const authUsecases = new AuthUsecases(scope.cradle);

      session.user = await authUsecases.getActualAuthUserInfo(scope.cradle);
      session.accessToken = token.accessToken;

      return session;
    },
  }
});
