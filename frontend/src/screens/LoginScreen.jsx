import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userLogin'
import { Link, useNavigate } from 'react-router-dom'

const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = () => {
        console.log(email, password);
        if (!email || !password) {
            console.log("all fields are mandatory");
        } else {
            dispatch(login(email, password))
        }
    }

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (userInfo) {

            navigate("/")
        }
    }, [userInfo])

    return (
        <div>
            <section class="grid h-screen place-content-center bg-slate-900 text-slate-300">
                <div class="mb-10 text-center text-indigo-400">
                    <h1 class="text-3xl font-bold tracking-widest">Login</h1>
                </div>
                <div class="flex flex-col items-center justify-center space-y-6">
                    <input onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                    <div>
                        <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
                        <p id="validation" class="text-center text-orange-500 italic text-sm"></p>
                    </div>
                    <button onClick={submitHandler} id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-indigo-700"><span id="showHide"></span> Sign In</button>
                   <Link to="/register"><span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Don't have an account?</span></Link> 
                </div>
            </section>
        </div>
    )
}

export default LoginScreen