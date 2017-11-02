import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';

import { aura } from "../../assets/aura/config/aura.config";

import { ScriptService } from "../../providers/app/script.service";

import { AuraContentPage } from "../../pages/aura-content/aura-content";

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
	expanded: boolean = false;
	def : string = "down";
	day : number = 18;
	arrDay : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private render: Renderer2, private viewCtrl : ViewController, private scr : ScriptService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuraMainPage');
    console.log(this.slider);
    for(let i=1;i<=this.day;i++){
    	let st = !(i==this.day);
    	this.arrDay.push({day:i,status:st});
    }
    console.log(this.arrDay);
  }

  expand(){
  	this.expanded = !this.expanded;
  	if(this.expanded) this.def = "up";
  	else this.def = "down";
  }

  ngAfterViewInit(){

  }

  tryMe($event){
  	console.log($event);
  }

  intoTheContent(stat){
  	if(!stat) return false;
  	this.navCtrl.setRoot(AuraContentPage);
  }

  evtScroll($event){
  	//console.log($event.target.scrollLeft, $event.target);
  	return true;
  }

}
