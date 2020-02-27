const User = require('../models/user');
module.exports = (router) =>{
    router.post('/register',(req,res)=>{
        // req.body.email;
        // req.body.username;
        // req.body.password;
        if(!req.body.email){
            res.json({success:false,message: 'You Must provide an EMail'});
        } else {
            if(!req.body.username){
                res.json({success:false,message: 'You Must provide an User Name'});
            } else {
                if(!req.body.password){
                    res.json({success:false,message: 'You Must provide an Password'});
                } else {
                let user = new User({
                    email:req.body.email.toLowerCase(),
                    username:req.body.username.toLowerCase(),
                    password:req.body.password
                });
                user.save((err)=>{
                    if(err){
                        if(err.code ===11000){
                            res.json({success:false,message:'username or email already exists'});
                        } else {
                            if(err.errors){
                                if(err.errors.email){
                                    res.json({success:false,message:err.errors.email.message});
                        }
                    }else {
                        res.json({success:false,message:'could Not save user. Error:',err});
                    } 
                }
            } else {
                        res.json({ success : true,message:'user Saved'});
            }
                });
        }
    }
    }
    });    
return router;
}