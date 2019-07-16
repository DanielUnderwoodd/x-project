const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var SchemaEmployee = new Schema({
user_mode:{
    type:Boolean,
    default: true
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


module.exports = Employee = mongoose.model('Employees',SchemaEmployee)


