
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
  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private loadingController: LoadingController,
) { }

  async addProduct(product){

    return this.db.list('/products').push(product);
  }

 getProducts(categoryName){

 return this.db.list('/products', ref => ref.orderByChild("category")
 .equalTo(categoryName)).snapshotChanges()
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




