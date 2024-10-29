const mongoose = require('mongoose');

const UsarioSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },

    apellido:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports =  mongoose.models("Usuario", UsarioSchema);