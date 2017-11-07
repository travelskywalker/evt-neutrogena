import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginPage } from "../../pages/login/login";
import { AuthService } from "../../providers/auth/auth.service";

import { SignUpPage } from "../../pages/sign-up/sign-up";
import { MyAccountPage } from "../../pages/my-account/my-account";
/**
 * Generated class for the AuraHeadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'aura-head',
  templateUrl: 'aura-head.html'
})
export class AuraHeadComponent {

  userData: any;
  logged: boolean = false;
  name: string = "";
  constructor(private auth0: AuthService, private navCtrl: NavController,) {

  }

  toLogin(){
  	/*let nav = this.app.getRootNav();
  	nav.setRoot(LoginPage);*/
  	
  	//this.navCtrl.setRoot(LoginPage);

  	this.navCtrl.push(SignUpPage);
  }

  myAccount(){
  	this.navCtrl.push(MyAccountPage);
  }

  ngOnInit(){
  	/* If logged in, populate user data with details from storage */
  	if(this.auth0.loggedIn()){
  		this.userData = this.auth0.getUserDetailsFromStorage();
  		this.logged = true;
  		
	  	if(this.auth0.isFB()){
	  		this.name = this.userData.given_name;
	  	}
	  	else{
	  		this.name = this.userData.user_metadata.firstName;
	  	}
  	}

  }

}
