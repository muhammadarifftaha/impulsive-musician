import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email Address",
      id: "email",
      credentials: {
        email: { label: "Email Address", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const data = credentials;
        await dbConnect();
        const user = User.findOne({ email: data.email })
          .then((user) => {
            if (!user) {
              return null;
            } else if (bcrypt.compareSync(data.password, user.password)) {
              return {
                uuid: user.uuid,
                name: user.name,
                email: user.email,
              };
            } else {
              return null;
            }
          })
          .catch((error) => {
            return null;
          });
        return user;
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24 * 7, //10 secs for testing
  },
  secret:
    process.env.JWT_SECRET ||
    "wt5Uv!dapuNeumr&r*5jrCRdLtCRpRijCzj^omv4GB5yPt7Jdh@mM8w",
  pages: {
    signIn: "/users",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...token.user };
      }
      return { session, token };
    },
  },
};

export default NextAuth(authOptions);
