import { connect } from "@/db/dbConnection";
import { NextRequest, NextResponse} from 'next/server'
import User from "@/models/user.model";
import bcryptjs from 'bcryptjs'
import { sendMail } from "@/helper/mailer";

connect()

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json()
    const {username, email, password} = reqBody

    const user = await User.findOne({email})
    if(user){
      return NextResponse.json({error: "user already exist"}, {status: 401})
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const createdUser = new User({
      username,
      email, 
      password: hashedPassword
    })

    const savedUser = await createdUser.save()
    console.log(savedUser);

    await sendMail({email, emailType: "VERIFY", userId: savedUser._id})

    return NextResponse.json({
      message: "user created ssuccesfully",
      status: 200,
      savedUser
    })
    

  } catch (error: any) {
    return NextResponse.json({error: error.message,},{status: 500})
  }
}