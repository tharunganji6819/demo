import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23liHJgMudrQZNnlmG",
      clientSecret: "14cdf0eb137d061d53b256bac9d7374b24867e20",
    }),
  ],
};

export default NextAuth(authOptions);
