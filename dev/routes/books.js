const express = require('express')

const app = express.Router()
const BookModel = require('../models/book');
const { StoreBookRequestValidator } = require('../requests/book_request');
const mustBeAdmin = require('../middleware/is_admin');


app.get('/books', async (req, res) => {
    let allBooks = await BookModel.find({}).exec()

    return res.json({
        message : "All books fetched successful",
        books : allBooks
    })
})

app.get('/books/:id', async(req, res) => {
    let allBooks = await BookModel.findById(req.params.id).exec()

    return res.json({
        message : "All books fetched successful",
        books : allBooks
    })
});

app.post('/books', mustBeAdmin, StoreBookRequestValidator, async (req, res) => {
    const errors = validationResult(req);
        
    if(!errors.isEmpty()) {
        return response.status(422).json({errors : errors.array().map((err) => { 
            return {path : err.path, msg : err.msg}; 
        })});
    }

    let code = `BK-${Date.now()}`;

    const data = {...req.body, code};

    const book = await new BookModel(data).save()

    return res.json({
        book
    })
})



module.exports = app