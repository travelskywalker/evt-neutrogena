import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

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
  @ViewChild(Nav) nav: Nav;
  links : any = [];
  accountState: any;

  constructor() {

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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
