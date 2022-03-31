const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    }, 
    phone:{
        type: String,
        required: true
    }, 
    address:{
        type: String,
        required: true
    }  
})

module.exports = mongoose.model("Contacts", ContactSchema);