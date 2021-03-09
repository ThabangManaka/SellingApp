import { Product } from './../IProduct';

import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { Sale } from '../ISale';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  query: any;

  private dbPath = '/request';
  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private loadingController: LoadingController,
) {
  // this.requestRef = firestore.collection(this.dbPath);
 }


  async requestProduct(payload : Product){
    console.log(payload)
   return this.firestore.collection('request/').add(payload);

  }

 getProducts(categoryName):Observable<Product[]>{

 return this.db.list('/products', ref => ref.orderByChild("category")
 .equalTo(categoryName)).snapshotChanges()
 .pipe(map(actions => actions.map(a => {

  const key = a.payload.key;
  let obj:any = a.payload.val()

  return {key, ...obj};
 })
 ));
  }


  getMessage(email):Observable<Product[]>{

    return this.db.list('/products', ref => ref.orderByChild("sellerEmail")
    .equalTo(email)).snapshotChanges()
    .pipe(map(actions => actions.map(a => {

     const key = a.payload.key;
     let obj:any = a.payload.val()

     return {key, ...obj};
    })
    ));
     }


  getProductById(id) {
   console.log(id)
   return this.db.object('/products/'+ id).valueChanges();

  }

  searchproduct(Name) {

    return this.db.list('/products', ref => ref.orderByChild("name")
    .equalTo(Name.toLowerCase())||(ref.orderByChild("location")
    .equalTo(Name.toLowerCase()))).snapshotChanges()
    .pipe(map(actions => actions.map(a => {

     const key = a.payload.key;

     let obj:any = a.payload.val()

     return {key, ...obj};
    })
    ));

    }

    saleProduct() : Observable<Sale[]> {
        return this.firestore.collection('Sale/').snapshotChanges().pipe(map( actions => actions.map(a => {
          let obj:any= a.payload.doc.data();
    const id = a.payload.doc.id;

    return {id, ...obj};
  }))
  );
}

 }

//  getProductByIds(key){

//   var docRef = this.firestore.collection('products').ref;

//   return docRef.where('category', '==', key).get();
// }



