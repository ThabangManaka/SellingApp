import { FirebaseUploadService } from './../service/firebase-upload.service';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../service/user.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

 validationFormUser: FormGroup;
 barStatus = false;
 imagesUploads = [];
 imageUrl;
 mainuser: AngularFirestoreDocument
userProfile: any;
profilePic;
imageResponse: any;
    options: any;
converted_image;
@ViewChild('fileBtn') fileBtn: {
  nativeElement: HTMLInputElement
}

  constructor(private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private userService : UserService,
    private _formbuilder : FormBuilder,
    private toastController: ToastController,
    private afs: AngularFirestore,
    private imagePicker: ImagePicker,
    private navParams: NavParams) {
      
      this.userProfile =  this.navParams.data;
      this.mainuser = afs.doc(`users/${this.userProfile.id}`)
     }


  ngOnInit() {


   this.validationFormUser = this._formbuilder.group({

    phone: new FormControl(this.userProfile.phone, Validators.compose([  Validators.required, ])),
    firstname: new FormControl(this.userProfile.firstname, Validators.compose([  Validators.required, ])),
    lastname: new FormControl(this.userProfile.lastname, Validators.compose([  Validators.required, ])),

  });

  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  async productForm(form) {
    const toast = await this.toastController.create({
      message: 'User Updated Successfully...',
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

    this.userService.updateUser(this.userProfile.id,this.validationFormUser.value).then(() =>{

      toast.present().then();
    }).catch(res => {
      console.log(res);
    });


  }

  updateProfilePic() {
		this.fileBtn.nativeElement.click()
	}

  uploadPic(event) {

   this.imageUrl = event.target.files[0]
   console.log(this.imageUrl)
    this.converted_image = "data:image/jpeg;base64,"+this.imageUrl.name;
    let reqParams = {
      email: this.userProfile.email,
     firstname:this.userProfile.firstname,
     lastname:this.userProfile.lastname ,
     phone:this.userProfile.phone,
     profilePic : this.converted_image
      };

    this.userService.updateUser(this.userProfile.id,reqParams )
//  this.mainuser.update({
//    profilePic : event.target.files[0]
//  })


  }
  getImages() {
    this.options = {

     quality: 100,
     outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {

       console.log(results)
      // for (var i = 0; i < results.length; i++) {
      //   this.imageResponse.push('data:image/jpeg;base64,' + results[i]);

      // }
    }, (err) => {
      alert(err);
    });
  }



	}
