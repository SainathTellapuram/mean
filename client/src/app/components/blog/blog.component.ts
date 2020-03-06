import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  form;
  constructor(
    private formBuilder:FormBuilder,
    
  ) { this.createNewBlogForm(); }
  createNewBlogForm(){
    this.form = this.form.group({
      firstname:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(5)])],
      email:['',Validators.compose([Validators.required,Validators.maxLength(5),Validators.minLength(31)])],
      mobile:['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(12)])],
      qualification:['',Validators.compose([Validators.required,Validators.maxLength(3),Validators.minLength(15)])],
      address:['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(200)])],
      plan:['',Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(10)])],
      course:['',Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(15)])],
      country:['',Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(15)])],
      status:['',Validators.compose([Validators.required,Validators.maxLength(6),Validators.minLength(10)])],
      
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
  
  ngOnInit() {
  }

}
