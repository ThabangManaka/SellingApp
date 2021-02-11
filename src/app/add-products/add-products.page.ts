import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {


  addProducts:any;
  public contactForm: FormGroup;
  constructor(private productService: ProductService,private _FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addProducts= this.productService.addProducts;
    this.contactForm = this._FormBuilder.group({
      productName :"",
    productPrice: "",
    productLocation:"",
    categoryName:"",
    productid : "",
    Img:""
    }),
    this.all
  }


  onSubmit() {
 
    this.productService.addProducts(this.contactForm.value);
    
 }
 all()
 {
  this.productService.getAllBags();
  console.log(this.productService.getAllBags())
 }

}
