const User = require('../models/userModel')
const Contact = require('../models/contactsModel')

const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

module.exports = {
    registerUser: asyncHandler(async (req, res) => {
        console.log("testing");
        try {
            const { name, email, password } = req.body;
            const userExists = await User.findOne({ email: email });

            if (userExists) {
                throw new Error("User Already exists");
            }

            const user = await User.create({
                name,
                email,
                password
            });

            if (user) {
                res.status(201).json({
                    user,
                    token: generateToken(user._id),
                });
            } else {
                res.status(400);
                throw new Error("Error Occured!");
            }
        } catch (error) {
            console.log(error);
        }

    }),

    authUser: asyncHandler((async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            const token = generateToken(user._id);

            if (user && (await user.matchPassword(password))) {
                user.token = generateToken(user._id);
                console.log(user);
                res.json({
                    user
                });
            } else {

                throw new Error("Invalid Email or Password");
            }
        } catch (error) {
            console.log(error);
        }

    })),
    listContacts: asyncHandler(async (req, res) => {
        try {

            const contacts = await Contact.find({ userId: req.params.id })
            if (contacts) {
                res.status(201).json({
                    contacts
                })
            } else {
                throw new Error("You have'nt added any contacts yet!")
            }
        } catch (error) {
            res.status(401).json({ error })
        }
    }),

    addContact: asyncHandler(async (req, res) => {
        try {
            console.log(req.body);
            const contact = Contact.create({
                fname: req.body.fname, lname: req.body.lname, phone: req.body.phone, email: req.body.email,
                userId: req.body.id
            })

            if (contact) {
                res.status(201).json({ message: "Contact added Successfully!" })
            } else {
                throw new Error("Failed to add contact")
            }
        } catch (error) {
            res.status(404).json({ error })
        }
    }),
    editContact: asyncHandler(async (req, res) => {
        try {
            console.log("At edit");
            console.log(req.body, "body");

            const contactData = await Contact.findById({ _id: req.body.id })
            console.log(contactData);
            if (contactData) {
                contactData.fname = req.body.fname
                contactData.lname = req.body.lname
                contactData.phone = req.body.phone
                const savedData = await contactData.save()

                if (savedData) {
                    res.status(201).json({ message: "Updated Contact Succesfully" })
                } else {
                    throw new Error("Failed to update contact!")
                }

            } else {
                throw new Error("Failed to update contact!")
            }

        } catch (error) {
            res.status(404).json({ error })
        }
    }),

    deleteContact: asyncHandler(async (req, res) => {
        try {
            const contacts = await Contact.findByIdAndDelete({ _id: req.body.did })
            if (contacts) {
                res.status(201).json({
                    message: "Deleted Successfully"
                })
            } else {
                throw new Error("Deleting Contact Failed!")
            }
        } catch (error) {
            res.status(401).json({ error })
        }
    }),

}