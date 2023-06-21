import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderModalPageRoutingModule } from './order-modal-routing.module';

import { OrderModalPage } from './order-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderModalPageRoutingModule
  ],
  declarations: [OrderModalPage]
})
export class OrderModalPageModule {}
