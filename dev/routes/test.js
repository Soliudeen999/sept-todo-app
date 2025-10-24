const express = require('express')

const app = express.Router()

app.get('/two-functions-called-route', 
    (req, res, next) => {
        console.log('Passed Function 1')
        next()
    },
    function (req, res){
        console.log('Last function called')
        throw Error('Invalid Code')
        return res.json({message : ' ALl functions called successfully'})
    });

app.get('/', (req, res) => res.json({message : 'Welcome to my app'}))

app.get('/about', (request, response) => {
    return response.json({
        message : "This is about us",
        data : {
            name : "Sept Cohort Practice",
            date : Date.now(),
            students : ['Dan', 'Lumid']
        }
    })
})


app.post('/register', (req, response) => {
    return response.json({
        message : "All Login Form Data",
        data : req.body || {}
    })
})

module.exports = app