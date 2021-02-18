import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  categories$;
  categories: any;
  constructor(private categoryService : CategoryService,
    private loadingController: LoadingController,) { }

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

}
