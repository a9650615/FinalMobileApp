import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { LoadingController } from 'ionic-angular';
import Urls from '../../assets/urls';

/**
 * Generated class for the AddCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-comment',
  templateUrl: 'add-comment.html',
})
export class AddCommentPage {

  public comment: string;
  private loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }

  publish() {
    const movie = this.navParams.get('data');
    this.loader = this.loadingCtrl.create({
      content: "新增評論中",
      duration: 500
    });
    this.storage.get('lineID').then((lineID) => {
      this.http.post(Urls.comment, {
        lineID,
        movieID: movie.id,
        comment: this.comment
      })
      .subscribe(() => {
        this.loader.present()
        this.navCtrl.pop()
      })
      this.navParams.get('update')()
    })
  }
}
