import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductsPageRoutingModule } from './add-products-routing.module';

import { AddProductsPage } from './add-products.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddProductsPage]
})
export class AddProductsPageModule {}
