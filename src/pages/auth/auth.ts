import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";

import { AuthService } from "../../providers/auth/auth.service";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth0 : AuthService) {
  }

  ionViewDidLoad() {
    let data = this.navParams.get('data');
    if(data === ""){
    	//experience starts with SCAN page (HomePage)
      this.navCtrl.setRoot(HomePage);

    } else {
    	let authData = this.URLToArray(data);
    	//console.log(authData);
		this.auth0.result(authData).then(res=>{
			console.log(res);
			this.navCtrl.setRoot(HomePage);
		}).catch(err=>{
			console.log(err);
			//GO TO ERROR PAGE
		})
    }
  }

  URLToArray(url:string) {
    var request = {};
    var pairs = url.split('&');
    for (var i = 0; i < pairs.length; i++) {
        if(!pairs[i])
            continue;
        var pair = pairs[i].split('=');
        request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return request;
  }

}
