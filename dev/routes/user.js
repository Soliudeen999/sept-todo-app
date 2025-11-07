const express = require('express')

const app = express.Router()
const UserModel = require('../models/user');
const isAuthenticated = require('../middleware/is_authenticated');

app.use(isAuthenticated);

app.get('/me', async(req, res) => {
    return res.json({
        user : req.user
    })
})

app.get('/users', async(req, res) => {
    const users = await UserModel.find({})
    return res.json({data : users})
})

module.exports = app