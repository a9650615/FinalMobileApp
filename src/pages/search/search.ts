import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MovieDetailPage } from '../movie-detail/movie-detail';
import Urls from '../../assets/urls';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public myInput:any;
  public movieList:any = [];
  public detailPage: any = MovieDetailPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput(e) {
  }

  onCancel(e) {
    this.movieList = []
  }

  search(value) {
    this.http.get(`${Urls.search}/${value}`)
      .subscribe((data) => {
        this.movieList = data
      })
  }

}
