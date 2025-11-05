class ValidationError extends Error {
    constructor(errors){
        super('Validation Error Occured')
        this.name = 'ValidationError';
        this.errors = errors;
    }
}

module.exports = ValidationError