import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username_: string = "encora";
  password_:string = 'encora';
  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder) {
      if (this.authService.isLoggedIn()){
        this.router.navigateByUrl('/admin');
      }

     }
  isSubmitted = false;
  loginForm: FormGroup | any;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    
    if(this?.loginForm?.value?.password == this.password_ && this?.loginForm?.value?.username == this.username_){
      this.authService.login(this.loginForm.value);
      this.router.navigateByUrl('/admin');
    } else {
      alert ('Username and Password incorrect!')
    }
    this.loginForm.reset();
  }
  get formControls() { return this.loginForm.controls; }
}
