const { request } = require('express');
const { body } = require('express-validator');

const LoginRequestValidator = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname').notEmpty().withMessage('Fullname is required'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 characters long'),
    body('dob').optional().isDate().withMessage('Date of Birth must be a valid date')
]

module.exports = {
    LoginRequestValidator
}