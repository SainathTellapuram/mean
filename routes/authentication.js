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
                        } else {
                            if(err.errors.username){
                                res.json({ success:false,message:err.errors.username.message});
                            } else {
                                if(err.errors.password){
                                    res.json({ success:false,message:err.errors.password.message});
                                } else {
                                    res.json({success:false,message:err});
                                }                            
                            }
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
    router.get('/checkEMail/:email',(req,res)=>{
        if(!req.params.email){
            res.json({success:false,message:'E-mail was not provided'})
        } else {
            User.findOne({ email:req.params.email},(err,user)=>{
                if(err){
                    res.json({success:false,message:err});
                } else {
                    if(user){
                        res.json({success:false,message:'EMail is already taken'});
                    } else {
                        res.json({success:false,message:'Email is Available'});
                    }

                }
            });
        }
    });
    router.get('/checkUsername/:username',(req,res)=>{
        if(!req.params.username){
            res.json({success:false,message:'username was not provided'})
        } else {
            User.findOne({ email:req.params.username},(err,user)=>{
                if(err){
                    res.json({success:false,message:err});
                } else {
                    if(user){
                        res.json({success:false,message:'username is already taken'});
                    } else {
                        res.json({success:false,message:'username is Available'});
                    }

                }
            });
        }
    });

    router.post('/login',(req,res)=>{
       if(!req.body.username){
           res.json({success:false,message:'No username was provided'});
       } else {
           if(!req.body.password){
               res.json({ success:false,message:'No password was provided.'});
           } else{
               User.findOne({username:req.body.username.toLowerCase()},(err,user) =>{
                   if(err){
                       res.json({success:false,message:err});
                   } else {
                       if(!user){
                           res.json({success:false,message:'username not found.'});
                       } else {
                           const validPassword = user.comparePassword(req.body.password);
                           if(!validPassword){
                            res.json({success:false,message:'Password Invalid'});
                           } else {
                            res.json({success:true,message:'Success!'});
                           }
                       }
                   }
               });
           }
       }
    })

return router;
}


