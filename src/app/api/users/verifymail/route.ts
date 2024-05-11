import { connect } from "@/db/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest){
  try {

    const reqBody = await req.json()
    const {token} = reqBody

    console.log(token);
    
    const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

    if(!user){
      return NextResponse.json({Error: "Invalid Token(Not found in database)", status: 400})
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()
    console.log("user verified succesfully");
    
    return NextResponse.json({message: "user verified successfully, success: true"},{status: 200})
    
  } catch (error: any) {
    return NextResponse.json({Error: `verify mail error: ${error.message}`}, {status: 400})
    
  }
}