import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth.service";

import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { AgeGatePage } from "../age-gate/age-gate";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { Cookie } from "ng2-cookies";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
	invalidReg : boolean = false;
	emailTaken : boolean = false;
	private formGroup : FormGroup;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams, 
  				private render: Renderer2, 
  				private auth0: AuthService, 
  				private formBuilder: FormBuilder) {
  	this.formGroup = this.formBuilder.group({
  		firstName: ['', Validators.required],
  		lastName: ['', Validators.required],
  		email: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
  		password: ['', Validators.compose([Validators.minLength(8),Validators.required, Validators.pattern(/.*([A-Z+]|[0-9+]).*$/)])]
  	});
  	console.log(navParams.data);
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    if(Cookie.get('age_gate') === "true" || this.navParams.get('age_gate') == true){
    	console.log('Passed age gate!');
    }
    else{
    	this.navCtrl.setRoot(AgeGatePage);
    }
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

  signup(){
  	let usr = this.formGroup.value;
  	let self = this;

  	this.auth0.searchUser(usr.email).then(found=>{
  		if(found){
  			console.log(usr,found);
  			self.emailTaken = true;
  		}else{
		  	self.auth0.signup({email:usr.email,pass:usr.password},usr.firstName,usr.lastName).then(res=>{
		  		this.navCtrl.setRoot(LoginPage);
		  		console.log(res)
		  	})
		  	.catch(err=>{
		  		console.log(err);
		  		self.invalidReg = true;
		  	});
  		}
  	}).catch(err=>{
  		console.log("Something went wrong.")
  	})
  }

  FBauth(){
  	this.auth0.fbAuth();
  }

  toLogin(){
  	this.navCtrl.setRoot(LoginPage);
  }
}
