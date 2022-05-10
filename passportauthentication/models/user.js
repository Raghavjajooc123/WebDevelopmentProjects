const mongoose = require('mongoose');


var passSchema = new mongoose.Schema({
    user:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    pass:{
        type: String,
        required:true
    }
});

var passport = mongoose.model('passport', passSchema);

module.exports = passport;