import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import Urls from '../../assets/urls';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shouldShowCancel = true
  private movie_list:any = []
  private loader:any

  constructor(
    public navCtrl: NavController, 
    private http: HttpClient,
    private loadingCtrl: LoadingController) {
      this.loader = this.loadingCtrl.create({
        content: "讀取列表中",
        duration: 500
      });
  }
  
  ngOnInit() {
    this.http.get(Urls.list)
      .subscribe((data) => {
        this.movie_list = data
        this.loader.present()
      })
  }

}
