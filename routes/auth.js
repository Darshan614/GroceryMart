const express = require('express');
const {check,body} = require('express-validator/check');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');
router.get('/login',authController.getlogin);
router.get('/signup',authController.getsignup);
router.get('/loginemployee',authController.getloginemployee);
router.post('/logins',
body('email').isEmail().withMessage('Invalid Email')
,body('password','Invalid Password')
.isLength({min:5})
.isAlphanumeric()
,authController.postlogins);

router.post('/signup',
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value,{req})=>{
        return User.findOne({email:value})
        .then(userDoc=>{
            if(userDoc){
                return Promise.reject('Email already exist')
            }
        })
    }).normalizeEmail(),
    body('password','Length Of Password should be atleast FIVE')
    .isLength({min:5})
    .isAlphanumeric()
    .trim()
    ,body('mobile','Invalid mobile number or it already exist')
    .isLength({min:10,max:10})
    .isNumeric()
    ,body('cpassword')
    .custom((value,{req})=>{
        if(value!==req.body.password)
        {
            throw new Error('Passwords different')
        }
        return true;
    })
,authController.postsignup);

module.exports=router;