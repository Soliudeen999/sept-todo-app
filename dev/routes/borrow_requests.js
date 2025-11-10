const express = require('express')

const app = express.Router()
const BookModel = require('../models/book');
const BorrowRequestModel = require('../models/borrow_request');
const { StoreBookRequestValidator, UpdateBookRequestValidator } = require('../requests/book_request');
const mustBeAdmin = require('../middleware/is_admin');
const { validationResult } = require('express-validator');
const { throw_if } = require('../utils/helpers');
const AppError = require('../errors/app_error');
const { StoreBorrowRequestValidator } = require('../requests/borrow_request_request');
const ValidationError = require('../errors/validation_error');


app.get('/borrow-requests', async (req, res) => {
    const borrow_requests = await BorrowRequestModel.find({user : req.user}).populate('book').exec();
    return res.json({
        message : "Requests fetched successfully",
        data : borrow_requests
    })
})

app.post('/borrow-requests', StoreBorrowRequestValidator, async (req, res) => {
    const errors = validationResult(req);

    throw_if(!errors.isEmpty(), new ValidationError(errors.array()));
    const {book_id, from_date, till_date} = req.body
    const book = await BookModel.findById(book_id).exec()

    throw_if(book.remainder < 1, new AppError('THis book is not available anymore. Check back later'))

    const bookRequest = new BorrowRequestModel({
        user : req.user,
        book,
        from_date : from_date || Date.now(),
        till_date : till_date
    })


    await bookRequest.save();

    await BookModel.updateOne({_id : book_id}, {
        remainder : book.remainder - 1
    }).exec()


    return res.json({
        message : "Request submited successfully",
        data : bookRequest
    })
})
module.exports = app