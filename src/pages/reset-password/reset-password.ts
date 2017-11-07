import { Component, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth.service";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
	private formGroup : FormGroup;
	invalidLogin : boolean = false;
	successfulReset : boolean = true;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				private render: Renderer2,
  				private auth0: AuthService,
  				private formBuilder: FormBuilder) {
  	this.formGroup = this.formBuilder.group({
  		password: ['', Validators.compose([Validators.minLength(8),Validators.required, Validators.pattern(/.*([A-Z+]|[0-9+]).*$/)])],
  		confirm: ['', Validators.compose([Validators.minLength(8),Validators.required, Validators.pattern(/.*([A-Z+]|[0-9+]).*$/)])],
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

  /* check if new passwords match */
  checkMatch(): boolean{
  	let formVal = this.formGroup.value;
  	return formVal.password == formVal.confirm;
  }

  /* check if form has been tampered with */
  checkDirty(): boolean{
  	return this.formGroup.get('password').dirty && this.formGroup.get('confirm').dirty;
  }

  resetPw(){
  	let self = this;
  	let usr = this.formGroup.value;
  	this.auth0.updatePassword(usr.password)
  			.then(res=>{
  				self.successfulReset = true;
  			})
  			.catch(err=>{
  				self.successfulReset = false;
  			})
  }

  toLoginPage(){
  	this.navCtrl.setRoot(LoginPage);
  }

}
