import { Product } from './../../IProduct';
import { ProductService } from './../../service/product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSearchbar, LoadingController } from '@ionic/angular';

import { Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy{

  @ViewChild('search',{static: false}) search: IonSearchbar;
  id;
 products$;
 products: Product[];
 filteredProducts: any[];
 subscription: Subscription;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,private loadingController: LoadingController) { }

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Loading..',
      animated: true,
      spinner: "circles",
      backdropDismiss: false,
      duration: 2000,
      showBackdrop: true
  });
  loader.present().then();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

   this.productService.getProducts(this.id).subscribe(res=> {
     console.log(res)
    this.products = res
    loader.dismiss().then();

 }),

   this.subscription =this.productService.getProducts(this.id).subscribe(products=>this.filteredProducts = this.products =products);
  }

   ionViewDidEnter() {
     setTimeout(() => {
       this.search.setFocus()
     })
   }
  searchproducts(event) {
   const val = event.target.value;
   console.log(val)
    this.filteredProducts = (val) ? this.products.filter(p => p.name.toLowerCase().includes(val.toLowerCase())) : this.products;
  }

  searchproduct(event) {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
