import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { aura } from "../../assets/aura/config/aura.config";

import { ScriptService } from "../../providers/app/script.service";

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
	module = {
			title:"Morning Meditations",
			description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut blandit mi. Proin condimentum dolor vitae porttitor imperdiet. Cras erat ipsum, cursus feugiat ligula ac, posuere placerat elit. Nunc volutpat sollicitudin imperdiet. Maecenas lobortis quis sapien vel porta. Aenean cursus felis et tortor volutpat consectetur. Duis in condimentum ante, id viverra justo.ips`
		};
	auraRef : any;
	auraSelect: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private render: Renderer2, private viewCtrl : ViewController, private scr : ScriptService) {
  	if(navParams.get('auraElem') && navParams.get('auraBody')){
  		let elem = navParams.get('auraElem');
  		this.module.title = elem.Title;
  		this.module.description = elem.Description;
  		this.auraLoc = navParams.get('auraBody');
  	}
  	this.auraSelect = this.auraLoc.splice(0,1)[0];
  	console.log("constructor");
  	this.scr.loadScript("aura",this.auraSelect.ID).then(res=>{
  		console.log(res)
  	}).catch(err=>{
  		console.error(err)
  	})
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

  	document.getElementById("aura-widget-div").onload = function(e){
  		let fp = e.srcElement;
  		let frm = fp['contentWindow'].document.getElementsByTagName('body')[0];
  		frm.style.maxHeight = "100%";
  		frm.style.margin = "0px";

  		let auraWidget = fp['contentWindow'].document.getElementById('aura-widget-div');
  		auraWidget.style.maxHeight = "100%";
  		auraWidget.style.height = "100%";
  		console.log(fp,frm);
  	}
  	//this.appendVal();
  }

  appendVal(){

  	/*let spn = this.render.createElement("span");
  	this.render.addClass(spn,"title");

  	let p_prog = this.render.createElement("p");
  	this.render.addClass(p_prog,"progress");
  	let txt1 = this.render.createText("Day 1 of 30");
  	this.render.appendChild(p_prog,txt1);

  	let p_title = this.render.createElement("p");
  	this.render.addClass(p_title,"module-title");
  	let txt2 = this.render.createText(this.module.title);
  	this.render.appendChild(p_title,txt2);

  	this.render.appendChild(spn,p_title);
  	this.render.appendChild(spn,p_prog);
  	
  	this.render.appendChild(this.auraComponent.nativeElement,spn);*/

  }

  ionViewDidLeave(){
  	let audio = document.querySelector("audio");
  	console.log(audio);
  	//audio.ontimeupdate = null;
  }

  playNext(){
  	this.auraComponent.nativeElement.innerHTML = "";
  	this.appendVal();
  	this.auraSelect = this.auraLoc.splice(0,1)[0];
  	let x = this.auraSelect;
  	document.getElementById("aura-widget").remove();

  	
  	this.scr.loadScript("aura",x.ID).then(res=>{
  		console.log(res)
  	}).catch(err=>{
  		console.error(err)
  	})

  	//this.render.setAttribute(this.auraRef,"data-content-id",x[0].ID);
  	this.module.description = x.Description;
  	this.module.title = x.Title;


  }

}
