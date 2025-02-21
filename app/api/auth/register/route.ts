/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

//handle the post respone request with data type NextRequest
export async function POST(request: NextRequest){

  //get the email and password
  try {
   const{email, password} = await request.json();//getting email and password
   if(!email || !password){//rechecking password and email
    return NextResponse.json(
      {error: "Email and Password required"},
      {status: 400}
    );
   }

   //checking from database if user is already registered
   await connectToDatabase();
   //if User Found
   const existingUser=await User.findOne({email});
   if(existingUser){
    return NextResponse.json(
      {error: "Email already exists!!"},
      {status: 400}
    );
   }
   //if user not Found then create
   await User.create({
    email,
    password
   })

   return NextResponse.json(
    {message: "User Registered Successfully!"},
    {status: 201}
  );

    
  } catch (error) {
    return NextResponse.json(
      {error: "Failed to register"},
      {status: 500}
    )
  }
}