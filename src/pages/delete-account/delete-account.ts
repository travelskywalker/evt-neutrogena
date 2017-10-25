import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyAccountPage } from '../my-account/my-account';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth/auth.service';
/**
 * Generated class for the DeleteAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-account',
  templateUrl: 'delete-account.html',
})
export class DeleteAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth0: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteAccountPage');
  }

  cancel(){
  	if(this.navCtrl.canGoBack()){
  		this.navCtrl.pop();
  	}else{
  		this.navCtrl.setRoot(MyAccountPage);
  	}
  }

  delete(){
  	//auth0 here
  	let self = this;
  	this.auth0.deleteUser().then(res=>{
  		self.auth0.logout();
  		self.navCtrl.setRoot(LoginPage);
  	})
  	.catch(err=>{
  		console.log("An error has occurred",err)
  	});
  }

}
