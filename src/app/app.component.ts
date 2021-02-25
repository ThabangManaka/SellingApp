import { AuthService } from './service/auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from  "@angular/fire/auth";
import { SecureStorageService } from './service/secure-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  showForce: boolean;

  userDetail: any;
  constructor(public authService: AuthService,
    private secureStorageService : SecureStorageService) {

     }

  async ngOnInit() {
  //  this.secureStorageService.get('user').then(res => {
  //   this.userDetail =res
  //   console.log(this.userDetail)
  //  })

  }

  onLogout() {
    this.authService.onLogout();
  }

  menuItemForce(): void {
    this.showForce = !this.showForce;
  }




}
