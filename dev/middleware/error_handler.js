const ValidationError = require("../errors/validation_error");

const errorHandler = (err, req, res, next) => {

  if (err instanceof ValidationError){
    let errors = err.errors

    if(!Array.isArray(errors)){
      errors = [errors];
    }

    return res.status(422).json({
      message : err.message,
      errors : errors.map((error) => {
        return {field : error.path, msg : error.msg}
      })
    })
  }


  if(process.env.APP_ENV !== 'development'){
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }

  throw err
}

module.exports = errorHandler