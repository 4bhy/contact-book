const mongoose = require("mongoose")

const contactsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    phone: {
        type: Number
    }, 
    email:{
        type:String
    }
})

const Contact = mongoose.model("Contact", contactsSchema);

module.exports = Contact;