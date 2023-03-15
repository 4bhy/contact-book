import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteContact, editContact, listContacts } from '../actions/userLogin'
import toast, { Toaster } from 'react-hot-toast';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { userLogout } from '../features/userLoginSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const LandingScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listContact = useSelector((state) => state.listContacts)


    const { contactList } = listContact
    console.log(contactList);

    useEffect(() => {

        dispatch(listContacts())

    }, [])

    const [currentContact, setCurrentContact] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        id: ""
    })

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitHandler = async () => {
        console.log(currentContact.fname, currentContact.lname, currentContact.phone, currentContact.id);
        await dispatch(editContact(currentContact.fname, currentContact.lname, currentContact.phone, currentContact.id))
        await dispatch(listContacts())
        setOpen(false)

    }

    const [deleteId, setDeleteId] = useState("")

    const deleteHandler = () => {
        handleCloses()
        dispatch(deleteContact(deleteId)).then((data) => {
            dispatch(listContacts())
            toast.success('Contact Deleted Succesfully')
        }).catch((err) => {
            toast.error('Failed to delete contact!')
        })
    }

    const [opens, setOpens] = React.useState(false);

    const handleClickOpens = () => {
        setOpens(true);
    };

    const handleCloses = () => {
        setOpens(false);
    };


    return (
        <div>
            <div><Toaster /></div>
            <Navbar />
            <div class="bg-gray-900 w-full min-h-screen flex flex-col items-center p-4">
                {contactList?.contacts?.length !== 0 ? (
                    contactList?.contacts?.map((data, index) => (
                        <div class="bg-gray-800 text-white w-full m-4 max-w-md flex flex-col rounded-xl shadow-lg p-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <div class="rounded-full w-4 h-4 border border-purple-500"></div>
                                    <div class="text-md font-bold">{data.fname} {data.lname}</div>
                                </div>
                                <div class="flex items-center space-x-4">

                                    <div onClick={() => {
                                        setCurrentContact({
                                            fname: data.fname,
                                            lname: data.lname,
                                            email: data.email,
                                            phone: data.phone,
                                            id: data._id
                                        })
                                        handleClickOpen()
                                    }} class="text-gray-500 hover:text-gray-300 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <div onClick={() => {
                                        setDeleteId(data._id)
                                        handleClickOpens()
                                    }} class="text-gray-500 hover:text-gray-300 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M14.293 5.293a1 1 0 0 0-1.414 0L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0 0-1.414z" clip-rule="evenodd" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 text-gray-500 font-bold text-sm">
                                {data.phone}
                            </div>

                        </div>

                    ))
                ) : (
                    <div class="bg-gray-800 text-white w-full m-4 max-w-md flex flex-col rounded-xl shadow-lg p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4">
                                <div class="rounded-full w-4 h-4 border border-purple-500"></div>
                                <div class="text-md font-bold">    You haven't added any contact yet 😓</div>
                            </div>

                        </div>
                        <Link to="/add-contact"><div class="mt-4 text-gray-500 font-bold text-sm">
                            Click Here to Add!
                        </div></Link>

                    </div>
                )

                }

            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogContent>
                    <body class="flex flex-col items-center justify-center text-gray-700">
                        <div class="flex flex-col bg-white rounded mt-12" action="">
                            <label class="font-semibold text-xs">First Name</label>
                            <input onChange={(e) => {
                                setCurrentContact({
                                    ...currentContact,
                                    fname: e.target.value
                                })
                            }} value={currentContact.fname} class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" />
                            <label class="font-semibold text-xs mt-3">Last Name</label>
                            <input onChange={(e) => {
                                setCurrentContact({
                                    ...currentContact,
                                    lname: e.target.value
                                })
                            }}
                                value={currentContact.lname} class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" />
                            <label class="font-semibold text-xs mt-3">Phone</label>
                            <input
                                onChange={(e) => {

                                    setCurrentContact({
                                        ...currentContact,
                                        phone: e.target.value
                                    })
                                }}
                                value={currentContact.phone} class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" />
                            <button onClick={() => { submitHandler() }} class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">SAVE</button>

                        </div>
                    </body>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={opens}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloses}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"Confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this contact?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloses}>Disagree</Button>
                    <Button onClick={() => { deleteHandler() }}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LandingScreen
