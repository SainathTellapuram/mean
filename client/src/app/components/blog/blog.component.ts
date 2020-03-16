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
  form;
  processing = false;
  username = '';
  constructor(
    private formBuilder: FormBuilder,
    private blogservice: BlogService,
    private authservice: AuthService
  ) {
    this.createNewClientForm();
    }
  createNewClientForm(){
    this.form = this.formBuilder.group({
      firstname : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      email : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
      ])],
      mobile : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(10),
      ])],
      qualification : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(3),
      ])],
      address : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(20),
      ])],
      plan : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
      ])],
      course : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(14),
        Validators.minLength(5),
      ])],
      nationality : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(5),
      ])]
    })
  }
      // Enable new blog form
      enableFormNewClientForm() {
        this.form.get('firstname').enable();
        this.form.get('email').enable();
        this.form.get('mobile').enable();
        this.form.get('qualification').enable();
        this.form.get('address').enable();
        this.form.get('plan').enable();
        this.form.get('course').enable();
        this.form.get('nationality').enable();
      }
    
      // Disable new blog form
      disableFormNewClientForm() {
        this.form.get('firstname').disable();
        this.form.get('email').disable();
        this.form.get('mobile').disable();
        this.form.get('qualification').disable();
        this.form.get('address').disable();
        this.form.get('plan').disable();
        this.form.get('course').disable();
        this.form.get('nationality').disable();
      }


  onClientSubmit(){
    this.processing = true; // Disable submit button
    this.disableFormNewClientForm(); // Lock form  
      const blog = {
        firstname: this.form.get('firstname').value, 
        email: this.form.get('email').value,
        mobile: this.form.get('mobile').value, 
        qualification: this.form.get('qualification').value, 
        address: this.form.get('address').value, 
        plan: this.form.get('plan').value, 
        course: this.form.get('course').value, 
        nationality: this.form.get('nationality').value
      }
 
    this.blogservice.newclient(blog).subscribe(data => {
        if (!data.success) {     
          this.messageClass = 'alert alert-danger'; // Return error class
          this.message = data.message; // Return error message
          this.processing = false; // Enable submit button
          this.enableFormNewClientForm(); // Enable form
        } else {
          this.messageClass = 'alert alert-success'; // Return success class
          this.message = data.message; // Return success message
          setTimeout(() => {
            this.newPost = false; // Hide form
            this.processing = false; // Enable submit button
            this.message = false; // Erase error/success message
            this.form.reset(); // Reset all form fields
            this.enableFormNewClientForm(); // Enable the form fields
          }, 2000);
        }
      });
    }

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
    goBack() {
      window.location.reload(); // Clear all variable states
    }
ngOnInit() {
        this.authservice.getProfile().subscribe(profile => {
        this.username = profile.username;
      });
    }
}