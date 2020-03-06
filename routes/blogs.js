const User = require('../models/user');
const Blog = require('../models/blogs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
module.exports = (router) => {
    router.post('/newBlog',(req,res) =>{
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
                                    if(!req.body.country){
                                        res.json({ success:false, message:'Country is Required'});
                                    } else {
                                        if(!req.body.status){
                                            res.json({ success:false,message:'Status if Required , Started | In Process | Completed'})
                                        } else {
                                            const blog = new Blog ({
                                                firstname : req.body.firstname,
                                                mobile : req.body.mobile,
                                                email : req.body.email,
                                                qualification : req.body.qualification,
                                                address : req.body.address,
                                                plan : req.body.plan,
                                                course:req.body.course,
                                                country : req.body.country,
                                                status : req.body.status,
                                                AddedOn : req.body.AddedOn
                                            });
                                            blog.save((err)=>{
                                                if(err){
                                                    if(err.errors.firstname){
                                                        res.json({ success:false,message:err.errors.firstname.message});
                                                    } else {
                                                        if(err.errors.mobile){
                                                            res.json({ success:false,message:err.errors.mobile.message});
                                                        } else {
                                                            if(err.errors.email){
                                                                res.json({ success:false,message:err.errors.email.message});
                                                            } else {
                                                                if(err.errors.qualification){
                                                                    res.json({ success:false,message:err.errors.qualification.message});
                                                                } else {
                                                                    if(err.errors.address){
                                                                        res.json({ success:false,message:err.errors.address.message});
                                                                    } else {
                                                                    if(err.errors.plan){
                                                                        res.json({ success:false,message:err.errors.plan.message});
                                                                    } else {
                                                                        if(err.errors.course){
                                                                            res.json({ success:false,message:err.errors.course.message});
                                                                        } else {
                                                                            if(err.errors.country){
                                                                                res.json({ success:false,message:err.errors.country.message});
                                                                            } else {
                                                                                if(err.errors.status){
                                                                                    res.json({ success:false,message:err.errors.status.message});
                                                                                } else {
                                                                                    res.json({success:false,message:err});
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                  }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    
                                                } else {
                                                    res.json({ success:true,message:'Client Details Saved'})
                                                }   
                                            })
                                        }
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
