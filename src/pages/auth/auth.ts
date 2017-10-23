import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";

import { AuthService } from "../../providers/auth/auth.service";
/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
    if(data == "") this.navCtrl.push(HomePage);
    else{
    	let authData = this.URLToArray(data);
    	console.log(authData);
		if(this.auth0.result(authData)){
			this.navCtrl.push(HomePage);
		}else{
			//GO TO ERROR PAGE
		}
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
