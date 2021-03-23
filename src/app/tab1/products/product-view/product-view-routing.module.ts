import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductViewPage } from './product-view.page';

const routes: Routes = [
  {
    path: '',
    component: ProductViewPage
  },
  {
    path: ':id',
    loadChildren: () => import('./seller-profile/seller-profile.module').then( m => m.SellerProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductViewPageRoutingModule {}
