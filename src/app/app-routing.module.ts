import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { AuthsGuard } from './AuthGuard/auths.guard';

const routes: Routes = [
  //PLEASE DON"T CHANGE ANYTHING HERE
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),

  },

  {
    path: 'tabs/tab1',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
     canActivate : [AuthGuard]

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },

  // {
  //   path: 'advert',
  //   loadChildren: () => import('./advert/advert.module').then( m => m.AdvertPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  // },


  // {
  //   path: 'category',
  //   loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  // },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
