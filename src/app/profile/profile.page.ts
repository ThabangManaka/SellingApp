import { AuthService } from './../service/auth.service';
import { SecureStorageService } from './../service/secure-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController ,ToastController } from '@ionic/angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDetail: any;
  createDate: any;
  products: any;
  countItems: number;
  sub: any;
  userProfile;
	username: string
	profilePic: string
  TotalSold: number;

  mainuser: AngularFirestoreDocument
  constructor( private productService:ProductService,
    public alertController: AlertController,
    private toastController: ToastController,
     private afAuth: AngularFireAuth,
     private userService : UserService,
     private secureStorageService : SecureStorageService,
     private authService : AuthService ) {
      this.afAuth.authState.subscribe(user => {


    this.userService.getUserbyId(user.uid).subscribe(p =>this.userProfile = p );
        this.createDate = user.metadata.creationTime;
      })


      }

  ngOnInit() {
    this.secureStorageService.get('user').then(res => {

   this.userDetail =res
   console.log(this.userDetail)

      this.authService.getProfileId(this.userDetail.email).subscribe(res => {
        console.log(res)
      })
   this.productService.getProductbyEmail(this.userDetail.email).subscribe(res => {

    this.countItems = res.length
      this.products = res
   })

   this.productService.soldProduct(this.userDetail.email).subscribe(res => {
      this.TotalSold = res.length
   })
  })
}
async onSoldItems(item){

    const toast = await this.toastController.create({

      message: 'Product Is Removed Successfully...',
      duration: 2000,
      position: "bottom",
      animated: true,
      buttons: [
          {
             cssClass: 'my-custom-class',
              side: "end",
              icon: 'checkmark-circle-outline',
              role: "cancel",
          }
      ]
  });

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: 'Are you sure that the product is sold!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');

          this.productService.addSold(item).then(res =>{

            this.productService.deleteProduct(item).then(res => {
              toast.present().then();
            })

          })
        }
      }
    ]
  });

  await alert.present();
}


}
