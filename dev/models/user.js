const mongoose = require('mongoose');

const userTable = mongoose.Schema({
    fullname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    dob : {type : Date, required : false},
    is_subscribed : {type : Boolean, default : false}
})

module.exports = mongoose.model('user', userTable);