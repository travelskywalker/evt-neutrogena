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

  constructor(private nav: NavController, private view: ViewController) {
    console.log('Hello AuraFootComponent Component');
    this.text = 'Hello World';
  }

  toHome(){
  	this.nav.setRoot(HomePage);
  }

  reorder(){

  }

}
