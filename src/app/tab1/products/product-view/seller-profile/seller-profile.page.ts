import { UserService } from './../../../../service/user.service';
import { ProductService } from 'src/app/service/product.service';
import { AuthService } from './../../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.page.html',
  styleUrls: ['./seller-profile.page.scss'],
})
export class SellerProfilePage implements OnInit {
  id:any;
  userDetail: any;
  product: any;
  slideOpt ={
    slidesPerView: 2.0,
    // slidesPerColumn: 2,

  }
  constructor(  private route: ActivatedRoute,
    private authService: AuthService,
    private productService : ProductService,
    private modalController: ModalController,
  private userService :UserService,
    private navParams: NavParams) {

       this.id=  this.navParams.data;

     }

  ngOnInit() {

   // this.id = this.route.snapshot.paramMap.get('id');

   this.productService.getProductById(this.id.value).subscribe(res => {

      this.userDetail = res
       console.log(this.userDetail)
      this.productService.getProductbyEmail(this.userDetail.sellerEmail).subscribe(res => {
        console.log(res)
        this.product = res
      })

    })

  }
  close() {
    this.modalController.dismiss();
  }


}
