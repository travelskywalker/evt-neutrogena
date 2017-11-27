import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth.service";
import { AppProvider } from "../../providers/app/app";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { AuraMainPage } from '../aura-main/aura-main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	private formGroup : FormGroup;
	invalidLogin : boolean = false;
	invalidPass : boolean = false;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				private render: Renderer2,
  				private auth0: AuthService,
  				private formBuilder: FormBuilder,
  				private loader : LoadingController,
  				private app : AppProvider) {
  	this.formGroup = this.formBuilder.group({
  		email: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
  		password: ['', Validators.required ],
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');

  }

  ionViewWillEnter(){
    if (this.app.hasLoggedIn()) {
      this.navCtrl.setRoot(AuraMainPage);
    }
  }

  focused(event){
  	let node = event._elementRef.nativeElement;
  	this.render.addClass(node,"focused");
  }

  blurred(event){
  	let node = event._elementRef.nativeElement;
  	this.render.removeClass(node,"focused");
  }

  dismissThis(){
  	// should pop this page and then go to previous
  	console.log("dismiss");
  	if(this.navCtrl.canGoBack()){

  		this.navCtrl.popTo(AuraMainPage);
  	}
  	else{
  		this.navCtrl.setRoot(HomePage);
  	}
  }

  toSignup(){
this.navCtrl.pop();
  	this.navCtrl.push(SignUpPage);
  }

  /**
   *
   * This is the email / password login CTA. Called when email+password and submit button is pressed
   */
  login(){
  	let self = this;
  	let usr = this.formGroup.value;
  	let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
  	load.present();
  	//console.log(usr);
    this.app.startLogin();
  	this.auth0.login({email:usr.email,pass:usr.password}).then(res=>{
  		//won't be reachable due to redirect to auth0. Next landing is home or auth0 callback
  	})
  	.catch(err=>{
  		console.log(err);
      //there is only 1 error state: invalid_user_password
      //
      if (this.auth0.parseErrCode(err) == 'invalid_user_password') {
        self.invalidLogin = true;
        self.invalidPass = true;
      }

  		load.dismiss();
  	});
  }

  /**
   * This is the FB login CTA. Called when FB login button is pressed.
   *
   * @constructor
   */
  FBauth(){
    this.app.startLogin();
  	this.auth0.fbAuth();
  }

  passwordReset(){
  	this.navCtrl.setRoot(ForgotPasswordPage);
  }
}
