const express = require('express')

const app = express.Router()
const UserModel = require('../models/user');
const { LoginRequestValidator } = require('../requests/auth_request');
const { validationResult } = require('express-validator');

app.post('/register', LoginRequestValidator, async (req, response) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return response.status(422).json({errors : errors.array().map((err) => { 
            return {path : err.path, msg : err.msg}; 
        })});
    }

    const {fullname, email, password, dob} = req.body;

    const existingUser = await UserModel.findOne({email : email}).exec()

    if(existingUser)
        return response.status(400).json({message : "Email already exists"})

    const newUser = new UserModel({
        fullname,
        email,
        password,
        dob
    });

    await newUser.save();

    return response.json({
        message : "All Login Form Data",
        data : newUser
    })
})

module.exports = app