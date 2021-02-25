import { Login } from './../ILogin';
import { Register } from '../IRegister';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorageService } from './secure-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router : Router,
    private secureStorageService :SecureStorageService) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.firestore.collection('users').doc(user.uid).valueChanges().subscribe(res=> {
            this.secureStorageService.set('user',res);
          })
        //  localStorage.setItem('user',JSON.stringify(this.user));
             }else {
              this.secureStorageService.set('user',null);
             }

      })
    }


    async login(login : Login) {
      var result = await this.afAuth.signInWithEmailAndPassword(login.email,login.password).then(res =>{
        console.log(res.user);

        this.router.navigateByUrl('tabs/tab1');

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
    this.afAuth.signOut();
    //localStorage.removeItem('user');
    this.secureStorageService.remove('user');
    this.router.navigate(['login']);
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
    return  user  !==  null;
  }


   get currentUser(): any {
    const user =  this.secureStorageService.get('user');
    return  user;
  }



}
