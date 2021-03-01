import { CartService } from './../../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {
  id;
  products$;
  products: any;
  url:string;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private callNumber: CallNumber,

    private sms: SMS) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

    this.productService.getProductById(this.id).subscribe(res=> {
     this.products = res
     this.url = "https://wa.me/"+ this.products.phone+"?text=Hi";
  })

}

launchDialer(n:any){
  this.callNumber.callNumber(n, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
}

sendSms(n:any) {
  this.sms.send(n, 'Hello world!');
}
}
