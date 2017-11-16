import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Config } from '../config/environment';
import { HomePage } from '../pages/home/home';

//import { NoticeComponent } from "../components/notice/notice";
//import { ReorderModalComponent } from "../components/reorder-modal/reorder-modal";

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
  ext_url?: any;

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
    if (!this.platform.is('mobile')) {
      //redirect to context switcher for mobile vs desktop
      this.nav.setRoot(HomePage);
      return;
    }
    if (!this.evt.hasUserContext()) {
      return;
    }
    let self = this;
    let loading = self.loading.create({
      spinner: 'crescent',
      content: `Please wait...`,
      enableBackdropDismiss: true
    })
    loading.present();
    this.app.initCourses().then(()=> {
      this.app.initProgArr().then(()=> {
        console.log("Last completed:" + this.app.getLastCompletedCourse());
        this.app.setActiveCourse(this.app.getLastCompletedCourse());
        this.app.completeLogin(); //if login() is called
        loading.dismiss();

        this.nav.setRoot("AuraMainPage");
      })
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
    if(this.app.hasSignInNotice()){
      this.show = true;
      this.text = 'Sign in to track your progress.';
      this.noLink = true;
    } else if (this.app.hasReorderNotice()) {
      this.show = true;
      this.text = 'Re-order your Neutrogena© Visibility Clear® Light Theraphy Acne Mask';
      this.noLink = false;
      this.ext_url = {
        name:'reorder',
        link: Config.ext_links.reorder
      };
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
      this.app.setBeginTS();
      console.log("EVT");

    });

  }
}
