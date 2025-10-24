const express = require('express')

const app = express.Router()


app.get('/users', (req, res) => res.json({message : 'All users'}))

module.exports = app