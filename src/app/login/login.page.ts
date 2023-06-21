import { Component, OnInit } from '@angular/core';
import {
  NavController,
  LoadingController,
  AlertController,
  ToastController,
  MenuController,
} from '@ionic/angular';
import { RestService } from '../rest.service';
import { NavigationExtras } from '@angular/router';
import { LoginCredential } from '../login-credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye';
  // loginCredential = new login_credential();
  // username:string = "";
  // password:string = "";
  loginCredential = new LoginCredential();

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private menu: MenuController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public api: RestService
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);

    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
      console.log(this.passwordToggleIcon);
    } else {
      this.passwordToggleIcon = 'eye';
      console.log(this.passwordToggleIcon);
    }
  }

  // login(){
  //   console.log("here");
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       username: this.username,
  //     },
  //   };
  //   this.navCtrl.navigateForward('tabs/tab1', navigationExtras);
  // }

  async login() {
    // this.phone.markAsTouched();
    // this.password.markAsTouched();
    // if(this.formgroup.valid){
    // console.log('OK');
    let loading = await this.loadingCtrl.create({
      spinner: 'circular',
      // cssClass: 'solaneLoading',
      // content: `<img src="assets/img/solaneLoading.gif" />`
    });
    loading.present();
    let action: any = 'login';
    let data = new FormData();
    // let username: any = this.username;
    // console.log(username);
    data.append('username', this.loginCredential.username);
    data.append('password', this.loginCredential.password);
    this.api.post1(action, data).subscribe((res: any) => {
      loading.dismiss();
      console.log("This is the response");
      console.log(res);
      try {
        if (res['success'] == true) {
          // this.presentAlert(res['res']);
          this.presentToast(res['res']);
          //setup session data
          var dat = JSON.stringify(res['data']);
          var dat2 = JSON.stringify(res);
          localStorage.removeItem('loginData');
          localStorage.removeItem('running_order');
          localStorage.removeItem('userData');
          localStorage.setItem('loginData', dat);
          localStorage.setItem('running_order', res['running_order']);
          localStorage.setItem('userData', dat2);

          console.log(localStorage.getItem('notificationId'));
          // console.log(res.data.id);

          console.log('LOGGED IN');
          // this.notificationLogin(res.data.id);

          let navigationExtras: NavigationExtras = {
            queryParams: {
              username: this.loginCredential.username,
            },
          };
          this.navCtrl.navigateForward('tabs/tab1', navigationExtras);
          (res: any) => {};
          // window.location.href ="/tabs/tab1";

          //GO PUSH TO DASHBOARD or FIRST page
          // if(res['data']['default_address_id']){
          //   //GO PUSH TO PICKADDRESS

          // } else {
          //   //GO PUSH FIRST page
          //   this.app.getRootNav().setRoot(FirstPage);
          // }
        } else {
          // if(res['data'] == 'OTPSENT'){
          //   this.step = 2;
          // }
          console.log('Failed Login');
          this.presentAlert(res['res']);
          // this.presentToast(res['res']);

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
  }
  notificationLogin(user_id:any) {
    let notiID = localStorage.getItem('notificationId');
    console.log(notiID);

    let action: any = 'save-player-id';
    let data = new FormData();
    data.append('user_id', user_id);
    // data.append('player_id', notiID);
    this.api.post1(action, data).subscribe(
      (res: any) => {
        console.log(res);
        console.log('notification ID:' + notiID + res);
      },
      (error) => {
        // Error getting the data
        this.notificationLogin(user_id);
        console.log('Failed to get response from the server.');
      }
    );
  }

  async presentAlert(message:any) {
    let alert = await this.alertCtrl.create({
      // title: 'Low battery',
      message: message,
      buttons: ['OKay'],
    });
    alert.present();
  }

  async presentToast(response:any) {
    let toast = await this.toastCtrl.create({
      message: response,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
