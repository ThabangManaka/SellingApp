import { Injectable } from '@angular/core';
import {Product} from './product'
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }



  addProducts(prod:Product) {

   

    this.db.collection("Product").add({
    productName :prod.productName,
    productPrice: prod.productPrice,
    productLocation: prod. productLocation,
    categoryName: prod.categoryName,
    productid : prod.productid,
    Img:prod.Img
    })
    .then(function () {
      console.log("Document successfully written to firebase!");
    })
    .catch(function (error) {
      console.error("Error writing document: error");
    });
    }


    products:any
    getAllBags()
    {
      console.log(this.products)
      this.products= this.db.collection("Product").snapshotChanges();
      return this.products
     
    }
    
}
