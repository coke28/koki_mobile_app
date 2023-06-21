import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor( 
    public navCtrl: NavController,
    public alertCtrl: AlertController,) {}

  logout(){
    
    this.showConfirm();
  }
  async showConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
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
