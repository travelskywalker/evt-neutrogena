import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyAccountPage } from '../my-account/my-account';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  	console.log("Account deleted");
  }

}
