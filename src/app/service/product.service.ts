
import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  query: any;
  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore,) { }

  addProduct(product){

    return this.db.list('/products').push(product);
  }

  getProducts(categoryName){

  // //return this.db.list('/products').o.valueChanges().subscribe( x => {
  //    console.log(x)
  // });

 return this.db.list('/products', ref => ref.orderByChild("category").equalTo(categoryName)).valueChanges();
  }
}
