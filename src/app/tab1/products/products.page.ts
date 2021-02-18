import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common'
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  id;
 products$;
 products: any;
 formatedOutputValue: any;

 outputValue: string = '54781.7622000';
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private cp: CurrencyPipe) { }

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

 }),this.searchproduct,
 this.formatedOutputValue = this.cp.transform(this.outputValue, 'USD', 'symbol', '1.1');
  }



  searchproduct(query) { 
    this.productService.searchproduct(query).subscribe(searchedproducts => { 
      this.products = searchedproducts; 

      console.log(searchedproducts);
    })
  }

  

}
