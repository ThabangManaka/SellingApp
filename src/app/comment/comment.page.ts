import { RatingsService } from './../service/ratings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';


import { AuthService } from '../service/auth.service';
import { SecureStorageService } from '../service/secure-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  valdationUserMessage = {

    RatingDesc :[
      {type:"required", message:"Please Enter Feedback"},
       {type:"minlength", message: "Feedback must be at least 5 character"}
    ],

  }

  userDetail: any;
  validationFormUser: FormGroup;
  constructor(private _formbuilder : FormBuilder,
      private toastController: ToastController,
      private router: Router,
      private ratingsService : RatingsService,
      private secureStorageService : SecureStorageService) {

      }

  ngOnInit() {
    this.secureStorageService.get('user').then(res => {
         this.userDetail =res
         console.log(this.userDetail)
       })

    this.validationFormUser = this._formbuilder.group({

      ratingDesc: new FormControl('', Validators.compose([Validators.required,Validators.minLength(5),
      ])),
      starRating:[3],
      date: new Date(),
      firstname: ''
    })
  }
 async ratingForm(form) {
  const toast = await this.toastController.create({
    message: 'Thank You For The Feedback...',
    duration: 3000,
    position: "bottom",
    animated: true,

});
  this.validationFormUser.value.firstname= this.userDetail.firstname
this.ratingsService.addRating(this.validationFormUser.value).then(res => {
  toast.present().then();
  this.router.navigateByUrl('/tabs/tab1');
});
  }


  logRatingChange(rating){
    console.log("changed rating: ",rating);

}
}
