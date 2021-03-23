import { ProductService } from 'src/app/service/product.service';
import { AuthService } from './../../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.page.html',
  styleUrls: ['./seller-profile.page.scss'],
})
export class SellerProfilePage implements OnInit {
  id;
  userDetail: any;
  product: any;
  slideOpt ={


    slidesPerView: 2.0,
    // slidesPerColumn: 2,

  }
  constructor(  private route: ActivatedRoute,
    private authService: AuthService,
    private productService : ProductService) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    this.authService.getProfileId(this.id).subscribe(res => {

      this.userDetail = res

      this.productService.getProductbyEmail(this.userDetail.email).subscribe(res => {
        console.log(res)
        this.product = res
      })

    })

  }

}
