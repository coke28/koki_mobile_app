import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, IonModal, LoadingController, NavController, ToastController } from '@ionic/angular';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  batch_id:string = '';
  harvest_date:string = '';
  building:string = '';
  product:string = '';
  current_stock:string = '';
  total_stock:string = '';

  constructor(private barcodeScanner: BarcodeScanner, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public api: RestService,) {
    this.scan();
  }

  async scan(){
    this.barcodeScanner.scan().then(async (barcodeData: any) => {
      if(barcodeData.text.length <= 0){
        this.presentAlert("Invalid Barcode.")
      }else{
        let loading = await this.loadingCtrl.create({
          spinner: 'circular',
          // cssClass: 'solaneLoading',
          // content: `<img src="assets/img/solaneLoading.gif" />`
        });
        loading.present();
        let action: any = 'get-barcode';
        let data = new FormData();
        data.append('data', barcodeData.text);
        this.api.post1(action, data).subscribe((res: any) => {
          try {
            if (res['success'] == true) {
              loading.dismiss();
              this.batch_id = res.data[0].id;
              this.harvest_date = res.data[0].harvest_date;
              this.building = res.data[0].building_name;
              this.product = res.data[0].product_name;
              this.current_stock = res.data[0].quantity_out;
              this.total_stock = res.data[0].quantity;
            } else {
              loading.dismiss();
              this.presentAlert(res['res']);
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
     }).catch(err => {
         console.log('Error', err);
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
  
}
