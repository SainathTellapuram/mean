import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  messageClass;
  message;
  username;
  newPost = false;
  loadingBlogs = false;
  form;
  processing = false;
  constructor(
    private formBuilder:FormBuilder,
    private authservice:AuthService,
    private blogService:BlogService
  ) {
     this.createNewBlogForm();
   }
  createNewBlogForm(){
    this.form = this.formBuilder.group({
      firstname:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(5)])],
      email:['',Validators.compose([Validators.required,Validators.maxLength(31),Validators.minLength(5)])],
      mobile:['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(12)])],
      qualification:['',Validators.compose([Validators.required])],
      address:['',Validators.compose([Validators.required])],
      plan:['',Validators.compose([Validators.required])],
      course:['',Validators.compose([Validators.required])],
      country:['',Validators.compose([Validators.required])],
      status:['',Validators.compose([Validators.required])],      
    })
  }
  newBlogForm(){
    this.newPost = true;
  }
  reloadBlogs(){  
  this.loadingBlogs = true;
  setTimeout(()=>{
    this.loadingBlogs = false;
  },4000);
  }
  enableForm(){
    this.form.get('firstname').enable();
    this.form.get('email').enable();
    this.form.get('mobile').enable();
    this.form.get('qualification').enable();
    this.form.get('address').enable();
    this.form.get('plan').enable();
    this.form.get('course').enable();
    this.form.get('country').enable();
    this.form.get('status').enable();
  }
  disableForm(){
    this.form.get('firstname').disable();
    this.form.get('email').disable();
    this.form.get('mobile').disable();
    this.form.get('qualification').disable();
    this.form.get('address').disable();
    this.form.get('plan').disable();
    this.form.get('course').disable();
    this.form.get('country').disable();
    this.form.get('status').disable();
  }
  onClientSubmit(){
   this.processing = true;
   this.disableForm();
   const client = {
    firstname:this.form.get('firstname').value,
    email:this.form.get('email').value,
    mobile:this.form.get('mobile').value,
    qualification:this.form.get('qualification').value,
    address:this.form.get('address').value,
    plan:this.form.get('plan').value,
    course:this.form.get('course').value,
    country:this.form.get('country').value,
    status:this.form.get('status').value,
    createdBy:this.username,
   }
   this.blogService.newclient(client).subscribe(data => {
     if(!data.success){
       this.messageClass = 'alert alert-danger';
       this.message = data.message;
       this.processing = false;
       this.enableForm();
     } else {
       this.messageClass = 'alert alert-success';
       this.message = data.message;
       setTimeout(() =>{
        this.newPost = false;
        this.processing = false;
        this.message = false;
        this.form.reset();
        this.enableForm();
       },2000);
     }
   });
  }
  goBack(){
    window.location.reload();
  }
  
  ngOnInit() {
    this.authservice.getProfile().subscribe(profile =>{
      this.username = profile.user.username;
    })
  }
}



// AKIAJFQ62M36ZKYWYLCA
// /k19J/FTPvWGbGdSzO32m7+jHn+jE+f9nvT5xslq
// sainathbazaar-21	
