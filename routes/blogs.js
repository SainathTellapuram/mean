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
      /* ===============================================================
     DELETE BLOG POST
  =============================================================== */
//   router.delete('/deleteBlog/:id', (req, res) => {
//     Blog.findOne({ _id: req.body._id},(err,blog) =>{
//         if(err){
//             res.json({success:false,message:'Not a valid Client'});
//         } else {
//         blog.delete((err) => {
//             if (err) {
//               res.json({ success: false, message: err }); // Return error message
//             } else {
//               res.json({ success: true, message: 'Client deleted!' }); // Return success message
//             }
//           });
//         }
//     });
//   });
router.delete('/deleteBlog/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if blog was found in database
          if (!blog) {
            res.json({ success: false, messasge: 'Blog was not found' }); // Return error message
          } else {
            // Get info on user who is attempting to delete post
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user's id was found in database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user attempting to delete blog is the same user who originally posted the blog
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this blog post' }); // Return error message
                  } else {
                    // Remove the blog from database
                    blog.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Blog deleted!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });

    return router
}
