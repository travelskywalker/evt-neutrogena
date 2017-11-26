import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth.service";
import { EvtProvider} from '../../providers/evt/evt';
import { AppProvider } from "../../providers/app/app";

import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { AgeGatePage } from "../age-gate/age-gate";
import { AuraMainPage } from "../aura-main/aura-main";

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
  				private formBuilder: FormBuilder,
  				private loader : LoadingController,
          private evt: EvtProvider,
          private app: AppProvider,
          private alertCtrl: AlertController
  ) {
  	this.formGroup = this.formBuilder.group({
  		firstName: ['', Validators.required],
  		lastName: ['', Validators.required],
  		email: ['', Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
  		password: ['', Validators.compose([Validators.minLength(8),Validators.required, Validators.pattern(/.*([A-Z+]|[0-9+]).*$/)])]
  	});
  	console.log(navParams.data);
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    if (this.app.hasLoggedIn()) {
      this.navCtrl.setRoot(AuraMainPage);

    } else {
      if(Cookie.get('age_gate') === "true" || this.navParams.get('age_gate') == true){
        console.log('Passed age gate!');
      }
      else{
        this.navCtrl.setRoot(AgeGatePage);
      }
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

  /**
   * Register via email + password.
   */
  signup(){
  	let usr = this.formGroup.value;
  	let self = this;
  	let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
  	load.present();

  	this.auth0.searchUser(usr.email).then(found=>{
  		if(found){
  			console.log(usr,found);
        load.dismiss();
  			self.emailTaken = true;
  		}else{

		  	self.auth0.signup({email:usr.email,pass:usr.password},usr.firstName,usr.lastName).then(response=>{
          /* add _Activated action for anonymous user */
          console.log("isAnon:" + localStorage.getItem("isAnon"));
          console.log("Signup:" + JSON.stringify(response));
          let res:any= response;
          if(localStorage.getItem("isAnon")){

            let regUserId:any = res.data.Id;
            self.evt.getAnonUserContext().then(usr=> {

              //At this point the evrythngUser  won't be available. Only auth0 registered Id.
              self.app.startReg(regUserId);

            }).catch(err=>{
                console.log(err,'thng error')
            })
          }
          this.showAlert("Your registration was successful");
		  		this.navCtrl.setRoot(LoginPage);
		  	})
		  	.catch(err=>{
		  		console.log(err);
          if (this.auth0.parseErrCode(err) === 'user_exists') {
            this.emailTaken = true;
          }
		  		self.invalidReg = true;
		  		load.dismiss();
		  	});
  		}
  	}).catch(err=>{
  		console.log("Something went wrong.", err)
  	})
  }

  /**
   * register via facebook
   *
   * @constructor
   */
  FBauth(){
  	this.auth0.fbAuth();
    //FB registration will redirect to FB then back to app, at this point there is no registration ID, until
    //it is back to the callback URL (auth module or route :data) which does not distinguish login vs registration thus
    //we use 'facebook' as registration ID of auth0 instead.
    this.app.startReg('facebook');
  }

  toLogin(){
  	this.navCtrl.push(LoginPage);
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      message: text,
      buttons: ['Ok']
    });
    alert.present();
  }

}
