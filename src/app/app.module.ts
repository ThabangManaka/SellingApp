
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CurrencyPipe } from '@angular/common';
import { StarRatingModule } from  'ionic5-star-rating';
import { SecureStorageService } from './service/secure-storage.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
   StarRatingModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, AngularFireStorageModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ImagePicker,CallNumber,SMS,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SecureStorageService,CurrencyPipe, DatePipe ],

  bootstrap: [AppComponent],
})
export class AppModule {}
