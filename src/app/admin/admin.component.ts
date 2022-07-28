import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PostService } from '../post.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Post } from '../post';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,public postService: PostService) { }

  posts: Post[] = [];

  form: FormGroup | any;
  id: number | undefined;
  post: Post | undefined;
  
  
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
      this.getFormData();
  }

  getFormData(){
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      this.id = undefined;
    })
  }
   
  get f(){
    return this.form.controls;
  }
    
  submit(){

    if(this.id !=undefined){
      this.postService.update(this.id, this.form.value).subscribe(res => {
        this.form.reset();
        this.getFormData();
      })
    } else{
      this.postService.create(this.form.value).subscribe(res => {
        this.form.reset();
        this.getFormData();
      })
      
    }
   
  }

  deletePost(Dataid:any){
    this.id = undefined;
    this.postService.delete(Dataid).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== Dataid);
         this.form.reset();
         this.getFormData();     
    })
    
  }

  EditPost(id:any){
    this.id = id;
    this.postService.find(id).subscribe((data: Post)=>{
      this.post = data;
      this.form.setValue({title: this.post.title, body: this.post.body})
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}