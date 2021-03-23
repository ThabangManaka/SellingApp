import { Injectable } from '@angular/core';
import { Login } from './../ILogin';
import { Register } from '../IRegister';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SecureStorageService } from './secure-storage.service';
import { BehaviorSubject } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { user } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private user : user;
  private dbPath = '/request';
  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router : Router,
    private platform: Platform,
    private secureStorageService :SecureStorageService) {
      this.afAuth.authState.subscribe(user => {
        if (user) {

         this.firestore.collection('users').doc(user.uid).snapshotChanges().pipe(
           map(action=> {
            let obj:any = action.payload.data();
            console.log( obj)
            const id = action.payload.id;


            return { id, ... obj };
           })
         )


        //  localStorage.setItem('user',JSON.stringify(this.user));
             }else {
             // this.secureStorageService.set('user',null);
             }
             // this.requestRef = firestore.collection(this.dbPath);

      })

    }

    async login(login : Login) {
      var result = await this.afAuth.signInWithEmailAndPassword(login.email,login.password).then(res =>{
        console.log(res.user);
     if (res.user) {

          this.firestore.collection('users').doc(res.user.uid).valueChanges().subscribe(res=> {

            this.secureStorageService.set('user',res).then(response => {
             this.router.navigateByUrl('tabs/tab1');

            });
             })

       }else {
              this.secureStorageService.set('user',null);
             }


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

  onLogout() {

      this.secureStorageService.remove('user').then(() =>{
        this.router.navigate(['login']);
      });
    this.afAuth.signOut();
    //localStorage.removeItem('user');


  }
  forgotpassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        this.router.navigate(["login"])
      }).catch((error) => {
        window.alert(error)
      });
  }
  get isLoggedIn(): boolean {
  const user =  this.secureStorageService.get('user');
    return  (user  !==  null)
  }


   get currentUser(): any {
    const user =  this.secureStorageService.get('user');
    return  user;
  }


  getProfile() {
    return this.firestore.collection('users/').snapshotChanges().pipe(map( actions => actions.map(a => {
      let obj:any= a.payload.doc.data();
const id = a.payload.doc.id;

return {id, ...obj};
}))
);
}

getProfileIds(email){

  var docRef = this.firestore.collection('users').ref;

  return docRef.where('email', '==', email).get()
}
getProfileId(email){
  return this.firestore.collection('users', ref => ref.where('email','==', email)).snapshotChanges().pipe(map(users => {
      const user = users[0];
      if (user) {
        let data:any = user.payload.doc.data()
        const id = user.payload.doc.id;
        return { id, ...data };
      }
      else {
        return null;
      }
    }));
}




    // updateRequest(id: string, product: Product): Promise<void> {

    //   console.log(id)
    //   return this.requestRef.doc(id).update(product);
    // }

}
