import { Component, ViewChild } from '@angular/core';
import { JsonPipe, Location } from '@angular/common';
import { AlertController, IonModal, LoadingController, NavController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Building, OrderDetail, Product } from '../order-details';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { ModalController } from '@ionic/angular';
import { OrderModalPage } from '../order-modal/order-modal.page';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  buildings!: Building[]; 
  products!: Product[];
  selectedDate: string;
  orders: OrderDetail[] = [];

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public api: RestService,
    private location: Location,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private batchService:BatchService) {
    {
      this.selectedDate = new Date().toISOString();
    }
  }
  ngOnInit() {
    this.getBatchOptions();

    
    this.orders = this.batchService.orders;
    // console.log(this.orders);
    // console.log(this.products);

    // this.buildings = this.batchService.buildings;

    // this.products = this.batchService.products;
   
    
  }

  removeProductFromCart(cartID:number){
    this.orders.forEach((element,index)=>{
      if(index==cartID) this.orders.splice(index,1);
   });
   console.log(this.orders);
   this.presentToast(
    'Item removed from order list.'
  );
  }

  checkIfOrdersIsEmpty(){
    if(this.orders.length > 0){
      return true;
    }else{
      return false;
    }
  }

  async processReceipt(){
    if(this.orders.length <= 0){
      this.presentAlert("Order is empty!. Please add orders before processing receipt")
    }else{
      let loading = await this.loadingCtrl.create({
        spinner: 'circular',
        // cssClass: 'solaneLoading',
        // content: `<img src="assets/img/solaneLoading.gif" />`
      });
      loading.present();
      let action: any = 'process-receipt';
      let data = new FormData();
      let userData = localStorage.getItem("userData");
      let json = JSON.parse(userData|| '{}');
      data.append('username', json.username);
      data.append('order_list', JSON.stringify(this.orders));
      this.api.post1(action, data).subscribe((res: any) => {
        try {
          if (res['success'] == true) {
            loading.dismiss();
            console.log(res);
            this.presentToast(res['res']);
  
           
  
          } else {
            loading.dismiss();
            this.presentAlert(res['res']);
            console.log(res);
            // this.presentToast(res['res']);
          }
        } catch (error) {
          loading.dismiss();
          console.log(error);
          this.presentToast(
            'Failed to connect to server. Please try again later.'
          );
        }
      });
      

    }
  }


  async getBatchOptions() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      // cssClass: 'solaneLoading',
      // content: `<img src="assets/img/solaneLoading.gif" />`
    });
    loading.present();
    let action: any = 'get-batch-options';
    let data = new FormData();
    this.api.post1(action, data).subscribe((res: any) => {
      try {
        if (res['success'] == true) {
          loading.dismiss();
          // this.presentAlert(res['res']);
          // for (let building of res.buildings) {
          //   this.buildings.push(building.building_name);
          // }
          // for (let product of res.products) {
          //   this.products.push(product.product_name);
          // }
          // console.log(res);
         
          // console.log(res.buildings);
          this.batchService.buildings = res.buildings;
          this.batchService.products = res.products;

          this.buildings = res.buildings;
          this.products = res.products;

          console.log(this.products);

          // console.log(this.batchService.buildings[0].id);

          // console.log(this.batchService.products);
          // console.log(this.batchService.buildings);
          // this.batchService.buildings = this.buildings;
          // console.log(this.batchService.products);
          

          // for (let buildingZ of res.buildings) {
          //   let building:Building = {
          //     id: buildingZ.id,
          //     building_name: buildingZ.building_name,
          //     building_description: buildingZ.building_description,
          //     remark: buildingZ.remark
          //   };
          //   this.buildings.push(building);
          // }
          
          // for (let productZ of res.products) {
          //   let product:Product = {
          //     id: productZ.id,
          //     product_name: productZ.product_name,
          //     product_description: productZ.product_description,
          //     product_code: productZ.product_code
          //   };
          //   // this.products.push(product);
          // }

        } else {
          // this.presentAlert(res['res']);
          // this.presentToast(res['res']);
        }
      } catch (error) {
        loading.dismiss();
        console.log(error);
        this.presentToast(
          'Failed to connect to server. Please try again later.'
        );
      }
    });
  }

  async presentToast(response: any) {
    let toast = await this.toastCtrl.create({
      message: response,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  async presentAlert(message:any) {
    let alert = await this.alertCtrl.create({
      // title: 'Low battery',
      message: message,
      buttons: ['OKay'],
    });
    alert.present();
  }
  goBack() {
    console.log('goingback');
    this.location.back();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: OrderModalPage
    });
  
    return await modal.present();
  }

  splitArray(string:string,return_index:number){
    let splitted_array = string.split("|");
    return splitted_array[return_index];

  }
}
