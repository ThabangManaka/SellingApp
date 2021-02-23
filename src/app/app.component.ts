import { AuthService } from './service/auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  categories$;
  categories: any;
  showForce: boolean;

  constructor(private authService: AuthService, private categoryService: CategoryService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Please Wait..',
      animated: true,
      spinner: "circles",
      backdropDismiss: false,
      showBackdrop: true
    });
    await loader.present().then();
    this.categories$ = this.categoryService.getCategories().subscribe(x => {
      this.categories = x
      loader.dismiss().then();

    });
  }

  onLogout() {
    this.authService.onLogout();
  }

  menuItemForce(): void {
    this.showForce = !this.showForce;
  }
}
