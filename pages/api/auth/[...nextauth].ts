import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
import { JWT } from "next-auth/jwt";
import { Session, Account, User } from "next-auth";

const refreshAccessToken = async (token: JWT) => {
  try {
    typeof token.accessToken === "string" &&
      spotifyApi.setAccessToken(token.accessToken);
    typeof token.refreshToken === "string" &&
      spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hr as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000, // handling expiry time in milliseconds (* 1000)
        };
      }

      // return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("existing access token is valid");
        return token;
      }

      //access token has expired, so we need to refresh it
      console.log("access token has expired, refreshing..");
      return await refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.username = token.username;

      return session;
    },
  },
});
