const express = require('express');
const router  = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/config');
const Passport = require('passport');
const indeed = require('indeed-scraper')



// use validator for register
const validateRegister = require('../../validators/register')
// use validator for login
const validateLogin = require('../../validators/login')

// use validator for login
const validateCurrentEmployer = require('../../validators/currentEmployer');
// bring employer_dashboard model

var EmployerDash = require('../../models/Employer_dashboard');

//bring employer model

var Employers = require('../../models/Employers');

//route     Get api/login/test
//explain   test the route
//access    role public
router.get('/test',(req,res)=>{
    res.json({msg: "test works"})
})


//route     Get api/Employer/register
//explain   register employers
//access    role public
router.post('/register',(req,res)=>{

    const {error, isValid} = validateRegister(req.body)
      console.log(isValid)
    if (!isValid){
        res.status(400).json(error)
    }else{
         const email = req.body.email
        Employers.findOne({email})
        .then((user)=>{
            if (user){
                
                 error.email = "We got one email with this address in employer section"
                 console.log(error)
                 res.status(400).json(error)
            } else {
                const img_url = gravatar.url(req.body.email,{
                    s: '200',
                    r: 'pg', 
                    d: 'mm'})
                const newUser = new Employers({
                    email,
                    name : req.body.name,
                    password: req.body.password,
                    img_url
                })
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash
                        newUser
                        .save()
                        .then((user)=> res.json(user))
                        .catch(err => console.log(err))
                    })
                })
            }
        })
        .catch(err => console.log(err))

    }
       

    
})

//route     Get api/Employer/login
//explain   login Employees / genarate JWT
//access    role public
router.post('/login',(req,res)=>{

    const {error, isValid} = validateLogin(req.body)
    
    if (!isValid){
        res.status(400).json(error)
    }else{
        const email = req.body.email
        const password = req.body.password
        Employers.findOne({email})
        .then(user=>{
            if(!user){
                error.email = "user not found";
                return res.status(404).json(error)
            }
            //check for if the passwords match
            bcrypt.compare(password,user.password)
            .then(isTrue => {
                if(isTrue){
                   // after matching user 
    
                   const payload = {id: user.id,name: user.name,img: user.img_url,user_mode: user.user_mode}
                   //sign in
                   jwt.sign(payload,key.secretOrkey,{expiresIn: 3600},(err,token)=>{
                     res.json({
                         success: true,
                         token: 'Bearer ' + token
                     })
                   })
                }else {
                    error.password = "password is incorrect"
                    return res.status(400).json(error)
                }
            })
            
        })
    }
   
})




//route     Get api/Employer/current
//explain   current user
//access    role private
router.get('/current',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
    const error = {}
    EmployerDash.findOne({user: req.user.id})
    .populate('user',['name','img_url'])
        .then(current =>{
            if(!current){
                error.nouser = "there is no profile"
                res.status(404).json(error)
            }else{
                res.json(current);
            }
        })
        .catch(err => res.status(404).json(err))
 
})


//route     POST api/Employers/current
//explain   current Employer edit or create
//access    role private
router.post('/current',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{

    const {error , isValid} = validateCurrentEmployer(req.body)

    if(!isValid){
        res.status(400).json(error)
    }else{
           //bring model employeeDash objects
           const EmployerDashObjects = {};
           EmployerDashObjects.user = req.user.id;
           if(req.body.handler) {
               EmployerDashObjects.handler = req.body.handler
           }
           if(req.body.phone) {
               EmployerDashObjects.phone = req.body.phone
           }
           if(req.body.location) {
               EmployerDashObjects.location = req.body.location
           }
           if(req.body.bio) {
               EmployerDashObjects.bio = req.body.bio
           }



           EmployerDash.findOne({user: req.user.id})
           .then(user =>{
               if(user){
                   // update curent employer dashboard info
                   EmployerDash.findOneAndUpdate(
                       {user: req.user.id},
                       {$set : EmployerDashObjects},
                       {new: true})
                       .then(employer => res.json(employer))
               }else{

                   // create

                   EmployerDash.findOne({handler: EmployerDashObjects.handler})
                   .then(employer => {
                       if(employer){
                           error.handler = "handler its  exist"
                           res.status(400).json(error)
                       }else{
                           new EmployerDash(EmployerDashObjects).save()
                               .then(data => res.json(data))
                       }
                   })
                           }
                       })
    }
  

})

//route     GET api/Employers/handler
//explain   access to the employer details
//access    role public

router.get('/handler/:handler',(req,res)=>{
    const error = {}
    EmployerDash.findOne({ handler: req.params.handler})
    .populate('user',['name','img_url'])
    .then(employer => {
        if(!employer){
            error.noemployer = ' there is no employer with this name'
            res.status(404).json(error);
        }else {
            res.json(employer)
        }
        
    })
    .catch(err => res.status(404).json(err))
})

//route     GET api/Employers/:user_id
//explain   access to the employer details with id
//access    role public

router.get('/:user_id',(req,res)=>{
    const error = {}
    EmployerDash.findOne({ user: req.params.user_id})
    .populate('user',['name','img_url'])
    .then(employer => {
        if(!employer){
            error.noemployer = ' there is no employer with this name'
            res.status(404).json(error);
        }else {
            res.json(employer)
        }
        
    })
    .catch(err => res.status(404).json(err))
})


//route     GET api/Employer/employers
//explain   access to the employer details with id
//access    role public

router.get('/all/employers',(req,res)=>{
    const error = {}
    EmployerDash.find()
    .populate('user',['name','img_url'])
    .then(employers => {
        if(!employers){
            error.noemployers = ' there is no employer'
            res.status(404).json(error);
        }else {
            res.json(employer)
        }
        
    })
    .catch(err => res.status(404).json(err))
})


//route     DELETE api/Employers/current
//explain   delete current dashboard employer
//access    role private
router.delete('/current',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
    
  
    EmployerDash.findOneAndRemove({user: req.user.id})
    .then(employer =>{
       Employers.findByIdAndRemove({_id: req.user.id})
       .then(()=> res.json({ success: true}))
       .catch(err => req.status(400).json(err))
                })
                .catch(err => res.status(400).json(err))
             
})











module.exports = router;
