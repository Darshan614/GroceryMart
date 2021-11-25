const {validationResult} = require('express-validator')
const User = require('../models/user');
const Store = require('../models/stores');
const bcrypt = require('bcryptjs')

const fetch = require('node-fetch');
exports.getlogin = (req,res,next)=>{
    res.render('auth/login',{
        errormessage:null,
        validationErrors:[]
    });
}
exports.getsignup = (req,res,next)=>{
    res.render('auth/signup',{
        errormessage:null,
        validationErrors:[]
    });
}
exports.getloginemployee = (req,res,next)=>{
    res.render('auth/loginemployee');
}
exports.postlogins = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/login',{
            validationErrors:errors.array(),
            errormessage:errors.array()[0].msg
        })
    }
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(422).render('auth/login',{
                errormessage:'Email does not exist',
                validationErrors:[]
            })
        }
        bcrypt.compare(password,user.password)
        .then(match=>{
            if(match)
            {
                req.session.isLoggedIn=true;
                req.session.user=user;
                console.log(user);
                return req.session.save(err=>{
                    console.log(err);
                    res.redirect('/');
                })
                
            }
            else{
                return res.render('auth/login',{
                    errormessage:'Invalid email or password',
                    validationErrors:[]
                })
            }
            
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}
exports.postsignup = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const location = req.body.address;
    
    const mobile = req.body.mobile;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).render('auth/signup',{
            validationErrors:errors.array(),
            errormessage:errors.array()[0].msg
        })
    }
    fetch("https://api.opencagedata.com/geocode/v1/json?q="+location+"&key=f4f4e87cf1f74fe3a33d4246e29cb113")
    .then(response=>response.json())
    .then(data=>{
        console.log(data.results[0].geometry);

        bcrypt.hash(password,10)
        .then(hashedPassword=>{
            const user = new User({
                email:email,
                password:hashedPassword,
                mobile:mobile,
                address:{longitude:(data.results[0].geometry).lng,
                    latitude:(data.results[0].geometry).lat},
                cart:{items:[]}
            });
            console.log(user);
            return user.save();
        })
        .then(result=>{
            
            res.render("auth/login",{
                errormessage:null,
                validationErrors:[]
            });
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log("Place not found");
        console.log(err);
        res.render("auth/signup",{
            errormessage:"Location not Found",
            validationErrors:[]
        });
    })
    
}