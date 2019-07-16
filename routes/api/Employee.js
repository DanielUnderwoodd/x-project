const express = require('express');
const router  = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/config');
const Passport = require('passport');




// use validator for register
const validateRegister = require('../../validators/register')
// use validator for login
const validateLogin = require('../../validators/login')
// use validator for current employee
const validateCurrentEmployee = require('../../validators/currentEmployee')
//bring user model
var Employees = require('../../models/Employee');
// bring EmployeeDashboard
var EmployeeDash = require('../../models/Employee_dashboard');

// validate experience field
const validateEperience = require('../../validators/Experience')
// validate experience field
const validateEducation = require('../../validators/Education')


//route     Get api/login/test
//explain   test the route
//access    role public
router.get('/test',(req,res)=>{
    res.json({msg: "test works"})
})


//route     Get api/Employee/register
//explain   register employee
//access    role public
router.post('/register',(req,res)=>{

    const {error, isValid} = validateRegister(req.body)
      console.log(isValid)
    if (!isValid){
        res.status(400).json(error)
    }else{
         const email = req.body.email
        Employees.findOne({email})
        .then((user)=>{
            if (user){
                
                 error.email = "We got one email with this address in employee section"
                 console.log(error)
                 res.status(400).json(error)
            } else {
                const img_url = gravatar.url(req.body.email,{
                    s: '200',
                    r: 'pg', 
                    d: 'mm'})
                const newUser = new Employees({
                    user_mode: req.body.user_mode,
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


//route     Get api/Employee/login
//explain   login Employees / genarate JWT
//access    role public
router.post('/login',(req,res)=>{

    const {error, isValid} = validateLogin(req.body)
    
  if (!isValid){
      res.status(400).json(error)
  }else{
    const email = req.body.email
    const password = req.body.password
    Employees.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(404).json({email: "user not found"})
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
                return res.status(400).json({password: "password you enter is wrong"})
            }
        })
        
    })

  }
  
})

//route     Get api/Employees/current
//explain   current user
//access    role private
router.get('/current',Passport.authenticate('jwt-1',{ session: false }),(req,res)=>{
        const error = {}
        EmployeeDash.findOne({user: req.user.id})
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

//route     POST api/Employees/current
//explain   current Employee edit or create
//access    role private
router.post('/current',Passport.authenticate('jwt-1',{ session: false }),(req,res)=>{

         const {error , isValid} = validateCurrentEmployee(req.body)

         if(!isValid){
             res.status(400).json(error)
         }else{
                //bring model employeeDash objects
                const EmployeeDashObjects = {};
                EmployeeDashObjects.user = req.user.id;
                if(req.body.handler) {
                    EmployeeDashObjects.handler = req.body.handler
                }
                if(req.body.company) {
                    EmployeeDashObjects.company = req.body.company
                }
                if(req.body.website) {
                    EmployeeDashObjects.website = req.body.website
                }
                if(req.body.location) {
                    EmployeeDashObjects.location = req.body.location
                }
                if(req.body.bio) {
                    EmployeeDashObjects.bio = req.body.bio
                }
                if(req.body.status) {
                    EmployeeDashObjects.status = req.body.status
                }
                if(req.body.status_job) {
                    EmployeeDashObjects.status_job = req.body.status_job
                }
                if(req.body.myjobs) {
                    EmployeeDashObjects.myjobs = req.body.myjobs
                }

                // split array
                if(typeof req.body.skills !== undefined) {
                    EmployeeDashObjects.skills = req.body.skills.split(',')
                }

                EmployeeDashObjects.social = {}
                if(req.body.instgram) {
                    EmployeeDashObjects.social.instgram = req.body.instgram
                }
                if(req.body.twitter) {
                    EmployeeDashObjects.social.twitter = req.body.twitter
                }
                if(req.body.linkedin) {
                    EmployeeDashObjects.social.linkedin = req.body.linkedin
                }


                EmployeeDash.findOne({user: req.user.id})
                .then(user =>{
                    if(user){
                        // update curent employee dashboard info
                        EmployeeDash.findOneAndUpdate(
                            {user: req.user.id},
                            {$set : EmployeeDashObjects},
                            {new: true})
                            .then(employee => res.json(employee))
                    }else{
                        // create

                        EmployeeDash.findOne({handler: EmployeeDashObjects.handler})
                        .then(employee => {
                            if(employee){
                                error.handler = "this handler its exist"
                                res.status(400).json(error)
                            }else{
                                new EmployeeDash(EmployeeDashObjects).save()
                                    .then(data => res.json(data))
                            }
                        })
                                }
                            })
         }
       
  
    })

//route     GET api/Employees/handler
//explain   access to the employee details
//access    role public

router.get('/handler/:handler',(req,res)=>{
    const error = {}
    EmployeeDash.findOne({ handler: req.params.handler})
    .populate('user',['name','img_url'])
    .then(employee => {
        if(!employee){
            error.noemployee = ' there is no employee with this name'
            res.status(404).json(error);
        }else {
            res.json(employee)
        }
        
    })
    .catch(err => res.status(404).json(err))
})

//route     GET api/Employers/:user_id
//explain   access to the employer details with id
//access    role public

router.get('/:user_id',(req,res)=>{
    const error = {}
    EmployeeDash.findOne({ user: req.params.user_id})
    .populate('user',['name','img_url'])
    .then(employee => {
        if(!employee){
            error.noemployee = ' there is no employee with this name'
            res.status(404).json(error);
        }else {
            res.json(employee)
        }
        
    })
    .catch(err => res.status(404).json(err))
})

//route     GET api/Employer/employers
//explain   access to the employer details with id
//access    role public

router.get('/all/employees',(req,res)=>{
    const error = {}
    EmployeeDash.find()
    .populate('user',['name','img_url'])
    .then(employees => {
        if(!employees){
            error.noemployees = ' there is no employee'
            res.status(404).json(error);
        }else {
            res.json(employees)
        }
        
    })
    .catch(err => res.status(404).json(err))
})

//route     POST api/Employees/current/exprience
//explain   add exprience
//access    role private
router.post('/current/experience',Passport.authenticate('jwt-1',{ session: false }),(req,res)=>{
const {error , isValid} = validateEperience(req.body)

         if(!isValid){
             res.status(400).json(error)
         }else{
            
           EmployeeDash.findOne({user: req.user.id})
           .then(employee =>{
               const exp = {
                   title: req.body.title,
                   company: req.body.company,
                   location: req.body.location,
                   from: req.body.from,
                   to: req.body.to,
                   current: req.body.current,
                   description: req.body.description 
               }   
               employee.experience.unshift(exp)
                    employee.save()
                    .then(emplyee => res.json(employee))
                    .catch(err => res.status(400).json(err))
                       })
                    }
    })

//route     POST api/Employees/current/education
//explain   add education
//access    role private
router.post('/current/education',Passport.authenticate('jwt-1',{ session: false }),(req,res)=>{
    const {error , isValid} = validateEducation(req.body)
    
             if(!isValid){
                 res.status(400).json(error)
             }else{
                
               EmployeeDash.findOne({user: req.user.id})
               .then(employee =>{
                   const education = {
                       school: req.body.school,
                       degree: req.body.degree,
                       field: req.body.field,
                       from: req.body.from,
                       to: req.body.to,
                       current: req.body.current,
                       description: req.body.description 
                   }   
                   employee.education.unshift(education)
                        employee.save()
                        .then(emplyee => res.json(employee))
                        .catch(err => res.status(400).json(err))
                           })
                        }
        })

//route     DELETE api/Employees/current/experience/:id
//explain   delete experience
//access    role private
router.delete('/current/experience/:id',Passport.authenticate('jwt-1',{ session: false }),(req,res)=>{
    
  
               EmployeeDash.findOne({user: req.user.id})
               .then(employee =>{
               const delete_exp = employee.experience
               .map(item => item.id)
               .indexOf(req.params.id)

               employee.experience.splice(delete_exp,1)
               employee.save().then(employee => res.json(employee))
               .catch(err => res.status(400).json(err))


                           })
                        
        })


//route     DELETE api/Employees/current/education/:id
//explain   delete education
//access    role private
router.delete('/current/education/:id',Passport.authenticate('jwt-1',{ session: false }),(req,res)=>{
    
  
    EmployeeDash.findOne({user: req.user.id})
    .then(employee =>{
    const delete_edu = employee.education
    .map(item => item.id)
    .indexOf(req.params.id)

    employee.education.splice(delete_edu,1)
    employee.save().then(employee => res.json(employee))
    .catch(err => res.status(400).json(err))


                })
             
})


//route     DELETE api/Employees/current
//explain   delete current dashboard
//access    role private
router.delete('/current',Passport.authenticate('jwt-1',{ session: false }),(req,res)=>{
    
  
    EmployeeDash.findOneAndRemove({user: req.user.id})
    .then(employee =>{
       Employees.findByIdAndRemove({_id: req.user.id})
       .then(()=> res.json({ success: true}))
       .catch(err => req.status(400)/json(err))
                })
                .catch(err => res.status(400).json(err))
             
})



        


        




module.exports = router;
