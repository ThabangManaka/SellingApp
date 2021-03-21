import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertPageRoutingModule } from './advert-routing.module';

import { AdvertPage } from './advert.page';

import { RouterModule } from '@angular/router';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertPageRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
  ],
  declarations: [AdvertPage]
})
export class AdvertPageModule {}
