import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';

import { Config } from '../../config/environment.dev';
import { LoginPage } from '../../pages/login/login';
import { MyAccountPage } from '../../pages/my-account/my-account';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

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
  ext ?: any = Config.ext_links;
  constructor(private auth0 : AuthService, private app: App, private dom: DomSanitizer) {

  }

  ngOnInit(){
  	this.links = [
  					{
              title: "Privacy Policy",
              link:this.dom.bypassSecurityTrustResourceUrl(this.ext.privacyPolicy)
            },
  					{
              title: "Cookie Policy",
              link:this.dom.bypassSecurityTrustResourceUrl(this.ext.cookiePolicy)
            },
  					{
              title: "Modern Slavery Act Statement",
              link:this.dom.bypassSecurityTrustResourceUrl(this.ext.slaveryAct)
            },
  					{
              title: "Legal Notice",
              link:this.dom.bypassSecurityTrustResourceUrl(this.ext.legalNotice)
            },
  					{
              title: "About AURA",
              link:""
            }
  				 ];
  }

  ngAfterViewInit(){
  }

  login(){
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  logout(){
   this.auth0.logout();
  }

  loggedIn() : boolean{
    return this.auth0.loggedIn();
  }

  myAccount(){
    let nav = this.app.getRootNav();
    nav.setRoot(MyAccountPage);
  }

}
