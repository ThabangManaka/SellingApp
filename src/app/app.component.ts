import { AuthService } from './service/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';


import { Router } from '@angular/router';
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
export class AppComponent implements OnInit,  AfterViewInit {

  showForce: boolean;

  userDetail: any;
  constructor(  private router: Router,
    private platform: Platform,
    public authService: AuthService,
    private secureStorageService : SecureStorageService) {
     //this.initializeApp();
     }

  async ngOnInit() {
  //  this.secureStorageService.get('user').then(res => {
  //   this.userDetail =res
  //   console.log(this.userDetail)
  //  })

  }

  async ngAfterViewInit() {
    this.secureStorageService.get('user').then(res => {
      this.userDetail =res
      console.log(this.userDetail)
     })

  }

  onLogout() {
    this.authService.onLogout();
  }

  menuItemForce(): void {
    this.showForce = !this.showForce;
  }

//  initializeApp() {
//     this.platform.ready().then(() => {



//       this.authService.authState.subscribe(state => {
//         if (state) {
//           this.router.navigate(['tabs/tab1']);
//         } else {
//           this.router.navigate(['login']);
//         }
//       });

//     });
//   }


}
