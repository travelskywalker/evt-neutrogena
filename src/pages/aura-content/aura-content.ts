import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, } from 'ionic-angular';

import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import { aura } from "../../assets/aura/config/aura.config";

import { ScriptService } from "../../providers/app/script.service";

import { AuraMainPage } from "../aura-main/aura-main";
import { ProgressModalComponent } from "../../components/progress-modal/progress-modal";

/**
 * Generated class for the AuraContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aura-content',
  templateUrl: 'aura-content.html',
})
export class AuraContentPage {
	@ViewChild('aura') auraComponent : ElementRef;
	@ViewChild(Content) content: Content;
	auraLoc = aura;
	module :{title?:string,description?:string,link?:any} = {
			title:"Morning Meditations",
			description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut blandit mi. Proin condimentum dolor vitae porttitor imperdiet. Cras erat ipsum, cursus feugiat ligula ac, posuere placerat elit. Nunc volutpat sollicitudin imperdiet. Maecenas lobortis quis sapien vel porta. Aenean cursus felis et tortor volutpat consectetur. Duis in condimentum ante, id viverra justo.ips`,
			link:this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/10%20Mindful%20Breaths.html")
		};
	auraRef : any;
	auraSelect: any;
	@ViewChild(ProgressModalComponent) pmc : ProgressModalComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams, private render: Renderer2, private viewCtrl : ViewController, private scr : ScriptService, private sanitizer: DomSanitizer) {
  	
  	let data = this.navParams.get('data');
  	
  	/* If there are no data in navparams *
  	 * redirect to main page			 */
  	if(typeof data == "undefined"){
  		this.navCtrl.setRoot(AuraMainPage);
  	}else{
  		/* set the content details */
	  	this.module.title = data.title;
	  	this.module.description = data.desc;
	  	this.module.link = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/"+encodeURIComponent(data.path));	
  	}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuraContentPage');
  }

  ngAfterViewInit(){
  	let self = this;
  	self.pmc.toggleView(false);
  	/* check if iframe has loaded */
  	document.getElementById("aura-widget-div").onload = function(e){
  		let fp = <HTMLIFrameElement> e.srcElement;
  		let hed : HTMLHeadElement = fp.contentWindow.document.getElementsByTagName('head')[0];
  		let frm : HTMLBodyElement = fp.contentWindow.document.getElementsByTagName('body')[0];
  		frm.style.maxHeight = "100%";	// assign max height
  		frm.style.margin = "0px";		// and margin css details

  		let auraWidget = <HTMLDivElement> fp.contentWindow.document.getElementById('aura-widget-div');
  		auraWidget.style.maxHeight = "100%";
  		auraWidget.style.height = "100%";

  		/* TO DO: Add listener to aura player to track	*
  		 * play, pause, and audio completion			*/
  		fp.contentWindow.addEventListener('DOMContentLoaded', function(e){
  			// add event listener here

  		})


  		/* Append scripts from adobe to the iframe. Uncomment once okay *
  		let scr1 = document.createElement("script");
  		let scr2 = document.createElement("script");
  		scr1.setAttribute("src","//assets.adobedtm.com/bf12630c02a44df137a783f39cdb4dbd09e2b5d7/satelliteLib-a77040281e8ad94d1a2e4c30d4df757c9e6fed98.js");
  		scr1.setAttribute("type","text/javascript");
  		scr2.setAttribute("type","text/javascript");

  		scr2.innerText = "_satellite.pageBottom();";

  		hed.appendChild(scr1);
  		frm.appendChild(scr2);
  		*/

  	}

  }

  /* If page leave is triggered before audio finishes playing, *
   * make sure to pause/stop all aura audio					 */
  ionViewDidLeave(){
  	//audio.ontimeupdate = null;
  }


}
