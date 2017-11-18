import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController} from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth.service";

import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { HomePage } from '../home/home';
import { DeleteAccountPage } from '../delete-account/delete-account';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  FBreg:boolean = false;
  private formGroup:FormGroup;

  constructor(public navCtrl:NavController,
              private auth0:AuthService,
              private formBuilder:FormBuilder,
              private loader:LoadingController) {
  }

  ngOnInit() {

    this.FBreg = this.auth0.isFB();
    console.log(this.FBreg);
    let usr = this.auth0.getUserDetailsFromStorage();
    let usrFName = this.FBreg ? usr['given_name'] : usr['user_metadata'].firstName;
    let usrLName = this.FBreg ? usr['family_name'] : usr['user_metadata'].lastName;
    this.formGroup = this.formBuilder.group({
      firstName: [usrFName, Validators.required],
      lastName: [usrLName, Validators.required],
      email: new FormControl({value: usr['email'], disabled: !this.FBreg}, Validators.required),
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  focused(event) {
    //let node = event._elementRef.nativeElement;
    console.log(event);
  }

  blurred(event) {
    //let node = event._elementRef.nativeElement;
    console.log(event);
  }

  dismissThis() {
    // should pop this page and then go to previous
    console.log("dismiss");
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    }
    else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  logout() {
    this.auth0.logout();
  }

  updateUser() {
    let usr = this.formGroup.value;
    let self = this;

    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss: true
    });
    load.present();

    this.auth0.updateUser({firstName: usr.firstName, lastName: usr.lastName}).then(res=> {
      self.auth0.setUserMetadata(res['user_metadata']);
      load.dismissAll();
    })
    .catch(err=> {
      load.dismissAll();
      console.log(err);
    });
  }

  deleteAccount() {
    this.navCtrl.setRoot(DeleteAccountPage);
  }

  toFB() {
    window.location.href = "//facebook.com";
  }
}
