'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage  ()  {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  //const router = useRouter()
  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifymail", {token})
      setVerified(true)
      setError(false)
    } catch (error:any) {
      setError(true)
      console.log(error.response.data);
    }
  }

  useEffect(() => {
       const urlToken = window.location.search.split("=")[1]
      //const {query} = router
      //const urlToken:any = query.token
      setToken(urlToken || "")
      setError(false)
  }, []);

  useEffect(() => {
    if(token.length>0){
      verifyEmail()
      setError(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className='w-screen h-screen flex flex-col p-4 items-center justify-center text-center'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='text-black bg-slate-600 p-4'>{token? `${token}`: "No token found"}</h2>
      {verified && 
        <div className='text-2xl'>Verified</div>
      }
      {error && <div className='text-2xl'>Error</div>}
      <br />
      <Link href="/login">Login</Link>
    </div>
  )
}


