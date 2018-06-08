import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginRegisterPage } from '../pages/login-register/login-register';
import { AddCommentPage } from '../pages/add-comment/add-comment';
import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { SearchPage } from '../pages/search/search';
import { CategoryPage } from '../pages/category/category';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

/* modules  */
import { MovieDetailPageModule } from '../pages/movie-detail/movie-detail.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp,
    LoginRegisterPage,
    MovieDetailPage,
    AddCommentPage,
    SearchPage,
    CategoryPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicImageViewerModule,
    Ionic2RatingModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginRegisterPage,
    MovieDetailPage,
    AddCommentPage,
    SearchPage,
    CategoryPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
