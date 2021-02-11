import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
email
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  forgot(){
    this.authService.forgotpassword(this.email);
  }
}
