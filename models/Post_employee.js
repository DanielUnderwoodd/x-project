const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var SchemaPost = new Schema({
user:{
    type: Schema.Types.ObjectId,
    ref: 'Employees'
},    
text: {
    type: String,
    required: true
},
name: {
    type: String,
},
avatar: {
    type: String,
},
likes: [
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'Employees'
        }
    }
],
comments: [
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'Employees'
        },
        text: {
            type: String,
            require: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        data: {
            type: Date,
            default: Date.now
        }
    }
],
data: {
    type: Date,
    default: Date.now
}
})


module.exports = post = mongoose.model('postsemployee',SchemaPost)


