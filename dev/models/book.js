const mongoose = require('mongoose');

const bookTable = mongoose.Schema({
    title : {type : String, required : true},
    code: {type : String, required : true, unique : true},
    description : {type : String, required : true},
    content : String,
    author : String,
    stocked_count : {type : Number, default : 1},
    remainder : {type : Number, default : 1},
    created_at : {type : Date, default : Date.now()}
})

module.exports = mongoose.model('book', bookTable);