const express = require('express');
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser');
const Passport = require('passport');




const port = process.env.PORT || 5000;

//setup bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


//import route
const employee = require('./routes/api/Employee');
const employer = require('./routes/api/Employer');
const employeePost = require('./routes/api/Post_employee');
const employerPost = require('./routes/api/Post_employer');
//DataBase configs

const db = require('./config/config').mongoURL;

//coonnect to database

mongoose.connect(db)
.then(()=>
    app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    })
)
.catch((err)=> console.log(err))


// Use Routes

app.use('/api/employee',employee)
app.use('/api/employee/post',employeePost)
app.use('/api/employer',employer)
app.use('/api/employee/post',employerPost)

//passport
app.use(Passport.initialize());




//passprt configure
require('./config/passport')(Passport)
require('./config/passport2')(Passport)


