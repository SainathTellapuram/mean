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
                                    }                                    
                                    else {
                                            const blog = new Blog ({
                                                firstname : req.body.firstname,
                                                email : req.body.email,
                                                mobile : req.body.mobile,                                                
                                                qualification : req.body.qualification,
                                                address : req.body.address,
                                                plan : req.body.plan,
                                                course:req.body.course,
                                                nationality : req.body.nationality,
                                                createdBy: req.body.createdBy 
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
                                                                                }
                                                                                 else {
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
    router.get('/allBlogs',(req,res)=>{
        Blog.find({},(err,blogs)=>{
            if(err){
                res.json({ success:false,message : err });
            } else {
                if(!blogs){
                    res.json({ success:false,message:'No Blogs Found.'})
                } else {
                    res.json({ success:true, blogs:blogs });
                }
            }
        }).sort({'_id':-1});
    });

    router.get('/singleBlog/:id',(req,res)=>{
        if(!req.params.id){
            res.json({ success:false,message:'No Client ID was Provided'})
        } else {
            Blog.findOne({_id:req.params.id},(err,blog)=>{
                if(err){
                    res.json({success:false,message:'Not a valid Client'});
                } else {
                    if(!blog){
                        res.json({ success:false,message:'Client Not Found'});
                    } else {
                        User.findOne({_id:req.decoded.userId},(err,user)=>{
                            if(err){
                                res.json({ success:false,message:err});
                            } else {
                                if(!user){
                                    res.json({ success:false,message:'unable to authenticate user'});
                                } else {
                                    if(user.username !== blog.createdBy){
                                        res.json({ success:false,message:'You are not authorized to edit this Client'})
                                    } else {
                                        res.json({ success:true,blog:blog});
                                    }
                                }
                            }
                        })

                    }
                }
            });
        }
    });
    router.put('/updateBlog',(req,res) =>{
        Blog.findOne({ _id: req.body._id},(err,blog) =>{
            blog.title = req.body.title;
            blog.firstname = req.body.firstname;
            blog.email = req.body.email;
            blog.mobile = req.body.mobile;
            blog.qualification = req.body.qualification;
            blog.address = req.body.address;
            blog.plan = req.body.plan;
            blog.course = req.body.course;
            blog.nationality = req.body.nationality;
            blog.save((err)=>{
                if(err){
                    res.json({success:false,message:err});
                } else {
                    res.json({ success:true,message:'Client Updated'});
                }
            })          
        });
    });
    return router
}
