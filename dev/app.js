const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');

const testRoutes = require('./routes/test')
const userRoutes = require('./routes/user');
const notFoundHandler = require('./middleware/not_found_handler');
const errorHandler = require('./middleware/error_handler');

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000


app.use(testRoutes)
app.use(userRoutes)

app.use(notFoundHandler)

app.use(errorHandler)

const dbName = process.env.DB_NAME
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
  .then(() => console.log('Db Connected!'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.listen(PORT, () => console.log(`App is up and running on port: ${PORT}`))