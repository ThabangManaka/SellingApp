import { CartService } from './../../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToastController } from '@ionic/angular';
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
    private sms: SMS,
    public toastController: ToastController,
    public androidPermissions: AndroidPermissions) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

    this.productService.getProductById(this.id).subscribe(res=> {
     this.products = res
     console.log(this.products)
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

async presentToast(msg: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}
async sendSMS(){
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
    result => console.log('Has permission?'+result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS )
    );
  var options = {
          replaceLineBreaks: true, // true to replace \n by a new line, false by default
          android: {
              //intent: 'INTENT'  // send SMS with the native android SMS messaging
             intent: '' // send SMS without opening any other app
          }
      };
      try{
      await this.sms.send('0799685263'.toString(),'Hello ',options);
      console.log("sent");
      this.presentToast("mensage sent");
    }
    catch(e){
      console.log(JSON.stringify(e));
      console.log(e);
      this.presentToast(e);
    }
  }
}
