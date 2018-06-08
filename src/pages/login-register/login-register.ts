import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  toggleLoginRegister(e) {
    this.isLogin = !this.isLogin;
  }

  sendData() {
    this.http.post(Urls.register, this.input)
      .subscribe(({status, data}: { status: string, data: any }) => {
        if (status == 'failure') {
          this.createToast(data)
        } else {
          this.createToast('註冊成功！')
        }
      })
  }

  createToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
