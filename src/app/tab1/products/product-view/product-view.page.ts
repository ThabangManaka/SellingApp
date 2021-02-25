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
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private callNumber: CallNumber,
    private sms: SMS) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

    this.productService.getProductById(this.id).subscribe(res=> {
     this.products = res
  })
}

launchDialer(n:any){
  this.callNumber.callNumber(n, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
}

sendSms() {
  let options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
        intent: ''  // send SMS with the native android SMS messaging

    }
};
  this.sms.send(this.products.phone, 'SMS Works', options).then(val => {
    alert('It works');
  });
}
}
