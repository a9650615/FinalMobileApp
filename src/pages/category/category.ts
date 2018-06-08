import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MovieDetailPage } from '../movie-detail/movie-detail';
import Urls from '../../assets/urls';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  public movie_list: any = [];
  public detailPage: any = MovieDetailPage;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public storage: Storage
  ) {

  }

  ngOnInit() {
    this.storage.get('lineID')
      .then((lineID) => {
        console.log(lineID)
        this.http.get(`${Urls.favorite}/${lineID}`)
          .subscribe((data) => {
            this.movie_list = data;
          })
      })
  }

  doRefresh(refresher) {
    this.storage.get('lineID')
      .then((lineID) => {
        console.log(lineID)
        this.http.get(`${Urls.favorite}/${lineID}`)
          .subscribe((data) => {
            this.movie_list = data;
            refresher.complete();
          })
      })
  }

}
