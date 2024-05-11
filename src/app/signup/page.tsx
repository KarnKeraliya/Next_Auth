'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import Link from 'next/link';


export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [state, setState] = useState("Sign Up");
  const [eroor, setEroor] = useState("");

  const signUp = async() => {
    try {
      setState("Proccessing ☢️");
      setButtonDisabled(true) 
      const response = await axios.post('/api/users/signup', user)
      console.log(response);
      toast.error(response.data)
      toast.success("User SignUp successfully!!")
      router.push("/login")
    } catch (error: any) {
      console.log("Sign up Error: ", error.message);
      toast.error(error.message)
      setState("Sign Up")
      setButtonDisabled(false)
      if(error.message === "Request failed with status code 401")
        setEroor("user already exsit")
    }
  }

  useEffect(() => {
    if(user.username.length>0 && user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{state} </h1>
    <p className='p-4'><span className='text-red-600'>{eroor}</span></p>
    <hr />
    <label htmlFor="username">username</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="username"
        />
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
        onClick={signUp}
        disabled={buttonDisabled}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
        <Link href="/login">Visit login page</Link>
    </div>
  )
}
