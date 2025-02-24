//this code remains same on other code too
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler= NextAuth(authOptions);
export{handler as GET, handler as POST}