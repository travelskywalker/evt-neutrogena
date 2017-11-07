import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth.service";
import { EvtProvider } from "../../providers/evt/evt";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	private formGroup : FormGroup;
	invalidLogin : boolean = false;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				private render: Renderer2,
  				private auth0: AuthService,
  				private formBuilder: FormBuilder,
  				private loader : LoadingController,
  				private evt : EvtProvider) {
  	this.formGroup = this.formBuilder.group({
  		email: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
  		password: ['', Validators.required ],
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
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
  		this.navCtrl.pop();
  	}
  	else{
  		this.navCtrl.setRoot(HomePage);
  	}
  }

  toSignup(){
  	this.navCtrl.push(SignUpPage);
  }

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

  	this.auth0.login({email:usr.email,pass:usr.password}).then(res=>{
  		//console.log(res)
  		self.evt.createUserAction("_Login");
  	})
  	.catch(err=>{
  		console.log(err);
  		this.invalidLogin = true;
  		load.dismiss();
  	});
  }

  FBauth(){
  	this.auth0.fbAuth();
  }

  passwordReset(){
  	this.navCtrl.setRoot(ForgotPasswordPage);
  }
}
