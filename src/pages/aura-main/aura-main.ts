import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';

import { ScriptService } from "../../providers/app/script.service";
import { AppProvider } from "../../providers/app/app";

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
	@ViewChild('btns') btnSlide : Slides;
	expanded: boolean = false;
	def : string = "down";
	day ?: number = 8;
	dur ?: number = 10;
	arrDay ?: any = [];
	courses ?: any;
	courseKeys ?: any;
	activeCourse ?: [{desc:string,id:string,path:string,title:string}] = [{desc:"",id:"",path:"",title:""}];
	courseTitle?: string = "Mindfulness";
  constructor(public navCtrl: NavController, public navParams: NavParams, private render: Renderer2, private viewCtrl : ViewController, private scr : ScriptService, private app:AppProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AuraMainPage');
    //console.log(this.slider);
  }

  popDays(){
  	this.arrDay = [];
    for(let i=1;i<=this.day;i++){
    	let st = !(i==this.day);
    	this.arrDay.push({day:i,status:st});
    }

    setTimeout(()=>{
    	try{
    		this.btnSlide.slideTo(this.day);
    		console.log(this.day);
    	}catch(e){
    		console.log(e);
    	}
    },100);
  }

  expand(){
  	this.expanded = !this.expanded;
  	if(this.expanded) this.def = "up";
  	else this.def = "down";
  }

  ngAfterViewInit(){
  	console.log(this.slider.width);
    this.popDays();
  }

  ngOnInit(){
  	let self = this;
  	this.app.toGroup().then(res=>{
  		self.courses = res;
  		self.courseKeys = Object.keys(res);
  		self.activeCourse = res[self.courseTitle];
  		self.dur = self.courseKeys.length;
  	})
  }

  tryMe($event){
  	this.activeCourse = $event;
  	this.day = $event.progress;
  	this.courseTitle = $event.title;
  	this.dur = this.courseKeys.length;
  	this.popDays();
  }

  intoTheContent(stat,ind:number = 1){
  	//console.log(this.activeCourse[ind]);
  	this.navCtrl.setRoot(AuraContentPage,{data:this.activeCourse[ind]});
  }

  evtScroll($event){
  	//console.log($event.target.scrollLeft, $event.target);
  	return true;
  }

}
