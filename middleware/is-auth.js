module.exports = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        console.log("passed authentication");
        return res.redirect('/login');
    }
    next();
}
