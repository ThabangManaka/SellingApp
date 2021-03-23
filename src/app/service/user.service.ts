import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore,) { }


  getUserbyId(id){
  return  this.firestore.collection('users').doc(id).snapshotChanges().pipe(
      map(action=> {
       let obj:any = action.payload.data();
       console.log( obj)
       const id = action.payload.id;


       return { id, ... obj };
      })
    )

  }
}


