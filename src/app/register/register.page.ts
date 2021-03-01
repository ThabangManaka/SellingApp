import { AuthService } from './../service/auth.service';
import { Register } from '../IRegister';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  valdationUserMessage = {
    Password :[
      {type:"required", message:"please enter your password"},
       {type:"minlength", message: "Password must be at least 5 character"}
    ],
   Email: [
    {type:"required", message:"please enter your email"},
    {type:"pattern", message: "Email entered is incorrect.Try again"}
    ],
    Firstname: [
      {type:"required", message:"please enter your first name"},
      {type:"minlength", message: "First Name must be at least 3 character"}
      ],
      Lastname: [
        {type:"required", message:"please enter your last name"},
        {type:"minlength", message: "Last Name must be at least 3 character"}
        ],
      Phone: [
       {type:"required", message:"please enter your phone"},
       {type:"minlength", message: "Phone must be at least 10 number"}
       ]
  }
  validationFormUser: FormGroup;
  constructor(private _formbuilder : FormBuilder,
    private authService : AuthService) { }


  ngOnInit() {
    this.validationFormUser = this._formbuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])),

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
  registerUser(form) {
    const password = this.validationFormUser.get('password').value;

    const user: Register = {
     firstname : this.validationFormUser.get('firstname').value,
     lastname : this.validationFormUser.get('lastname').value,
     phone : this.validationFormUser.get('phone').value,
     email : this.validationFormUser.get('email').value,
    }

      this.authService.register(user, password);

  }
}
