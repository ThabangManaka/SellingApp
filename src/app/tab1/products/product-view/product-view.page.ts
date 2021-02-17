import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {
  id;
  products$;
  products: any;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

    this.productService.getProductById(this.id).subscribe(res=> {
      console.log(res)
     this.products = res
     //loader.dismiss().then();

  })
  }

}
