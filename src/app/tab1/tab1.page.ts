import { Router } from '@angular/router';

import { CategoryService } from './../service/category.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  categories$;
  categories: any;
  saleProduct: any;
  sliderConfig = {
  spaceBetween: 10,
 slidesPerView: 1.6,
 centeredSlides: true
  }
  constructor(private categoryService : CategoryService,
    private productService: ProductService,
    private loadingController: LoadingController,
    private router : Router) {

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
  this.categories$= this.categoryService.getCategoriesLimit().subscribe(x => {
    this.categories = x
      loader.dismiss().then();

   });

   this.productService.saleProduct().subscribe(x => {

      this.saleProduct = x

   })

  }

}
