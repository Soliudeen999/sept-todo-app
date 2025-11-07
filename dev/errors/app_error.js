class AppError extends Error {
    constructor(message, http_code = 400){
        super(message)
        this.name = 'appError';
        this.http_code = http_code;
    }
}

module.exports = AppError