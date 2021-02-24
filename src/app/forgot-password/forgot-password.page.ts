import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

valdationUserMessage = {
 Email: [
  {type:"required", message:"Please enter your email"},
  {type:"pattern", message: "Email entered is incorrect.Try again"}
  ]
}
validationFormUser: FormGroup;
  constructor(private authService : AuthService,
    private _formbuilder : FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.validationFormUser = this._formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    })
  }


  forgotPassword(form){
    console.log(this.validationFormUser.value)
     this.authService.login(this.validationFormUser.value);

  }
}
