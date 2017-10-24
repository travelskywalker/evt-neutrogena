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
  mobileVersion : any;
	links: any = [];

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
        this.navCtrl.push(LoginPage);
      }
    // console.log(this.platform.is('mobile'));

    this.mobileVersion = this.platform.is('mobile');
  }

  scan(){
    let self = this;
    this.evt.scan().then(res=>{
      let item = res[0].results[0].thng;
      self.evt.getUserContext().then(usr=>{
        console.log(usr);
        usr.thng(item.id).read().then(thng=>{
          console.log(thng);
          usr.update({customFields:{myThng:thng.id}}).then(console.log);
          //TODO: Redirect to content page. Still in progress
        })
        .catch(err=>{
          console.log(err,'thng error')
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    });
  }

}
