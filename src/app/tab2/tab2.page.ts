import { FirebaseUploadService } from './../service/firebase-upload.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
   barStatus = false;
   imagesUploads = []
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
      private router: Router,
      private firebaseUploadService : FirebaseUploadService) { }



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
  loginUser() {}

  uploadPhoto(event){
    this.barStatus =true;
    this.firebaseUploadService.storeImage(event.target.files[0]).then((res: any) =>{
       if (res) {
         this.barStatus = false;
         this.imagesUploads.unshift(res);
       }
    },
     (error : any) => {
      this.barStatus = true;
     }
    )
  }
}
