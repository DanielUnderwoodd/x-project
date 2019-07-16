const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var SchemaJob = new Schema({
title:{
    type: String,
    required: true
},    
summary: {
    type: String,
    required: true
},
company: {
    type: String,
    required: true
},
location: {
    type: String,
    required: true
},
salary: {
    type: String
},
postDate: {
    type: Date,
    default: Date.now
}


})


module.exports = job = mongoose.model('jobs',SchemaJobs)


