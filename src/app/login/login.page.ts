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
      {type:"required", message:"Please enter your password"},
       {type:"minlength", message: "Password must be at least 5 character"}
    ],
   Email: [
    {type:"required", message:"Please enter your email"},
    {type:"pattern", message: "Email entered is incorrect.Try again"}
    ]
  }
  validationFormUser: FormGroup;
  constructor(private _formbuilder : FormBuilder,
    private router: Router) { }

    ngOnInit() {
      this.validationFormUser = this._formbuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])),
      })
    }
    loginUser(form){
      console.log(this.validationFormUser.value)

    }
}
