const express = require('express')

const app = express.Router()
const UserModel = require('../models/user');


app.get('/users', async(req, res) => {
    const users = await UserModel.find({})
    return res.json({data : users})
})

module.exports = app