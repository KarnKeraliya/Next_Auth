import { connect } from "@/db/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(req: NextRequest){
  try {

    const reqBody = await req.json()
    const {email, password} = reqBody

    const user = await User.findOne({email})

    if(!user){
      return NextResponse.json({Error: "User not exists"}, {status: 400})
    }

    const verifiedUser = await bcryptjs.compare(password, user.password)

    if(!verifiedUser){
      return NextResponse.json({Error: "Invalid credentials"}, {status: 400})
    }

    const tokenData = {
      id: user._id,
    }

    const generatedToken = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = NextResponse.json({message: "User loggedIn successfully"}, {status: 200})

    response.cookies.set("Token", generatedToken, { httpOnly: true, secure: true})

    return response

  }catch (error: any) {
    return NextResponse.json({Error: `Login error: ${error.message}`}, {status: 400})
    
  }
}