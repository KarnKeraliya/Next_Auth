'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    isVerified: false
  });
  const router = useRouter()
  const logoutUser = async()=>{
    try {
      await axios.post("/api/users/logout")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message);
      
      
    }
  }
  const aboutUser = async() =>{
    try {
      const response = await axios.post("/api/users/aboutme")
      console.log(response.data);
      setUser(response.data.user)
      
    } catch (error: any) {
      console.log(error.response.data);
      router.push("/login")
    }
  }
  useEffect(() => {
    aboutUser()
    
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='text-4xl bg-slate-600 text-black'>Profile</h1>
    <h1>Username: {user.username}</h1>
    <br />
    <h1>Email: {user.email}</h1>
    <br />
    <h1>Is Verified:{user.isVerified ? "Verified": "Not verified"}</h1>
    <button 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
    type="button"
    onClick={logoutUser}
    >Logout</button>
    </div>
  )
}

 