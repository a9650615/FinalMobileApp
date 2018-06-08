import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import Urls from '../../assets/urls';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  public isLogin: boolean = true;
  public input = {
    lineID: null,
    name: null,
    account: null,
    password: null,
  };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  toggleLoginRegister(e) {
    this.isLogin = !this.isLogin;
  }

  async sendData() {
    if (this.isLogin) {
      this.http.post(Urls.login, this.input)
        .subscribe(({status, data}: { status: string, data: any }) => {
          if (status == 'failure') {
            this.createToast(data)
          } else {
            this.createToast('登入成功！')
            this.storage.set('userId', data.ID);
            this.storage.set('lineID', data.lineID);
            this.storage.set('isAdmin', data.isAdmin);
            this.storage.set('name', data.name);
            this.navCtrl.setRoot(TabsPage)
          }
        })
    } else {
      if (this.input.lineID) {
        this.input.lineID = atob(this.input.lineID)
        // decode line id
      }
      this.http.post(Urls.register, this.input)
        .subscribe(({status, data}: { status: string, data: any }) => {
          if (status == 'failure') {
            this.createToast(data)
          } else {
            this.createToast('註冊成功！')
          }
        })
    }
  }

  createToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
    });
  
    toast.present();
  }

}
