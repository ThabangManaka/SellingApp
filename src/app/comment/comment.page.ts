import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

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
  validationFormUser: FormGroup;
  constructor(private _formbuilder : FormBuilder,
    private loadingController: LoadingController,
      private toastController: ToastController) { }

  ngOnInit() {

    this.validationFormUser = this._formbuilder.group({

      ratingDesc: new FormControl('', Validators.compose([Validators.required,Validators.minLength(5),

      ])),


    })
  }
 async productForm() {
  const toast = await this.toastController.create({
    message: 'Thank You For The Feedback...',
    duration: 2000,
    position: "bottom",
    animated: true,
    buttons: [
        {
            side: "end",
            icon: 'checkmark-circle-outline',
            role: "cancel",
        }
    ]
});
  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
}
}
