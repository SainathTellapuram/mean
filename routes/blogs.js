const User = require('../models/user');
const Blog = require('../models/blogs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
module.exports = (router) => {
    router.post('/newBlogs',(req,res) =>{
        if(!req.body.firstname){
            res.json({ success:false,message : 'FirstName id required.'});
        } else {
            if(!req.body.mobile){
                res.json({ success:false,message:'Mobile Number is required'});
            } else {
                if(!req.body.email){
                    res.json({ success:false,message:'Email is required'});
                } else {
                    if(!req.body.qualification){
                        res.json({ success:false,message:'Qualification is required'});
                    } else {
                        if(!req.body.address){
                            res.json({ success:false,message:'Address is Required'});
                        } else {
                            if(!req.body.plan){
                                res.json({ success:false,message:'Plan is Required'});
                            } else {
                                if(!req.body.course){
                                    res.json({ success:false , message:'Course is Required'});
                                } else {
                                    if(!req.body.nationality){
                                        res.json({ success:false, message:'Nationality is Required'});
                                    } else {
                                            const blog = new Blog ({
                                                firstname : req.body.firstname,
                                                email : req.body.email,
                                                mobile : req.body.mobile,                                                
                                                qualification : req.body.qualification,
                                                address : req.body.address,
                                                plan : req.body.plan,
                                                course:req.body.course,
                                                nationality : req.body.nationality,
                                                AddedOn : req.body.AddedOn
                                            });
                                            blog.save((err)=>{
                                                if(err){
                                                    if(err.errors.firstname){
                                                        res.json({ success:false,message : err.errors.firstname.message});
                                                    } else {
                                                        if(err.errors.mobile){
                                                        res.json({ success:false,message : err.errors.mobile.message});                                                            
                                                        } else {
                                                            if(err.errors.email){
                                                                res.json({ success:false,message : err.errors.email.message}); 
                                                            } else {
                                                                if(err.errors.qualification){
                                                                    res.json({ success:false,message : err.errors.qualification.message}); 
                                                                } else {
                                                                    if(err.errors.address){
                                                                        res.json({ success:false,message : err.errors.address.message}); 
                                                                    } else {
                                                                        if(err.errors.plan){
                                                                            res.json({ success:false,message : err.errors.plan.message}); 
                                                                        }  else {
                                                                            if(err.errors.course){
                                                                                res.json({ success:false,message : err.errors.course.message}); 
                                                                            } else {
                                                                                if(err.errors.nationality){
                                                                                    res.json({ success:false,message : err.errors.nationality.message}); 
                                                                                } else {
                                                                                        res.json({ success:false,message:err});
                                                                                    }
                                                                                }
                                                                            }
                                                                        }

                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                                                                  
                                                else {
                                                    res.json({ success:true,message:'Client Details Saved'});
                                                }   
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        
    });
    return router;
};
