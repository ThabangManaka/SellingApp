import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';
//import { IonicRatingModule } from 'ionic-rating-component';
import { StarRatingModule } from 'ionic5-star-rating';
import { CommentPage } from './comment.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    CommentPageRoutingModule
  ],
  declarations: [CommentPage]
})
export class CommentPageModule {}
