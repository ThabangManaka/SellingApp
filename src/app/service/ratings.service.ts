import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Rating } from '../model/IRating';
@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private firestore : AngularFirestore) { }

  addRating(payload: Rating){
    return this.firestore.collection('ratings/').add(payload);

  }

  getRatings() : Observable<Rating[]> {
    return this.firestore.collection('ratings/').snapshotChanges().pipe(map( actions => actions.map(a => {
      let obj:any= a.payload.doc.data();
  const id = a.payload.doc.id;

return {id, ...obj};
}))
);
}

}
