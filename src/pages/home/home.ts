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
    console.log(this.mobileVersion);
  }

  scan(){
    let self = this;
    this.evt.scan().then(res=>{
      let item = res[0].results[0].thng;
      self.evt.getUserContext().then(usr=>{
        console.log(usr);
        usr.thng(item.id).read().then(thng=>{
          self.scanFailed = false;
          console.log(thng);
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
    }).catch(err=>{
      self.scanFailed = true;
      console.log('scan failed',err)
    });
  }

}
