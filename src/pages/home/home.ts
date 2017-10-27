import { Component } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';
import { EvtProvider} from '../../providers/evt/evt';
import { AuthService } from '../../providers/auth/auth.service';

import { Cookie } from 'ng2-cookies';

import { LoginPage } from '../login/login';


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
  constructor(public platform: Platform,public navCtrl: NavController, public evt: EvtProvider, private auth0: AuthService) {
    this.auth0.setEVTInfo();

  }

  ngOnInit(){
    // console.log(this.navParams.data);

    if(Cookie.get('cookie_notice') && Cookie.get('cookie_notice') == '1'){
      this.noticeViewed = true;
    }
    else{
      Cookie.set('cookie_notice','1');
      this.noticeViewed = false;
    }
      if(!localStorage.access_token || !localStorage.id_token){
        this.navCtrl.setRoot(LoginPage);
      }
    // console.log(this.platform.is('mobile'));

    this.mobileVersion = this.platform.is('mobile');
  }

  scan(){
    let self = this;
    this.evt.scan().then(res=>{
      if(res.length === 0) {
        /* Scan failed. we should create a 'not recognized' action */

        console.log("not Found");
        self.scanFailed = true;
        self.evt.getUserContext().then(usr=>{
          usr.action("_NotRecognised").create().catch(err=>console.error(err));
        })
        .catch(err=>{
          console.log(err)
        })


      } else if (typeof res[0].results[0].thng !== "undefined") {
        /* Scanned QR code. It is a thng */

        let item = res[0].results[0].thng;
        self.evt.getUserContext().then(usr=>{

          usr.thng(item.id).read().then(thng=>{
            self.scanFailed = false;

            thng.action("scans").create().catch(err=>console.error(err));
            usr.update({customFields:{myThng:thng.id}}).then(console.log);
            //TODO: Redirect to content page. Still in progress
          })
          .catch(err=>{
            self.scanFailed = true;
            console.log(err,'thng error')
          })
        })
        .catch(err=>{
          console.log(err)
        })
      } else if (typeof res[0].results[0].product !== "undefined") {
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
                let thngId = cf.myThng;

              }else{
                /* Create a thng */
                let thng = {
                  name: `User Thng - ${usr.id}`,
                  tags: ["Image Recognition"],
                  product: item.id
                }
                usr.thng().create(thng).then(th=>{

                  /* Assign the newly created thng to the user */
                  usr.update({customFields:{myThng:th.id}}).then(console.log);
                })
                .catch(err=>{
                  console.log("Failed to create a thng");
                })
              }
            }).catch(err=>{
              console.error("Failed to save");
            })
          })
          .catch(err=>{
            self.scanFailed = true;
            console.log(err,'prod error')
          })
        })
        .catch(err=>{
          console.log(err)
        })

      } // END OF SCAN PROCESS
    }).catch(err=>{
      self.scanFailed = true;
      console.log('scan failed',err)
    });
  }

}
