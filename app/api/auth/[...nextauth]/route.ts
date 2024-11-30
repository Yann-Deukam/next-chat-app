import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/authOptions"; // Path to your authOptions file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
