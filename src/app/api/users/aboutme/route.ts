import { connect } from "@/db/dbConnection";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest){
  try {
    const data:any = getDataFromToken(req)
    console.log("data",data);
    
    const user = await User.findById(data.id).select("-password")

    if(!user){
      return NextResponse.json({
        Error: "Token is not valid"
      }, {status: 400})
    }

    return NextResponse.json({
      Message: "User exists",
      success: true,
      user
      
    })
  } catch (error: any) {
    return NextResponse.json({Error: `about me controller error: ${error.message}`}, {status: 400})
  }
}
