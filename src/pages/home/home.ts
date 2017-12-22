import { Component } from '@angular/core';

import { NavController,Platform, LoadingController } from 'ionic-angular';
import { EvtProvider} from '../../providers/evt/evt';
import { AuthService } from '../../providers/auth/auth.service';

import { Cookie } from 'ng2-cookies';
import { Config } from '../../config/environment';

import { AuraMainPage } from '../aura-main/aura-main';
import { AgeGatePage } from '../age-gate/age-gate';
import { AppProvider } from "../../providers/app/app";

import { Camera, CameraOptions } from "@ionic-native/camera";
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
  config: any = Config;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public evt: EvtProvider,
    public app: AppProvider,
    private auth0: AuthService,
    private loader: LoadingController,
    private camera: Camera
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
    console.log(this.platform.is('mobile'));
    this.mobileVersion = this.platform.is('mobile');

    if (this.platform.is('mobile')) {

      if (this.evt.hasUserContext()
        && (this.evt.hasLocalThng() || this.evt.hasLocalProduct() || typeof localStorage.loginStarted != 'undefined')
        && this.app.isValidAge()
      ) {
        //everything checks out goes to aura content
        this.navCtrl.setRoot(AuraMainPage);

      } else if (this.evt.hasUserContext()
        && (this.evt.hasLocalThng() || this.evt.hasLocalProduct() || typeof localStorage.loginStarted != 'undefined')
        && !this.app.isValidAge()
      ) {

        //has evt user and thng (or product) but no valid age, take it age gate
        if (this.navCtrl.last().component.name != 'AgeGatePage') {
          this.navCtrl.setRoot(AgeGatePage);
        }

      }

    }

  }

  takePic(){
    let opts : CameraOptions = {
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(opts).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log(imageData,base64Image);
    }, (err) => {
     // Handle error
     console.log(err);
    });
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

      let user = typeof res[0] != 'undefined' ? res[0].user : null;
      this.evt.setAnonUserContext(user, this.isNotLoggedIn);
      load.data.enableBackdropDismiss = false;
      if(typeof res === 'undefined' || res.length === 0) {

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

            // scan action, then update, _Activated action after scan have been moved to anon->reg user transition
            self.evt.createThngAction("scans", {}, true); //anon user context
            self.evt.updateMyThng(thng, true).then(()=>{ //anon user context
              self.gotoNexPage();
            }).catch(err=> {
              console.log(err);
              self.gotoNexPage();
            })
          })
          .catch(err=>{
              self.scanFailed = true;
              console.log(err,'thng error');
              load.dismiss();
          })

      } else if (typeof res[0].results[0].thng !== "undefined" && !this.isNotLoggedIn) {

        /* Scanned QR code. It is a thng */
        console.log("thing activated by logged in user");
        let thng = res[0].results[0].thng;

        self.scanFailed = false;
        // scan action, then update, _Activated action after scan have been moved to anon->reg user transition
        self.evt.createThngAction("scans"); //reg user context
        self.evt.updateMyThng(thng).then(()=>{ //reg user context

          load.dismiss();
          self.gotoNexPage();

        }).catch(err=> {

          console.log('scanthng error', err);
          load.dismiss();
          self.gotoNexPage();

        });


      } else if (typeof res[0].results[0].product !== "undefined") {

        console.log("image recognition");
        //Scanned via image recognition. it is a product

        //IF anon or registered user
        //register a scan to product
        //IF NOT THNG for user exist
        //THEN create a THNG, ELSE ignore
        //save the context to local storage

        //safe user context resolution
        let usrC = self.evt.getUserContext();
        if (this.isNotLoggedIn) {
          usrC = self.evt.getAnonUserContext();
        }

        let item = res[0].results[0].product;
        usrC.then(usr=>{

          usr.product(item.id).read().then(prod=>{

            self.scanFailed = false;
            prod.action("scans").create().catch(err=>console.error(err));
            self.evt.getUserCustomFields().then(cf=>{
              if(cf && typeof cf.myThng != 'undefined'){

                // Already has a THNG
                console.log('You already have a thng!');
                self.gotoNexPage();

              } else{

                // Create a THNG
                let thng = {
                  name: `User Thng - ${usr.id}`,
                  tags: ["Image Recognition"],
                  product: item.id
                };

                this.evt.createThng(thng).then(()=>{

                  self.gotoNexPage();

                }).catch(err=>{

                  console.log("Failed to create a thng", err);

                })

              }

            }).catch(err=>{

              console.log("custom fields context error", err);

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
      //save the thng or product to localStorage for later use
      this.app.saveThngContext(res);

    }).catch(err=>{

      self.scanFailed = true;
      self.evt.createUserAction("_NotRecognised", {}, true).then(() => {});

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
