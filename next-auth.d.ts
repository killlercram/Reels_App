//this code remains same for making session 
import { DefaultSession } from "next-auth";
declare module "next-auth"{
  interface Session{//define interface 
    //ask what is needed
    user:{
      id: string;
    } & DefaultSession["user"];

  }
}