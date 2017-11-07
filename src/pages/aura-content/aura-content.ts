import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, } from 'ionic-angular';

import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import { aura } from "../../assets/aura/config/aura.config";

import { ScriptService } from "../../providers/app/script.service";

import { AuraMainPage } from "../aura-main/aura-main";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private render: Renderer2, private viewCtrl : ViewController, private scr : ScriptService, private sanitizer: DomSanitizer) {
  	
  	let data = this.navParams.get('data');
  	console.log(data);
  	if(typeof data == "undefined"){
  		
  		this.navCtrl.setRoot(AuraMainPage);
  	}else{
	  	this.module.title = data.title;
	  	this.module.description = data.desc;
	  	this.module.link = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/"+encodeURIComponent(data.path));	
  	}

  }

  ionViewWillEnter(){
  	console.log("will enter");
  	/*this.auraSelect = this.auraLoc.splice(0,1)[0];
  	let hed = document.getElementsByTagName("script")[0];
  	console.log(hed);
  	let nscr = this.render.createElement("script","script");
  	this.render.setAttribute(nscr,"id","aura-widget");
  	this.render.setAttribute(nscr,"data-content-id",this.auraSelect.ID);
  	this.render.setAttribute(nscr,"type","text/javascript");
  	this.render.setAttribute(nscr,"async","true");
  	this.render.setAttribute(nscr,"charset","utf-8");
  	this.render.setAttribute(nscr,"src","http://app.aurahealth.io/static/widget.js");

  	this.render.insertBefore(hed.parentElement,nscr,hed);
  	nscr.onload = function(e){
  		console.log(e);
  	}*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuraContentPage');
  }

  ngAfterViewInit(){
  	console.log("afterview init");
  	let self = this;
  	document.getElementById("aura-widget-div").onload = function(e){
  		let fp = e.srcElement;
  		let frm = fp['contentWindow'].document.getElementsByTagName('body')[0];
  		frm.style.maxHeight = "100%";
  		frm.style.margin = "0px";

  		let auraWidget = fp['contentWindow'].document.getElementById('aura-widget-div');
  		auraWidget.style.maxHeight = "100%";
  		auraWidget.style.height = "100%";
  		//console.log(fp,frm);
  	}


  	//this.appendVal();
  }

  appendVal(){


  }

  ionViewDidLeave(){
  	//audio.ontimeupdate = null;
  }


}
