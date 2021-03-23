import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  valdationUserMessage = {
    Password :[
      {type:"required", message:"Please Enter Your Password"},
       {type:"minlength", message: "Password must be at least 6 character"}
    ],
   Email: [
    {type:"required", message:"Please Enter Your Email"},
    {type:"pattern", message: "Email Entered Is Incorrect.Try Again"}
    ]
  }
  validationFormUser: FormGroup;
  constructor(private _formbuilder : FormBuilder,
    private authService : AuthService,
    private router: Router) { }

    ngOnInit() {
      this.validationFormUser = this._formbuilder.group({
        email: new FormControl('thaba@gmail.com', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('Thabang', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])),
      })
    }
    loginUser(form){

       this.authService.login(this.validationFormUser.value);

    }
}
