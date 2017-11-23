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
	invalidEmail : boolean = false;
	emailSent : boolean = false;
 	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private auth0: AuthService,
  				private formBuilder: FormBuilder,
  				private render: Renderer2) {
	  	this.formGroup = this.formBuilder.group({
	  		email: ['', Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
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
  	this.navCtrl.setRoot(SignUpPage);
  }

  reset_pass(){
  	let self = this;

    self.auth0.changePassword(self.formGroup.value.email)
          .then(res=>{
            self.invalidEmail = false;
            self.emailSent = true;
          })
          .catch(err=>{
            self.invalidEmail = true;
            console.log(err);
          })
  }

  dismissThis(){
  	// should pop this page and then go to previous
  	console.log("dismiss");
  	if(this.navCtrl.canGoBack()){
  		this.navCtrl.pop();
  	}
  	else{
  		this.navCtrl.setRoot(LoginPage);
  	}
  }

}
