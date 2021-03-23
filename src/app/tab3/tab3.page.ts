import { BadgeService } from './../service/badge.service';
import { MessageService } from './../service/message.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { SecureStorageService } from '../service/secure-storage.service';
import { AlertController } from '@ionic/angular';
import { Badge } from '@ionic-native/badge/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  userDetail: any;
  messageDetail: any;
  badgeNumber: number;
  constructor(private messageService: MessageService,
  public alertController: AlertController,
    private secureStorageService :SecureStorageService,
    private badge: Badge,
    private badgeService :BadgeService) {}

  ngOnInit(){
    this.secureStorageService.get('user').then(res => {
      console.log(res);
   this.userDetail =res
   this.messageService.getMessage( this.userDetail.email).subscribe(res => {
     console.log(res);

     this.badgeService.setBadge(res.length)
    this.messageDetail = res


})

 })
  }
 async requestPermission(){
  try {
    let permission = await this.badge.requestPermission();
    console.log(permission)
  } catch (e) {
    console.error(e);
  }
}



}
