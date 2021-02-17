import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  id;
 products$;
 products: any;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,) { }

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

 })
  }

}
