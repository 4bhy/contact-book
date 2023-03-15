import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addContact, listContacts } from '../actions/userLogin'
import toast, { Toaster } from 'react-hot-toast';

const AddContactScreen = () => {

    const [fname, setFname]= useState("")
    const [lname, setLname]= useState("")
    const [phone, setPhone]= useState("")
    const [email, setEmail]= useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const submitHandler=async()=>{

        await dispatch(addContact(fname, lname, phone, email)).then((data)=>{
            navigate("/")
        }).catch((err)=>{
            toast.error("Failed to add Contact😓 Please try again")
        })
      
    }
    return (
        <div>
            <div><Toaster/></div>
            <div class="min-h-screen w-full flex items-center justify-center bg-gray-900">
                <div>
                    <h1 class="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">Add New Contact<span class="text-sm text-purple-700">+</span></h1>
                    <div class="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-gray-900 rounded-md border-t-4 border-purple-400">
                        <div class="grid">
                            <div class="bg-white flex flex-col-reverse justify-center rounded-md border border-gray-300 shadow-sm focus-within:shadow-inner">
                                <input onChange={(e)=>{setFname(e.target.value)}} type="text" name="first-name" id="first-name" class="peer block w-full border-0 p-4 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="First name" />
                                <label html="first-name" class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">First name</label>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                                <input  onChange={(e)=>{setLname(e.target.value)}}  type="text" name="last-name" id="last-name" class="peer block w-full border-0 p-4 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="Last name" />
                                <label html="last-name" class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Last name</label>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                                <input  onChange={(e)=>{setPhone(e.target.value)}}  type="text" class="peer block w-full border-0 p-4 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="Phone" />
                                <label html="Phone" class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Phone</label>
                            </div>
                        </div>
                        <div class="grid">
                            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                                <input onChange={(e)=>{setEmail(e.target.value)}} type="email"  class="peer block w-full border-0 p-4 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="E-mail" />
                                <label html="email" class="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">E-mail</label>
                            </div>
                        </div>
                        <button onClick={()=>{submitHandler()}} class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContactScreen