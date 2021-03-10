import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Message } from '../model/IMessage';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore) { }



 getMessage(SellerEmail):Observable<Message[]>{

  return this.db.list('/messags', ref => ref.orderByChild("email")
  .equalTo(SellerEmail)).snapshotChanges()
  .pipe(map(actions => actions.map(a => {

   const key = a.payload.key;
   let obj:any = a.payload.val()

   return {key, ...obj};
  })
  ));
   }
}
