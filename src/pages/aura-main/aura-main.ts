import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';

import { aura } from "../../assets/aura/config/aura.config";

import { ScriptService } from "../../providers/app/script.service";

/**
 * Generated class for the AuraMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aura-main',
  templateUrl: 'aura-main.html',
})
export class AuraMainPage {

	@ViewChild(Slides) slider: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private render: Renderer2, private viewCtrl : ViewController, private scr : ScriptService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuraMainPage');
    console.log(this.slider);
  }

}
