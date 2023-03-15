import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { login, register } from '../actions/userLogin'
import toast, { Toaster } from 'react-hot-toast';

const RegisterScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    const submitHandler = () => {
        if (!email || !name || !password || !cpassword) {
            toast.error("All fields are mandatory!")
        } else if (password != cpassword) {
            toast.error("Passwords doesnt match!.")
        } else {
            dispatch(register(name, email, password))
        }
    }

    const userData = useSelector(state => state.userLogin)
    const { userInfo } = userData

    useEffect(() => {
        if (userInfo?.token) {
            navigate("/")
        }
    }, [userInfo])

    return (
        <div>
            <div><Toaster/></div>
            <section class="grid h-screen place-content-center bg-slate-900 text-slate-300">
                <div class="mb-10 text-center text-indigo-400">
                    <h1 class="text-3xl font-bold tracking-widest">Register</h1>

                </div>
                <div class="flex flex-col items-center justify-center space-y-6">
                    <input onChange={(e) => { setName(e.target.value) }} placeholder="Name" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                    <input onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                    <div>
                        <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <p id="validation" class="text-center text-orange-500 italic text-sm"></p>
                    </div>
                    <div>
                        <input onChange={(e) => { setCpassword(e.target.value) }} type="password" placeholder="Confirm Password" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <p id="validation" class="text-center text-orange-500 italic text-sm"></p>
                    </div>
                    <button onClick={() => { submitHandler() }} id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-700"><span id="showHide"></span> Sign Up</button>
                    <Link to="/login"><span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Already have an account?</span></Link>
                </div>
            </section>
        </div>
    )
}

export default RegisterScreen
