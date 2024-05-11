import { connect } from "@/db/dbConnection";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest){
  try {

    const response = NextResponse.json({
      message: "User logout successfully"
    }, {status: 200})

    response.cookies.set('Token', "", {
      httpOnly: true,
      secure: true,
      expires: Date.now()
    })

    return response

  }catch (error: any) {
    return NextResponse.json({Error: `logout controller error: ${error.message}`}, {status: 400})
    
  }
}