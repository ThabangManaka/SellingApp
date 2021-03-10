import { SecureStorageService } from './../service/secure-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { AngularFireAuth } from '@angular/fire/auth'
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
  TotalSold: number;
  constructor( private productService:ProductService,
     private route: ActivatedRoute,
     private afAuth: AngularFireAuth,
     private secureStorageService : SecureStorageService ) {
      this.afAuth.authState.subscribe(user => {

        this.createDate = user.metadata.creationTime;
      })
      }

  ngOnInit() {
    this.secureStorageService.get('user').then(res => {

   this.userDetail =res
   console.log(this.userDetail)
   this.productService.getProductbyEmail(this.userDetail.email).subscribe(res => {
    this.countItems = res.length
      this.products = res
   })
  })
}



}
