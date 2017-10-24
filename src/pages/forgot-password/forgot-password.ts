import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { AuthService } from "../../providers/auth/auth.service";

import { SignUpPage } from "../sign-up/sign-up";
import { LoginPage } from "../login/login";
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

	private formGroup : FormGroup;
	invalidLogin : boolean = false;
 	constructor(public navCtrl: NavController,
  				public navParams: NavParams, 
  				private auth0: AuthService, 
  				private formBuilder: FormBuilder,
  				private render: Renderer2) {
	  	this.formGroup = this.formBuilder.group({
	  		email: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
	  	});
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  focused(event){
  	//console.log(event._elementRef.nativeElement);
  	let node = event._elementRef.nativeElement;
  	this.render.addClass(node,"focused");
  	//this.render.setStyle(node,"box-shadow","2px 2px 3px 1px rgb(240,119,33)");
  }

  blurred(event){
  	//console.log(event._elementRef.nativeElement);
  	let node = event._elementRef.nativeElement;
  	this.render.removeClass(node,"focused");
  	//this.render.removeStyle(node,"box-shadow");
  }

  toSignup(){
  	this.navCtrl.push(SignUpPage);
  }

  reset_pass(){
  	//TODO: add auth0's reset password
  }

  dismissThis(){
  	// should pop this page and then go to previous
  	console.log("dismiss");
  	if(this.navCtrl.canGoBack()){
  		this.navCtrl.pop();
  	}
  	else{
  		this.navCtrl.push(LoginPage);
  	}
  }

}
