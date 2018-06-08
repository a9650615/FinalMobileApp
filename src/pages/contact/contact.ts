import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginRegisterPage } from '../login-register/login-register'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public options: Array<{id: number, text: string}> = [
    {id: 9, text: '登出'}
  ];
  public userName: string = '';
  public isAdmin: boolean = false;
  public account: string = '';

  constructor(
    public navCtrl: NavController,
    public app: App,
    public storage: Storage
  ) {
    
  }

  async ionViewDidLoad() {
    const userName = await this.storage.get('name');
    this.userName = userName;
    this.isAdmin = await this.storage.get('isAdmin');
  }

  selectOption(selectItem) {
    switch (selectItem) {
      case 9:
        this.storage.remove('userId')
        this.storage.remove('lineID')
        this.storage.remove('isAdmin')
        this.storage.remove('name')
        this.app.getRootNav().setRoot(LoginRegisterPage);
        ;break
    }
  }

}
