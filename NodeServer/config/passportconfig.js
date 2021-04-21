const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const {Member} = require("../Models/Member");

passport.use('addmember',
    new localStrategy({ usernameField: 'memberEmail',passwordField: 'password' },
        (username, password, done) => {
            console.log('in pConfig ',username);
            Member.findOne({ memberEmail: username },
                (err, user) => {
                    if (err){
                        console.log('in pConfig err',username,err);
                        return done(err);
                        
                    }
                    // unknown user
                    else if (!user){
                        console.log('in pConfig user',username);
                        return done(null, false, { message: 'Email is not registered' });
                    }
                    // wrong password
                    else if (!user.verifyPassword(password)){
                        console.log('in pConfig pass',username);
                        return done(null, false, { message: 'Wrong password.' });
                    }
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);