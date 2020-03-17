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
  }
