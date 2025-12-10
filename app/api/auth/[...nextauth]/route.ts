import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      // Always allow sign-in, will check user status in redirect callback
      return true;
    },
    async jwt({ token, account, profile, trigger }) {
      if (account && profile) {
        token.email = profile.email;
        token.name = profile.name;

        // Check if user exists in DB and store in token
        if (profile.email) {
          const email = profile.email.trim().toLowerCase();

          const { data: candidate } = await supabaseAdmin
            .from("candidates")
            .select("id")
            .eq("email", email)
            .maybeSingle();

          const { data: agency } = await supabaseAdmin
            .from("agencies")
            .select("id")
            .eq("email", email)
            .maybeSingle();

          token.isVerified = !!(candidate || agency);
          token.userType = candidate ? "candidate" : agency ? "agency" : null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to homepage after OAuth
      // PostAuthRedirect component will handle routing to /auth/check
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
