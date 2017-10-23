import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth.service";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
	invalidReg : boolean = false;
	private formGroup : FormGroup;
  constructor(	public navCtrl: NavController,
  				public navParams: NavParams, 
  				private render: Renderer2, 
  				private auth0: AuthService, 
  				private formBuilder: FormBuilder) {

  	let usr = auth0.getUserDetailsFromStorage();
  	this.formGroup = this.formBuilder.group({
  		firstName: [usr['user_metadata'].firstName, Validators.required],
  		lastName: [usr['user_metadata'].lastName, Validators.required],
  		email: [usr['email'], Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
  		password: ['', Validators.compose([Validators.minLength(8),Validators.required])]
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  focused(event){
  	//console.log(event._elementRef.nativeElement);
  	let node = event._elementRef.nativeElement;
  	console.log(node);
  	//this.render.addClass(node,"focused");
  	//this.render.setStyle(node,"box-shadow","2px 2px 3px 1px rgb(240,119,33)");
  }

  blurred(event){
  	//console.log(event._elementRef.nativeElement);
  	let node = event._elementRef.nativeElement;
  	console.log(node);
  	//this.render.removeClass(node,"focused");
  	//this.render.removeStyle(node,"box-shadow");
  }

  dismissThis(){
  	// should pop this page and then go to previous
  	console.log("dismiss");
  	if(this.navCtrl.canGoBack()){
  		this.navCtrl.pop();
  	}
  }

  signup(){
  	let usr = this.formGroup.value;

  	this.auth0.signup({email:usr.email,pass:usr.password}).then(res=>{
  		console.log(res)
  	})
  	.catch(err=>{
  		console.log(err);
  		this.invalidReg = true;
  	});
  }

  FBauth(){
  	this.auth0.fbAuth();
  }
}
