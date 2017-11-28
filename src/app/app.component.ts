import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,MenuController} from 'ionic-angular';
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
    , public evt: EvtProvider,private menu: MenuController ) {
    this.checkThngExpiry();
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

    }
    this.app.initCourses();
  }
  ionViewDidEnter() {
      this.menu.swipeEnable(true);

      // If you have more than one side menu, use the id like below
      // this.menu.swipeEnable(false, 'menu1');
    }
  ngAfterViewInit(){

    this.nav.viewDidEnter.subscribe((data) => {


        if((data.component.name == 'AuraMainPage')||(data.component.name == 'AuraContentPage')){
          this.noticePopUp();
        }
     });
  }
  menuOpened(){
    try{
      this.menu.swipeEnable(false);
    }
    catch(error){
      this.menu.swipeEnable(false);
    }


  }
  menuClosed(){
    try{
        this.menu.swipeEnable(true);
    }
    catch(error){
        this.menu.swipeEnable(true);
    }


  }
  noticePopUp(){
    if(this.app.hasSignInNotice()){

      this.show = true;
      this.text = 'Sign in to track your progress.';
      this.noLink = false;

    } else if (this.app.hasReorderNotice()) {
      this.show = true;
      this.text = 'Re-order your NEUTROGENA© Visibility Clear® Light Therapy Acne Mask';
      this.noLink = false;
      this.ext_url = {
        name: Config.neutrogena_reorder_url.name,
        link: Config.neutrogena_reorder_url.link
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

  checkThngExpiry(){
    /* remove myThng if it has expired already */
    let curDate = new Date();
    let expDate = new Date(localStorage.localExpire);
    console.log(curDate >= expDate);
    if(curDate >= expDate){
      localStorage.removeItem('myThng');
      localStorage.removeItem('myProduct');
      localStorage.removeItem('localExpire');
    }
  }
}
