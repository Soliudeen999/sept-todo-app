const express = require('express')

const app = express.Router()
const BookModel = require('../models/book');
const BorrowRequestModel = require('../models/borrow_request');
const { StoreBookRequestValidator, UpdateBookRequestValidator } = require('../requests/book_request');
const mustBeAdmin = require('../middleware/is_admin');
const { validationResult, body, param } = require('express-validator');
const { throw_if } = require('../utils/helpers');
const AppError = require('../errors/app_error');
const { StoreBorrowRequestValidator } = require('../requests/borrow_request_request');
const ValidationError = require('../errors/validation_error');
const { sendMail } = require('../utils/mailer');


app.get('/borrow-requests', async (req, res) => {
    const borrow_requests = await BorrowRequestModel.find({user : req.user}).populate('book').exec();
    return res.json({
        message : "Requests fetched successfully",
        data : borrow_requests
    })
})

app.put('/borrow-requests/:id/:status', mustBeAdmin, [
    param('status').isIn(['approved', 'declined', 'pending'])
], async (req, res) => {

    const errors = validationResult(req)

    throw_if(!errors.isEmpty(), new ValidationError(errors.array()));

    const borrowReqId = req.params.id;
    const status = req.params.status;
    const borrow_request = await BorrowRequestModel.findById(borrowReqId).populate(['book', 'user']).exec();

    throw_if(!borrow_request, new AppError('Resource not found'));

    const book = borrow_request.book

    if(status === 'approved' && borrow_request.status !== 'approved'){
        book.remainder = Number(book.remainder ?? 1) - 1;
        await book.save();
    }

    let message = ''

    switch (status) {
        case 'approved':
            message = 'Your Book request has been approved'
            break;
            
        case 'declined':
            message = 'Your Book request has been declined'
            break;
    
        default:
            break;
    }

    if(message)
        sendMail(borrow_request.user.email, message, 'Book Request Approval')
        .then(() => {console.log('Mail is sent now')})
        .catch((error) => console.log(error));

    borrow_request.status = status;

    await borrow_request.save();

    return res.json({
        message : "Requests fetched successfully",
        data : borrow_request
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