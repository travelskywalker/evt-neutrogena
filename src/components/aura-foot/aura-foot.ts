import { Component } from '@angular/core';
import { NavController, ViewController } from "ionic-angular";

import { AuraMainPage } from "../../pages/aura-main/aura-main";
import { HomePage } from "../../pages/home/home";
/**
 * Generated class for the AuraFootComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'aura-foot',
  templateUrl: 'aura-foot.html'
})
export class AuraFootComponent {

  text: string;
  
  /* This is the reorder link */
  ext_url ?: string = "//www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator";

  constructor(private nav: NavController, private view: ViewController) {
    console.log('Hello AuraFootComponent Component');
    this.text = 'Hello World';
  }

  toHome(){
    console.log(this.nav);
  	this.nav.setRoot(AuraMainPage);
  }

}
