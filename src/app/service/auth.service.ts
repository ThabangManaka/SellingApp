import { Login } from './../ILogin';
import { Register } from '../IRegister';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router : Router) { }


    async login(login : Login) {
      var result = await this.afAuth.signInWithEmailAndPassword(login.email,login.password).then(res =>{
        console.log(res)
        this.router.navigateByUrl('/tabs/tab1');

      }).catch(res => {
        console.log(res);
      });

    }
    register(user :Register, password: string) {

      this.afAuth.createUserWithEmailAndPassword(user.email,password).then(res => {


        this.addUser(res.user.uid, user)

          // Logout user
        this.afAuth.signOut();

        this.router.navigateByUrl('login')
      })

   }
   addUser(uid: string, data: Register) {
    this.firestore.doc("users/"+uid).set(data);
  }

}
