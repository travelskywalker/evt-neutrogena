import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AuthService } from "../../providers/auth/auth.service";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";
//
// import { SignUpPage } from '../sign-up/sign-up';
// import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-age-gate',
  templateUrl: 'age-gate.html',
})
export class AgeGatePage {
	private formGroup : FormGroup;
	invalidLogin : boolean = false;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				private render: Renderer2,

  				private formBuilder: FormBuilder) {
  	this.formGroup = this.formBuilder.group({
  		email: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
  		password: ['', Validators.required ],
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgeGatePage');
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
  		// this.navCtrl.push(HomePage);
  	}
  }

  toSignup(){
  	// this.navCtrl.push(SignUpPage);
  }

  login(){
  	// let usr = this.formGroup.value;
  	//console.log(usr);
    //
  	// this.auth0.login({email:usr.email,pass:usr.password}).then(res=>{
  	// 	console.log(res)
  	// })
  	// .catch(err=>{
  	// 	console.log(err);
  	// 	this.invalidLogin = true;
  	// });
  }

  FBauth(){
  	// this.auth0.fbAuth();
  }
}
