const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10


const jwt = require('jsonwebtoken')

const middleware = require('../middlewares')

router.get('/login', (req, res) => {
    //check if email is in  database
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) res.status(404).json({error: 'no user with that email found'})
        else {
            //check is password is valid 
            bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) res.status(200).json({msg: "successful login"})
                else res.status(403).json({error: 'passwords do not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json(error)
        else {
            const newUser = User({email: req.body.email, password: hash})
            newUser.save()
                .then(user => {
                    //if user is registered, we return the jwt token
                    res.status(200).json({token: generateToken(user)})
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        }
    })
});

//test  route for the jwt token
router.get('/jwt-test', middleware.verify , (req, res) => {
    res.status(200).json(req.user)
})

//function to generate the jwt token
function generateToken(user){
    return jwt.sign({ data: user }, process.env.TOKEN_SECRET, {expiresIn: '24h'})
}

module.exports = router
