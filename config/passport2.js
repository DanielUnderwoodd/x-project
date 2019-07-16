const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');
const Employers = require('../models/Employers');
const key = require('../config/config');
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.secretOrkey;


module.exports = (passport)=>{
   passport.use('jwt-2',
       new jwtStrategy(options,(jwt_payload,done)=>{
        Employers.findById(jwt_payload.id)
        .then(user =>{
            if(user){
                return done(null,user)
            }
            return done(null,false)
        })
        .catch(err => console.log(err))
   }))
}
