import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { NoticeComponent } from "../components/notice/notice";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  text?: string = "";
  show?: boolean = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

    //this.evt.init();
  }
  ngAfterViewInit(){

    this.nav.viewDidEnter.subscribe((data) => {


        if((data.component.name == 'AuraMainPage')||(data.component.name == 'AuraContentPage')){
          this.noticePopUp();
        }
     });
  }

  noticePopUp(){
    if(typeof localStorage.getItem("isAnon") !== 'undefined'){
      if(localStorage.getItem("isAnon")){
        this.show = true;
        this.text = 'Sign in to track your progress.';
      }
    }


  }
  initializeApp() {
    let self = this;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //self.evt.init();
      console.log("EVT");
    });

    // if(this.platform.is('mobile')){
    //   this.rootPage = HomePage;
    // }
    // else{
    //   this.rootPage = '';
    // }

  }
}
