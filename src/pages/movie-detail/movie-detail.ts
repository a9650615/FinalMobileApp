import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AddCommentPage } from '../add-comment/add-comment';
import { Storage } from '@ionic/storage';
import Urls from '../../assets/urls';

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Movie {
  title: string,
  id: string,
  img: string,
  long?: string,
  good?: number
};

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  public movie: Movie = {
    title: '',
    id: '',
    img: null,
    long: '',
    good: 0
  };
  public showFullContent: boolean = false;
  public showMore: boolean = false;
  public rate: any;
  public commentPage: any = AddCommentPage;
  public images: any = [];

  @ViewChild("summary") summaryEle: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public plt: Platform,
    public storage: Storage,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.movie = this.navParams.get('data')
  }

  ionViewDidLoad() {
    if (this.plt.is('ios')) {
      this.viewCtrl.setBackButtonText('回到列表')
    }
    this.http.get(`${Urls.detail}/${this.movie.id}`)
      .subscribe((data: Movie) => {
        Object.assign(this.movie, data)
        console.log(this.movie)
      })
    this.http.get(`${Urls.photos}/${this.movie.id}`)
      .subscribe((data) => {
        this.images = data;
      })
  }

  ngAfterViewChecked() {
    if (this.summaryEle.nativeElement.clientHeight > 120) {
      this.showMore = true;
    }
  }

  starMovie() {
    this.storage.get('lineID')
      .then((lineID) => {
        if (lineID) {
          console.log(lineID)
          // this.http.post(Urls.star, {
          //   lineId: 
          // }).subscribe((data) => {
      
          // })
        }
      })
  }

}
