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
  categories$;
  categories: any;
  showForce: boolean;

  userDetail: any;
  constructor(public authService: AuthService,private afAuth: AngularFireAuth,
     private categoryService: CategoryService,
    private loadingController: LoadingController,
    private secureStorageService : SecureStorageService) {
    //   this.afAuth.authState.subscribe(user => {
    //     if (user) {
    //  this.user = user;


    //  this.authService.getbyUserId(user.uid).subscribe(res => {
    //      this.userDetail =  res;
    //  })
    //     }
    //   })
     }

  async ngOnInit() {

  }

  onLogout() {
    this.authService.onLogout();
  }

  menuItemForce(): void {
    this.showForce = !this.showForce;
  }


}
