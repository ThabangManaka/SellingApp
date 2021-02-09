import { CategoryService } from './../service/category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  categories$;
  categories: any;
  constructor(private categoryService : CategoryService) {
   this.categories$= categoryService.getCategories().subscribe(x => {
    this.categories = x
    console.log(this.categories)
   });
  }

}
