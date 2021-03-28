import { EditProfilePage } from './../../../edit-profile/edit-profile.page';
import { SellerProfilePage } from './seller-profile/seller-profile.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductViewPageRoutingModule } from './product-view-routing.module';

import { ProductViewPage } from './product-view.page';
import { SellerProfilePageModule } from './seller-profile/seller-profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductViewPageRoutingModule,
    SellerProfilePageModule
  ],
  declarations: [ProductViewPage],
  entryComponents: [
    SellerProfilePage
    ],
    exports: [
      SellerProfilePage,
    ]
})
export class ProductViewPageModule {}
