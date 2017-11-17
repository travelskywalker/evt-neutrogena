import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth0: AuthService, private loader: LoadingController) {
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

  safeDelete() {
    /**
     * Mark as deleted and log-out user
     *
     * @type {any}
     */
    let self = this;
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
    load.present();

    this.auth0.updateUser({deleted:true}).then(res=>{
      console.log(res);
      self.auth0.setUserMetadata(res['user_metadata']);
      this.auth0.logout();
    }).catch(err=>{
      console.log(err);
      load.dismiss();
    });
  }

  delete(){
  	//auth0 here,
    // update: Unused, removed by Rex 11/17/2017
    this.auth0.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
