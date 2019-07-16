const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var SchemaUser = new Schema({
user_mode:{
    type:Boolean,
    default: false
},    
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
img_url: {
    type: String
},
date: {
    type: Date,
    default: Date.now
}


})


module.exports = employer = mongoose.model('employers',SchemaUser)


