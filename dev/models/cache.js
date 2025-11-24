const mongoose = require('mongoose');

const cacheTable = mongoose.Schema({
    key: {type : String, required : true, unique : true},
    value: {type : mongoose.Schema.Types.Mixed, required : true},
    expires_at: {type : Date, required : false}
})

module.exports = mongoose.model('cache', cacheTable);