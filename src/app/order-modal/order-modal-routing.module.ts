import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderModalPage } from './order-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderModalPageRoutingModule {}
