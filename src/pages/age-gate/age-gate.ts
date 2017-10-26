import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
// import { AuthService } from "../../providers/auth/auth.service";

//
// import { SignUpPage } from '../sign-up/sign-up';
// import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-age-gate',
  templateUrl: 'age-gate.html',
})
export class AgeGatePage {

	invalidAge : boolean = false;
  selectedDate: any;
  inputDate: any;

  constructor(	public navCtrl: NavController,
  				public navParams: NavParams,
  				private render: Renderer2,
          public alertCtrl: AlertController
  				) {

    this.selectedDate = {
      'day':'',
      'month':'',
      'year':''
    };
      this.inputDate ='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgeGatePage');
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
  	console.log("dismiss");
  	if(this.navCtrl.canGoBack()){
  		this.navCtrl.pop();
  	}
  	else{
  		// this.navCtrl.push(HomePage);
  	}
  }
  submitAge(){
    if(this.inputDate.length === 0){
      this.showAlert('Please input your birth date.');
    }
    else{
      let currentDate = new Date().getFullYear();
      console.log((currentDate - this.selectedDate.year) > 18);

      if((currentDate - this.selectedDate.year) > 18){

          this.invalidAge = false;
      }
      else{

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
