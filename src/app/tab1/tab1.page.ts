import { CategoryService } from './../service/category.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  categories$;
  categories: any;
  constructor(private categoryService : CategoryService,
    private loadingController: LoadingController,) {

  }


 async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Please Wait..',
      animated: true,
      spinner: "circles",
      backdropDismiss: false,
      showBackdrop: true
  });
  await loader.present().then();
  this.categories$= this.categoryService.getCategories().subscribe(x => {
    this.categories = x
      loader.dismiss().then();

   });
  }
  ionViewDidLoad() {

  }
}
