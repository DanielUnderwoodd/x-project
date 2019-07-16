const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var EmployerDashSchema = new Schema({
user:{
    type:Schema.Types.ObjectId,
    ref:'employers'
},    
handler: {
    type: String,
    required: true,
    max: 50
},
phone: {
    type: String,
},
location: {
    type: String
},
bio: {
    type: String
},
posted_jobs: {
    type: [String],
},
date:{
    type: Date,
    default: Date.now
}
})


module.exports = EmployerDash = mongoose.model('EmployerDash',EmployerDashSchema)


