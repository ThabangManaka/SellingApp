
import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';
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
 // const data = a.payload.val();
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

    // let val;
    // val=Name
    // if (val.trim() !== '') 
    //  {
      
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
  
  
  }