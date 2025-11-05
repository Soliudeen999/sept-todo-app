const { body } = require('express-validator');

const StoreBookRequestValidator = [
    body('title').notEmpty().isLength({min : 5, max: 250}),
    body('author').notEmpty().isLength({min : 5, max: 250}),
    body('content').notEmpty().isLength({min : 5, max: 250}),
    body('description').optional().isLength({min : 5, max: 250}),
]

module.exports = {
    StoreBookRequestValidator
}