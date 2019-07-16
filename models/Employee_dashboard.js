const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var EmployeeDashSchema = new Schema({
user:{
    type:Schema.Types.ObjectId,
    ref:'Employees'
},    
handler: {
    type: String,
    required: true,
    max: 50
},
company: {
    type: String,
},
website: {
    type: String,
},
location: {
    type: String
},
status: {
    type: String,
    required: true
},
status_job: {
    type: Boolean,
    default: false
},
skills: {
    type:[String],
    required: true
},
bio: {
    type: String
},
repo_git:{
    type: String
},
myjobs: {
    type: [String],
},
experience:[
    {
        title: {
         type:String,
         required: true
        },
        company:{
            type: String,
            required: true
        },
        location:{
            type: String,
        },
        from:{
            type: Date,
            required: true
        },
        to:{
            type: String,
        },
        current:{
            type: Boolean,
            default: false
        },
        description:{
            type: String,
        },
    }
],
education:[
    {
        school: {
         type:String,
         required: true
        },
        degree:{
            type: String,
            required: true
        },
        field:{
            type: String,
            required: true
        },
        from:{
            type: Date,
            required: true
        },
        to:{
            type: String,
        },
        current:{
            type: Boolean,
            default: false
        },
        description:{
            type: String,
        },
    }
],
social: {
    instgram : {
        type: String
    },
    twitter:{
        type: String
    },
    linkedin:{
        type: String
    }
},
date:{
    type: Date,
    default: Date.now
}


})


module.exports = EmployeeDash = mongoose.model('EmployeeDash',EmployeeDashSchema)


