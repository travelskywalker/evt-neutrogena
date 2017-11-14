import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuraMainPage } from "../aura-main/aura-main";
import { LoginPage } from "../login/login";
import { AgeGatePage } from '../age-gate/age-gate';
import { AuthService } from "../../providers/auth/auth.service";
import { AppProvider } from "../../providers/app/app";
import { EvtProvider } from "../../providers/evt/evt";
import { Config } from '../../config/environment.dev';
declare var EVT: any;
/**
 * This is the catch-all page. All paths are checked here first.
 * The access_token and id_token variables are stored in localstorage
 * for processing.
 *
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  isNotLoggedIn: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: AppProvider,
    private auth0: AuthService,
    public loader: LoadingController,
    public evt: EvtProvider) {
  }
  ionViewDidLoad() { }
  ngOnInit() {
    let data = this.navParams.get('data');
    if (data === "") {
      //experience starts with SCAN page (HomePage)
      this.navCtrl.setRoot(HomePage);

    } else if (this.URLToArray(data).hasOwnProperty('thng')) {
      let load = this.loader.create({
        spinner: 'crescent',
        dismissOnPageChange: true,
        showBackdrop: true,
        content: `Please wait...`,
        enableBackdropDismiss: true
      });
      load.present();
      if (localStorage.getItem('access_token') && localStorage.getItem('id_token')) {
        this.isNotLoggedIn = false;
      }
      if (this.isNotLoggedIn) {
        let queryObject = this.URLToArray(data);
        setTimeout(() => {
        this.evt.evtapp.$init.then(app => {
          console.log(app);
          app.appUser().create({
            anonymous: true
          }).then((anonymousUser) => {
            // Returns a ready to use User Scope that doesn't need validation
            console.log(`Created anonymous user: ${anonymousUser}`);

            // Store anonymous user details locally
            if (window.localStorage) {
              localStorage.userId = anonymousUser.id;
              localStorage.apiKey = anonymousUser.apiKey;
            }
            // Load the user from localstorage
            const user = new EVT.User({
              id: localStorage.userId,
              apiKey: localStorage.apiKey
            }, app);

            anonymousUser.thng(queryObject["thng"]).read().then((thng) => {
              if (this.isNotLoggedIn) {
                localStorage.isAnon = true;
                localStorage.evrythngInfo = '{"anonymousUser":"' + this.isNotLoggedIn + '","evrythngUser":"' + localStorage.userId + '","evrythngApiKey":"' + localStorage.apiKey + '"}';
                // console.log("set userContext");
              } else {
                localStorage.isAnon = true;
              }

              load.data.enableBackdropDismiss = false;

              thng.action("scans").create().catch(err => console.error(err));
              user.update({ customFields: { myThng: thng.id } }).then(console.log);
              this.gotoNexPage();
              localStorage.setItem('myThng', JSON.stringify(thng));
            });

          });


        });
    }, 2000);
  }else{

      this.gotoNexPage();
  }







    } else {
      let authData = this.URLToArray(data);
      //console.log(authData);
      this.auth0.result(authData).then(res => {
        console.log(res);

        this.app.completeReg(res);
        this.app.completeLogin(); //if login() is called

        if (this.app.getThngContext()) {
          /**
           * has THNG in localStorage
           */
          this.navCtrl.setRoot(AuraMainPage);
        } else {
          /**
           * Lead User to re-scan
           */
          this.navCtrl.setRoot(HomePage);
        }

      }).catch(err => {
        console.log(err);
        //GO TO ERROR PAGE
      })
    }
  }

  URLToArray(url: string) {
    var request = {};
    var pairs = url.split('&');
    for (var i = 0; i < pairs.length; i++) {
      if (!pairs[i])
        continue;
      var pair = pairs[i].split('=');
      request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return request;
  }

  gotoNexPage() {
    /*check if age gate*/
    if (this.app.isValidAge()) this.navCtrl.setRoot(AuraMainPage);
    else this.navCtrl.setRoot(AgeGatePage);

  }

}
