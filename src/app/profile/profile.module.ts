import { EditProfilePage } from './../edit-profile/edit-profile.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { EditProfilePageModule } from '../edit-profile/edit-profile.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    EditProfilePageModule
  ],
  declarations: [ProfilePage],
  entryComponents: [
  EditProfilePage
  ]
})
export class ProfilePageModule {}
