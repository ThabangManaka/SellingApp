import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfilePageModule } from '../edit-profile/edit-profile.module';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
