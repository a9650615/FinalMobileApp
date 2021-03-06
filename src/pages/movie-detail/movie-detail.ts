import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ToastController } from 'ionic-angular';
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
  public isStar: boolean = false;
  public isAdmin: boolean = false;
  public comments: any = [];
  public news: string = null;

  @ViewChild("summary") summaryEle: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public plt: Platform,
    public storage: Storage,
    public toastCtrl: ToastController,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.movie = this.navParams.get('data')
  }

  ionViewDidLoad() {
    if (this.plt.is('ios')) {
      this.viewCtrl.setBackButtonText('回到列表')
    }
    // get is admin
    this.storage.get('isAdmin').then((isAdmin) => {
      if (isAdmin) {
        this.isAdmin = isAdmin
      }
    })
    this.http.get(`${Urls.detail}/${this.movie.id}`)
      .subscribe((data: Movie) => {
        if (data) {
          Object.assign(this.movie, data)
          console.log(this.movie)
        }
      })
    this.http.get(`${Urls.photos}/${this.movie.id}`)
      .subscribe((data: any) => {
        this.images = data;
      })
    this.http.get(`${Urls.news}/${this.movie.id}`)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.news = data[0].content
        }
      })
    this.storage.get('lineID')
      .then((lineID) => {
        this.http.post(`${Urls.getReact}`, {
          lineID,
          movieID: this.movie.id
        })
          .subscribe((data: {like: boolean, comments: Array<any>}) => {
            this.isStar = data.like
            this.comments = data.comments
          })
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
          if (this.isStar) {
            this.http.post(Urls.unstar, {
              lineID,
              movieName: this.movie.title,
              movieID: this.movie.id
            }).subscribe((data: {status: string}) => {
              if (data.status === 'success') {
                this.isStar = false;
                this.storage.set('update', true)
              }
            })
          } else {
            this.http.post(Urls.star, {
              lineID,
              movieName: this.movie.title,
              movieID: this.movie.id
            }).subscribe((data: {status: string}) => {
              if (data.status === 'success') {
                this.isStar = true;
                this.storage.set('update', true)
              }
            })
          }
        }
      })
  }

  updateComment = () => {
    this.storage.get('lineID')
      .then((lineID) => {
        this.http.post(`${Urls.getReact}`, {
          lineID,
          movieID: this.movie.id
        })
          .subscribe((data: {like: boolean, comments: Array<any>}) => {
            this.isStar = data.like
            this.comments = data.comments
          })
      })
  }

  createNews() {
    this.storage.get('lineID')
      .then((lineID) => {
        this.http.post(Urls.news, {
          lineID,
          news: this.news,
          movieID: this.movie.id,
        })
          .subscribe((data: any) => {
            if (data.status === 'success') {
              this.presentToast(data.data)
            } else {
              this.presentToast(`發生錯誤`)
            }
          })
      })
  }

  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
    });
  
    toast.present();
  }

}
