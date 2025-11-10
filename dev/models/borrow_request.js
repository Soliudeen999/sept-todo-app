const mongoose = require('mongoose');

const borrowTable = mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'user'},
    book : {type : mongoose.Schema.Types.ObjectId, ref : 'book'},
    status : {type : String, default : 'pending'},
    created_at : {type : Date, default : Date.now()},
    from_date : {type : Date, default : Date.now()},
    till_date : {type : Date, default : Date.now()} 
})

module.exports = mongoose.model('borrow_request', borrowTable);