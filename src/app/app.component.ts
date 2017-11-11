import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { NoticeComponent } from "../components/notice/notice";

import { EvtProvider } from "../providers/evt/evt";
import { AppProvider } from "../providers/app/app";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  text?: string = "";
  show?: boolean = false;
  noLink?: boolean = true;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
    , public app: AppProvider
    , public evt: EvtProvider,
      private loading: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];
  }

  ngOnInit() {
    if (!this.evt.hasUserContext()) {
      return;
    }
    let self = this;
    let loading = self.loading.create({
      spinner: 'crescent',
      content: `Checking your progress...`,
      enableBackdropDismiss: true
    })
    loading.present();
    this.app.initCourses().then(()=> {
      loading.dismiss();
      this.nav.push("AuraMainPage");
    })
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
      if(JSON.parse(localStorage.getItem("isAnon"))){
        this.show = true;
        this.text = 'Sign in to track your progress.';
        this.noLink = true;
      }
    }


  }
  initializeApp() {
    let self = this;
    self.platform.ready().then(() => {
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
