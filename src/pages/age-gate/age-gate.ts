import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
// import { AuthService } from "../../providers/auth/auth.service";

import { Cookie } from "ng2-cookies";
import { AppProvider } from "../../providers/app/app";
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { AuraMainPage } from '../aura-main/aura-main';

@IonicPage()
@Component({
  selector: 'page-age-gate',
  templateUrl: 'age-gate.html',
})
export class AgeGatePage {

	invalidAge : boolean = false;
  selectedDate: any;
  inputDate: any;
  cookiesOn: boolean = false;
  noticeViewed : boolean;


  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				private render: Renderer2,
          public alertCtrl: AlertController,
          public app: AppProvider
  				) {

    this.selectedDate = {
      'day':'',
      'month':'',
      'year':''
    };
    this.inputDate ='';
    if (AppProvider.isAgeGated()) {
      this.invalidAge = !this.app.isValidAge()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgeGatePage');
  }

  ngOnInit(){
    // if noticeViewed is true, the cookie policy notification will no longer be displayed
    if(Cookie.get('cookie_notice') && Cookie.get('cookie_notice') == '1'){
      this.noticeViewed = true;
    }
    else{
      Cookie.set('cookie_notice','1');
      this.noticeViewed = false;
    }
  }

  changedDate(){
    // console.log(this.inputDate);


       this.selectedDate.year = this.inputDate.split("-")[0];
       this.selectedDate.month = this.inputDate.split("-")[1];
       this.selectedDate.day = this.inputDate.split("-")[2];

       console.log(this.selectedDate);
  }


  dismissThis(){
  	// should pop this page and then go to previous
  	this.navCtrl.setRoot(HomePage);
  }

  submitAge(){
    if(this.inputDate.length === 0){
      this.showAlert('Please input your birth date.');
    }
    else{
      let currentDate = new Date().getFullYear();
      console.log((currentDate - this.selectedDate.year) > 18);
      let ageGated = currentDate - this.selectedDate.year;
      console.log("Selected:" + this.selectedDate);
      if( ageGated > 18){

        this.invalidAge = false;
        /* We're all good. Proceed to meditation home, save age gate info first */

        this.app.saveAgeGateData(ageGated, this.cookiesOn, this.selectedDate);
        // this.navCtrl.setRoot(SignUpPage,{age_gate:true});
        this.navCtrl.setRoot(AuraMainPage,{age_gate:true});
      }
      else{
        this.app.saveAgeGateData(ageGated, this.cookiesOn, this.selectedDate);
        this.invalidAge = true;
      }
    }
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      message: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  checkAge(data){

  }

  FBauth(){
  	// this.auth0.fbAuth();
  }
}
