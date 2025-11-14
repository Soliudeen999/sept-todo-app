const express = require('express')

const app = express.Router()
const BookModel = require('../models/book');
const BorrowRequestModel = require('../models/borrow_request');
const { StoreBookRequestValidator, UpdateBookRequestValidator } = require('../requests/book_request');
const mustBeAdmin = require('../middleware/is_admin');
const { validationResult } = require('express-validator');
const { throw_if } = require('../utils/helpers');
const AppError = require('../errors/app_error');
const ValidationError = require('../errors/validation_error');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename : (req, file, callback) => {
        const fileName = Date.now() + file.originalname.replaceAll(' ', '-')
        callback(null, fileName)
    }
})

const upload = multer({storage});

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

app.post('/books', upload.single('cover_image'), mustBeAdmin, StoreBookRequestValidator, async (req, res) => {
    const errors = validationResult(req);
        
    if(!errors.isEmpty()) {
        return res.status(422).json({errors : errors.array().map((err) => { 
            return {path : err.path, msg : err.msg}; 
        })});
    }

    const file = req.file

    if(file.size > 1 *1024 *1024){
        fs.unlinkSync(file.path);
        throw new ValidationError([{path : 'cover_image', msg : 'File too large' }]);
    }

    if(!file.mimetype.startsWith('image')){
        fs.unlinkSync(file.path);
        throw new ValidationError([{path : 'cover_image', msg : 'Only Image file is expected' }]);
    }

    const {title, author } = req.body;

    const isExist = await BookModel.findOne({title, author}).exec();

    throw_if(isExist, new ValidationError([{path : 'title', msg : 'Book already exists'}]));

    let code = `BK-${Date.now()}`;

    const cover_image_path = req.file.path

    const data = {...req.body, code, cover_image_path};

    const book = await new BookModel(data).save()

    return res.json({
        book
    })
})


app.put('/books/:book_id', UpdateBookRequestValidator, mustBeAdmin, async(req, res) => {
    let book = await BookModel.findById(req.params?.book_id).exec();

    throw_if(!book, new AppError('Resource not found.'));

    const{ title, description, content, author} = req.body


    const isExist = await BookModel.findOne({title, author}).where('_id').ne(req.params?.book_id).exec();

    throw_if(isExist, new ValidationError([{path : 'title', msg : 'Book already exists'}]));

    book.title = title;
    book.author = author;
    book.description = description;
    book.content = content;
    
    await book.save()

    return res.json({
        message : "Update complete",
        data : book
    })
})


app.delete('/books/:book_id', mustBeAdmin, async (req, res) => {
    let book = await BookModel.findById(req.params?.book_id).exec();
    throw_if(!book, new AppError('Resource not found.'));
    await BookModel.deleteOne({_id : req.params?.book_id}).exec();
    return res.status(204).json({});
})
module.exports = app