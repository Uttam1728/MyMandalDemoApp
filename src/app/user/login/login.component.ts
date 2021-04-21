import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(private userService: UserService,
              private router : Router, 
              private fb: FormBuilder,
              ) 
    { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  
  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/userprofile');
    this.LoginForm = this.fb.group({

      memberEmail           : ['',[ Validators.required, Validators.email]],
      password              : ['', [Validators.required, Validators.minLength(5)]],
      });
  }

  
  onSubmit(form: FormGroup) {
    // let tempstr = '';
    // tempstr += 'Valid?'+ form.valid + '\n'; // true or false
    // tempstr += 'Name'+ form.value.memberFirstName + '\n';
    // tempstr += 'Email'+ form.value.memberEmail + '\n';
    // tempstr += 'Message'+ form.value.memberAddress + '\n';
    // alert(tempstr);
    if(form.valid){
      
      this.userService.login(form.value).subscribe(
        res => {
          this.userService.setToken(res['token']);
          this.router.navigateByUrl('/userprofile');
        },
        err => {
          this.serverErrorMessages = err.error.message;
        }
      );
    }
  }


}
