'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter()

  const loginUser = async () =>{
    try {
      const response = await axios.post("/api/users/login", user)
      console.log(response.data);
      router.push("/profile")
      setError("")
      
    } catch (error: any) {
      console.log(error.response.data);
      setError(error.response.data.error)
    }
  }

  useEffect(()=>{
    setError("")
    if(user.password.length>0 && user.email.length>0){
      setButtonDisabled(false)
      
    }else{
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>Login Page </h1>
    <p className='p-4'><span className='text-red-600'>{error}</span></p>
    <hr />
    <label htmlFor="email">email</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        />
    <label htmlFor="password">password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        />
        <button
        onClick={loginUser}
        disabled={buttonDisabled}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
        <Link href="/signup">Visit Sign up page</Link>
    </div>
  )
}
