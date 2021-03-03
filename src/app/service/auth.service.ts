import { Login } from './../ILogin';
import { Register } from '../IRegister';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import  firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 all:Register;
  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router : Router) {
      this.afAuth.authState.subscribe(user => {
        console.log(user.uid)
      })
    }


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

  onLogout() {
    this.afAuth.signOut();
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

  userInfo()
  {
    firebase.auth().onAuthStateChanged((users) =>{
      if (users) {
    
        var userId = users.uid; 
        console.log("ID of user Logged in"+userId)
       firebase.database().ref('/users/' + userId).once("value").then( userProfile =>{
      this.all = new Register(userProfile.val().firstname,userProfile.val().lastname,userProfile.val().phone,userProfile.val().email)
       console.log(userProfile.val().email);
   
        })
       } else {
        console.log("user not logged in");
        
    }
    });
  }

}
