const express = require('express')

const app = express.Router()
const UserModel = require('../models/user');
const { LoginRequestValidator, RegisterRequestValidator } = require('../requests/auth_request');
const { validationResult } = require('express-validator');
const ValidationError = require('../errors/validation_error');
const { throw_if } = require('../utils/helpers');

app.post('/register', RegisterRequestValidator, async (req, response) => {

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

app.post('/login', LoginRequestValidator, async (req, res) => {
    const errors = validationResult(req);

    throw_if(!errors.isEmpty(), new ValidationError(errors.array()));

    const {email, password} = req.body

    const user = await UserModel.findOne({email}).exec();

    throw_if(!user, new ValidationError({path : email, msg : 'Invalid Credential'}));

    throw_if(user.password !== password, new ValidationError({path : email, msg : 'Invalid Credential'}));

    return res.json({
        message : 'Login Successfull',
        user
    })
})

module.exports = app