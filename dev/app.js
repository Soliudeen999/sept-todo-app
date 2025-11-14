const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');

const testRoutes = require('./routes/test')
const userRoutes = require('./routes/user');
const notFoundHandler = require('./middleware/not_found_handler');
const errorHandler = require('./middleware/error_handler');
const authRoutes = require('./routes/authentication');
const booksRoutes = require('./routes/books');
const borrowRequestsRoutes = require('./routes/borrow_requests');

dotenv.config()

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Welcome to the API')
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.post('my-info', (req, res) => {
    res.json({ data: req.body })
})

app.use('/uploads', express.static('uploads'))

app.use(testRoutes)
app.use(authRoutes)
app.use(userRoutes)
app.use(booksRoutes)
app.use(borrowRequestsRoutes)

app.use(notFoundHandler)

app.use(errorHandler)

const dbName = process.env.DB_NAME
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
  .then(() => console.log('Db Connected!'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.listen(PORT, () => console.log(`App is up and running on port: ${PORT}`))




function addTwoNumbers(a, b) {
    return a + b;
}

() => {}