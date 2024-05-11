import jwt from "jsonwebtoken"
import { NextRequest } from "next/server";

export const getDataFromToken = function(request:NextRequest){
  try {
    const token: any = request.cookies.get("Token")?.value
    console.log(token);
    
    const decodedToken =  jwt.verify(token, process.env.TOKEN_SECRET!)
    console.log(decodedToken);
    
    return decodedToken
  } catch (error:any) {
    throw new Error(error)
  }
}