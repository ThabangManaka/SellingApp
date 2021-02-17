import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase,
    private loadingController: LoadingController, ) { }

  getCategories() {
    return this.db.list('/Category').valueChanges();
  }
}
