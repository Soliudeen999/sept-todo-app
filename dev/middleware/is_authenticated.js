const AppError = require("../errors/app_error");
const { throw_if } = require("../utils/helpers");
const jwt = require('jsonwebtoken')
const UserModel = require('./../models/user')

const isAuthenticated = async(req, res, next) => {
    const token = req.header('Authorization');

    throw_if(!token, new AppError("This route expects your access id", 401));

    let split = token.split(' ');

    throw_if(split.length < 2, new AppError("Invalid Access token", 401));
    
    const accessToken = split[1];

    try{
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)

        const userId = payload.uid;
        const userRole = payload.role;

        const user = await UserModel.findById(userId).exec();

        throw_if(!user, new Error('Invalid Credential becuase no user'));

        req.user = user
        next()
    }catch(err){
        return res.status(401).json({
            message : 'Invalid Credential'
        })
    }
}

module.exports = isAuthenticated