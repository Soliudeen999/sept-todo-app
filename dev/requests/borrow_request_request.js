const { body } = require('express-validator');
const BookModel = require('./../models/book')

const StoreBorrowRequestValidator = [
    body('from_date').isDate(),
    body('book_id').notEmpty().custom(async (obj) => {
        if(!obj?.book_id)
            return false;

        const exist = await BookModel.findById(obj.book_id).exec();
        
        return !!exist;
    }),
    body('till_date').notEmpty().isDate(),
    
]

const UpdateBorrowRequestValidator = [
    body('from_date').optional().isDate().isAfter(Date.now()),
    body('till_date').notEmpty().isDate().isBefore(Date.now() + 1000 * 60 * 60 * 24 * 7),
]

module.exports = {
    StoreBorrowRequestValidator,
    UpdateBorrowRequestValidator
}