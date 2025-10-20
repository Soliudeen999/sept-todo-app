const dotenv = require('dotenv')
const express = require('express');

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000

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

app.use((req, res) => res.status(404).json({message : 'Route not found'}))
app.listen(PORT, () => console.log(`App is up and running on port: ${PORT}`))