import { Component } from '@angular/core';

import { NavController,Platform, LoadingController } from 'ionic-angular';
import { EvtProvider} from '../../providers/evt/evt';
import { AuthService } from '../../providers/auth/auth.service';

import { Cookie } from 'ng2-cookies';

import { LoginPage } from '../login/login';
import { AuraMainPage } from '../aura-main/aura-main';
import { AgeGatePage } from '../age-gate/age-gate';
import { AppProvider } from "../../providers/app/app";
/*
 *  This is the scan page. Where scanning happens.
 *
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mobileVersion : boolean;
	links: any = [];
  scanFailed : boolean = false;
  logos : any;
  noticeViewed : boolean;
  isNotLoggedIn: boolean = true;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public evt: EvtProvider,
    public app: AppProvider,
    private auth0: AuthService,
    private loader: LoadingController
  ) {
    this.isNotLoggedIn = !this.auth0.loggedIn();

  }

  ngOnInit(){
    console.log("from home");
    // if noticeViewed is true, the cookie policy notification will no longer be displayed
    if(Cookie.get('cookie_notice') && Cookie.get('cookie_notice') == '1'){
      this.noticeViewed = true;
    }
    else{
      Cookie.set('cookie_notice','1');
      this.noticeViewed = false;
    }

    this.mobileVersion = this.platform.is('mobile');
  }



  scan(){
    let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
    load.present();

    if(localStorage.getItem('access_token') && localStorage.getItem('id_token')){
        this.isNotLoggedIn = false;
    }

    this.evt.scan({

        createAnonymousUser: this.isNotLoggedIn

    }).then(res=>{

      console.log(res);
      /* set user context for anonymous user */

      this.evt.setAnonUserContext(res, this.isNotLoggedIn);
      load.data.enableBackdropDismiss = false;
      if(res.length === 0) {

        /* Scan failed. we should create a 'not recognized' action */
        console.log("not Found");
        self.scanFailed = true;

        self.evt.getUserContext().then(usr=>{
          usr.action("_NotRecognised").create().catch(err=>console.error(err));
          load.dismiss();
        })
        .catch(err=>{
          console.log(err);
          load.dismiss();
        })


      } else if(typeof res[0].results[0].thng !== "undefined" && this.isNotLoggedIn){

        console.log("anonymous user");
          /* Scanned QR code. It is a thng and anonymous user */
          let item = res[0].results[0].thng;
          let usr =  res[0].user;
          usr.thng(item.id).read().then(thng=>{

            self.scanFailed = false;

            //thng.action("scans").create().catch(err=>console.error(err));
            //thng.action("_Activated").create().then(console.log).catch(console.error);
            //usr.update({customFields:{myThng:thng.id}}).then(console.log);
            //TODO: Redirect to content page. Still in progress
            // self.navCtrl.setRoot(AuraMainPage);

            self.gotoNexPage();
          })
          .catch(err=>{
              self.scanFailed = true;
              console.log(err,'thng error');
              load.dismiss();
          })
      } else if (typeof res[0].results[0].thng !== "undefined" && !this.isNotLoggedIn) {
        /* Scanned QR code. It is a thng */
        console.log("thing activated by logged in user");
        let item = res[0].results[0].thng;
        self.evt.getUserContext().then(usr=>{

          usr.thng(item.id).read().then(thng=>{
            self.scanFailed = false;

            thng.action("scans").create().catch(err=>console.error(err));
            thng.action("_Activated").create().then(console.log).catch(console.error);
            usr.update({customFields:{myThng:thng.id}}).then(console.log);
            //TODO: Redirect to content page. Still in progress
            // self.navCtrl.setRoot(AuraMainPage);
            self.gotoNexPage();
          })
          .catch(err=>{
            self.scanFailed = true;
            console.log(err,'thng error')
            load.dismiss();
          })
        })
        .catch(err=>{
          console.log(err);
          load.dismiss();
        })
      } else if (typeof res[0].results[0].product !== "undefined") {
        console.log("image recognition");
        /* Scanned via image recognition. it is a product */

        let item = res[0].results[0].product;
        self.evt.getUserContext().then(usr=>{

          usr.product(item.id).read().then(prod=>{
            self.scanFailed = false;
            prod.action("scans").create().catch(err=>console.error(err));

            self.evt.getUserCustomFields().then(cf=>{
              if(cf){

                /* Already has a thng */
                console.log('You already have a thng!');
                self.gotoNexPage();

              } else{
                /* Create a thng */
                let thng = {
                  name: `User Thng - ${usr.id}`,
                  tags: ["Image Recognition"],
                  product: item.id
                }

                this.evt.createThng(thng).then(()=>{
                  self.gotoNexPage();
                }).catch(err=>{
                  console.log(err);
                  console.log("Failed to create a thng");
                })
              }
            }).catch(err=>{
              console.log(err);
              console.error("Failed to save");
            })
          })
          .catch(err=>{
            self.scanFailed = true;
            console.log(err,'prod error');
            load.dismiss();
          })
        })
        .catch(err=>{
          console.log(err);
          load.dismiss();
        })

      } // END OF SCAN PROCESS
      //save the thng to localStorage for later use
      this.app.saveThngContext(res);

    }).catch(err=>{
      self.scanFailed = true;
      console.log('scan failed',err);
      load.dismiss();
    });
  }

  gotoNexPage(){
    /*check if age gate*/
    if(this.app.isValidAge()) this.navCtrl.setRoot(AuraMainPage);
    else this.navCtrl.setRoot(AgeGatePage);

  }

}
