import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Building, OrderDetail, Product } from '../order-details';
import { BatchService } from '../batch.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.page.html',
  styleUrls: ['./order-modal.page.scss'],
})
export class OrderModalPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public toastCtrl: ToastController,
    private batchService: BatchService
  ) {}
  buildings: Building[] = this.batchService.buildings;
  products: Product[] = this.batchService.products;
  building: string = '';
  product: string = '';
  product_quantity!: number;
  // selectedDate: string;
  username: string = '';
  orders: OrderDetail[] = [];

  ngOnInit() {}
  dismissModal() {
    this.modalController.dismiss();
  }

  addOrder(f: NgForm) {
    let order: OrderDetail = {
      product: this.product,
      building_detail: this.building,
      product_quantity: this.product_quantity,
      building_id: this.splitArray(this.building,0)

    };
    // this.orders.push(order);
    f.resetForm();
    this.batchService.orders.push(order);
    this.presentToast('Order added to cart');
   

    console.log(this.batchService.orders);
  }

  async presentToast(response: any) {
    let toast = await this.toastCtrl.create({
      message: response,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  splitArray(string:string,return_index:number){
    let splitted_array = string.split("|");
    return splitted_array[return_index];

  }
}
