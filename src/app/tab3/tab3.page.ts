import { MessageService } from './../service/message.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { SecureStorageService } from '../service/secure-storage.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  userDetail: any;
  messageDetail: any;
  constructor(private messageService: MessageService,
    private secureStorageService :SecureStorageService) {}

  ngOnInit(){
    this.secureStorageService.get('user').then(res => {
      console.log(res);
   this.userDetail =res
   this.messageService.getMessage( this.userDetail.email).subscribe(res => {
     console.log(res);
    this.messageDetail = res

})

 })
  }
}
