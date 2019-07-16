const express = require('express');
const router  = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/config');
const Passport = require('passport');




//bring post model 
const Posts = require('../../models/Post_employer');

// validate post 

const validatePost = require('../../validators/post');
//route     POST api/employee/post
//explain   create post 
//access    role private
router.post('/',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
    const  {error,isValid} = validatePost(req.body)
    if(!isValid){
         res.status(400).json(error)
    }else{
        const post =  new Posts ({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user : req.user.id
        })
    
        post.save().then(post => res.json(post))
        .catch(err=> res.status(400).json(err))
    }

  
    })

//route     GET api/employee/post
//explain   show all post 
//access    role public
router.get('/show',(req,res)=>{
          Posts.find()
          .sort({date: -1})
          .then(posts => res.json(posts))
          .catch(err => res.status(400).json(err))
    })


//route     GET api/employee/show/post
//explain   show  specific post 
//access    role public
router.get('/show/:id',(req,res)=>{
    Posts.findById(req.params.id)
    .then(post => {
        if(post){
            res.json(post)
        }else{
            res.status(400).json({nopost:"no post with this id"})
        }
    })
    .catch(err => res.status(400).json({nopost: "NO post with this id"}))
})


//route     DELETE api/employee/post
//explain   show  specific post 
//access    role private
router.delete('/show/:id',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
     Posts.findOne({user: req.user.id})
     .then(post =>{
         Posts.findById(req.params.id)
         .then(post => {
             if(post.user.toString() !== req.user.id){
                 res.status(401).json({unaithorized: "you cant delete this post "})
             }else{
                 post.remove().then(()=> res.json({success: true}))
             }
         })
         .catch(err=> res.status(400).json({nopost:"no post"}))
     })

  
    })


//route     POST api/employer/post/show/like/:id
//explain   like specific post
//access    role private
router.post('/show/like/:id',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
    Posts.findOne({user: req.user.id})
    .then(post =>{
        Posts.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like =>
              like.user.toString() ===  req.user.id).length > 0){
                  res.status(400).json({liked: "employer alreday liked this post"})
              }else{
                  post.likes.unshift({user: req.user.id})

                  post.save().then(post => res.json(post))
              }
          
        })
        .catch(err=> res.status(400).json({nopost:"no post"}))
    })
   })


//route     POST api/employer/post/show/dislike/:id
//explain   dislike specific post
//access    role private
router.post('/show/dislike/:id',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
    Posts.findOne({user: req.user.id})
    .then(post =>{
        Posts.findById(req.params.id)
        .then(post => {
            console.log(post)
          if(post.likes.filter(like =>
              like.user.toString() ===  req.user.id).length === 0){
                  res.status(400).json({disliked: "this post not liked"})
              }else{
                     const removeLike = post.likes
                     .map(data => data.user.toString())
                     .indexOf(req.user.id)
                     post.likes.splice(removeLike,1);
                     post.save().then(post=> res.json(post))
              }
          
        })
        .catch(err=> res.status(400).json(err))
    })
   })

 //route   POST api/employer/post/show/comment/:id
//explain   comment on a specific post
//access    role private
router.post('/show/comment/:id',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
    const  {error,isValid} = validatePost(req.body)
    if(!isValid){
         res.status(400).json(error)
    }else{

        Posts.findById(req.params.id)
        .then(post =>{
            const comment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
   
            post.comments.unshift(comment);
   
            post.save().then(post=> res.json(post))
        })
           .catch(err=> res.status(400).json(err))
    }
   
    
   })


//route     DELETE api/employer/post/show/comment/:id
//explain   delete a  comment
//access    role private
router.delete('/show/comment/:id/:comment',Passport.authenticate('jwt-2',{ session: false }),(req,res)=>{
    
        Posts.findById(req.params.id)
        .then(post =>{
            if(post.comments.filter( comment=> comment._id.toString()===req.params.comment).length ===0){
                res.status(400).json({nocomment: "this comment with this id not exist"})
            }else{
                const deleteComment = post.comments
                .map(comment => comment._id.toString())
                .indexOf(req.params.comment)
                
                post.comments.splice(deleteComment,1);

                post.save().then(post=> res.json(post))
            }
        })
     
   })
    module.exports = router;

