import { Component, OnInit,ViewChild  } from '@angular/core';
import { LoginCredential } from '../login-credential';
import { JsonPipe, Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import {
  NavController,
  LoadingController,
  AlertController,
  ToastController,
  MenuController,
} from '@ionic/angular';
import { RestService } from '../rest.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  buildings: any[] = [];
  products: any[] = [];
  building: string = '';
  product: string = '';
  product_quantity:string = '';
  // today = new Date();
  selectedDate: string;
  username:string = "";
  isButtonDisabled: boolean = false;
  @ViewChild('batchForm')
  batchForm!: NgForm;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private menu: MenuController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public api: RestService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.selectedDate = new Date().toISOString();
  }
  ngOnInit() {
    this.getBatchOptions();
    this.activatedRoute.queryParams.subscribe(params => {
      // The nullish coalescing operator (??) enables us to specify a fallback for when a value is null or undefined.
      this.username = this.activatedRoute.snapshot.queryParamMap.get('username') ?? '';
   });
  }
  async addBatch() {
    // this.phone.markAsTouched();
    // this.password.markAsTouched();
    // if(this.formgroup.valid){
    // console.log('OK');
    // if(this.username){
      let loading = await this.loadingCtrl.create({
        spinner: 'circular',
        // cssClass: 'solaneLoading',
        // content: `<img src="assets/img/solaneLoading.gif" />`
      });
      loading.present();
      let action: any = 'add-batch';
      let data = new FormData();
      let userData = localStorage.getItem("userData");
      let json = JSON.parse(userData|| '{}');
      data.append('selectedDate', this.selectedDate);
      data.append('username', json.username);
      data.append('building', this.building);
      data.append('product', this.product);
      data.append('product_quantity', this.product_quantity);
      this.api.post1(action, data).subscribe((res: any) => {
        loading.dismiss();
        try {
          if (res['success'] == true) {
            // this.presentAlert(res['res']);
            this.presentToast(res['res']);
            console.log(res);
            //setup session data
           
      
          } else {
            // if(res['data'] == 'OTPSENT'){
            //   this.step = 2;
            // }
            console.log(res);
            // this.presentAlert(res['res']);
            this.presentToast(res['res']);
  
            // if(res['data'] == 'DONOTMATCH'){
            //   console.log('Mobile number and Password do not match.');
            //   this.presentToast('Mobile number and Password do not match.');
            // } else if(res['data'] == 'OTPSENT'){
            //   this.step = 2;
            //   console.log('Mobile number and Password do not match.');
            //   this.presentToast('Mobile number and Password do not match.');
            // } else if(res['data'] == 'NOTEXIST'){
            //   console.log('Mobile number not registered.');
            //   this.presentToast('Mobile number not registered.');
            // }
          }
        } catch (error) {
          console.log(error);
          loading.dismiss();
          console.log('Failed to get response from the server.');
          this.presentToast(
            'Failed to connect to server. Please try again later.'
          );
        }
      });
    // }else{
    //   this.presentToast(
    //     'User is not logged in.'
    //   );

    // }
    
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
          for (let building of res.buildings) {
            this.buildings.push(building);
          }
          for (let product of res.products) {
            this.products.push(product);
          }

          // this.notificationLogin(res.data.id);

          // let navigationExtras: NavigationExtras = {
          //   queryParams: {
          //     mobileNumber: this.loginCredential.mobileNumber,
          //   },
          // };
          // this.navCtrl.navigateForward('tabs/tab1', navigationExtras);
          // (res: any) => {};
          // window.location.href ="/tabs/tab1";

          //GO PUSH TO DASHBOARD or FIRST page
          // if(res['data']['default_address_id']){
          //   //GO PUSH TO PICKADDRESS

          // } else {
          //   //GO PUSH FIRST page
          //   this.app.getRootNav().setRoot(FirstPage);
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
  async presentAlert(message: any) {
    let alert = await this.alertCtrl.create({
      // title: 'Low battery',
      message: message,
      buttons: ['Okay, I understand!'],
    });
    alert.present();
  }

  async presentToast(response: any) {
    let toast = await this.toastCtrl.create({
      message: response,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  onProductQuantityChange(event: any) {
    var newValue = event.detail.value;
    
    // Perform any additional logic or actions based on the new value
    if (newValue % 1 === 0 && newValue > 0) {
      console.log('Is an integer:', newValue);
      
    }else{
      console.log('Not an integer:', newValue);
      this.batchForm.control.setErrors({
        customError: true,
        // Additional error properties as needed
      });
    }
    

  }

  goBack() {
    console.log('goingback');
    this.location.back();
  }
}
