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
  newPost = false;
  loadingBlogs = false;
  constructor(){}
    newBlogForm(){
      this.newPost = true;
    }
    reloadBlogs(){
      this.loadingBlogs = true;
      // get all blogs
      setTimeout(()=>{
        this.loadingBlogs = false;
      }, 4000);
    }
  
  
  ngOnInit() {
}
}