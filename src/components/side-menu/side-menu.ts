import { Component, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';

//import { SignUpPage } from '../../pages/sign-up/sign-up';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the SideMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent {
  links : any = [];

  constructor(private auth0 : AuthService, private app: App) {

  }

  ngOnInit(){
  	this.links = [
  					{title: "Privacy Policy", /* component: Page */ },
  					{title: "Cookie Policy", /* component: Page */ },
  					{title: "Modern Slavery Act Statement", /* component: Page */ },
  					{title: "Legal Notice", /* component: Page */ },
  					{title: "About AURA", /* component: Page */ }
  				 ];
  }

  ngAfterViewInit(){
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getRootNav();
    nav.setRoot(page.component);
  }

  login(){
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  logout(){
   this.auth0.logout(); 
  }

  loggedIn() : boolean{
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != ""){
      return true;
    }
    else{
      return false;
    }
  }

}
