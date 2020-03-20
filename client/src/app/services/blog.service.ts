import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Http, Headers, RequestOptions} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  options;
  domain = this.authservice.domain;
  constructor(private authservice :AuthService,private http :Http){ }
    createAuthenticationHeaders(){
      this.authservice.loadToken();
      this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type':'application/json',
          'authorization':this.authservice.authToken
        })
      });
    }
    newclient(client){
      this.createAuthenticationHeaders();
      return this.http.post(this.domain + 'blogs/newBlogs',client,this.options).map(res => res.json());
    }
    getAllClient(){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + 'blogs/allBlogs',this.options).map(res => res.json());   
    }
      // Function to get the blog using the id
  getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/singleBlog/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update blog post
  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).map(res => res.json());
  }
  deleteBlog(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).map(res => res.json());
  }
  }
