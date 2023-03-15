const express= require("express")
const { authUser, registerUser, addContact, listContacts, editContact, deleteContact } = require("../controllers/controllers")

const routes= express.Router()

routes.post('/login', authUser)
routes.post('/register', registerUser)
routes.get('/list-contacts/:id', listContacts)
routes.post('/add-contact', addContact)
routes.post('/edit-contact', editContact)
routes.post('/delete-contact', deleteContact)

module.exports= routes