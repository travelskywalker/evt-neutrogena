import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Slides, LoadingController } from 'ionic-angular';

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
	day ?: number = 1;
	dur ?: number = 10;
	arrDay ?: any = [];
  noticeTitle?:string;
  noticeClass?:string = 'pink';
  loggedIn: boolean;
	courses ?: any;
	activeCourse ?: [{desc:string,id:string,path:string,title:string, course:string}] = [{desc:"",id:"",path:"",title:"", course: ""}];
	courseTitle?: string = "Mindfulness";
  addLesson: number = 0;
  constructor(private app:AppProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private render: Renderer2,
              private viewCtrl : ViewController,
              private scr : ScriptService,
              private loading: LoadingController
  ) {
  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    //clear timer from content page
    this.app.stopLessonTimer();
    this.initActiveCourse();
  }

  initActiveCourse() {

    this.courseTitle = this.app.getCurrentCourse();
    //this.day = this.app.getCurrentLesson();
    this.popDays();
    //this.app.setActiveCourse(this.courseTitle);

  }

  /* Add buttons depending on number of days *
   * Animate for effect to the current day 	 */
  popDays(){
  	this.arrDay = this.app.getArrDay(this.courseTitle);
    //add a lesson if there are lesson credit remainig and if there's history

    //for(let i=1;i < this.app.availableLessons()+1;i++){
    //	let st = !(i==this.day);
    //	this.arrDay.push({day:i,status:st});
    //}
    setTimeout(()=>{
    	try{
    		this.btnSlide.slideTo(this.app.nextLesson());
    	}catch(e){
    		//console.log(e);
    	}
    },100);
  }

/* Expand description */
  expand(){
  	this.expanded = !this.expanded;
  	if(this.expanded) this.def = "up";
  	else this.def = "down";
  }

  ngAfterViewInit(){
    //this.popDays();

  }

  ngOnInit(){
  	let self = this;
  	this.app.initProgArr()
  }


 /* This is triggered by the sub-course component *
 * when it is tapped (begin / continue) and 	  *
 * transfers the data from the sub-course to 	  *
 * the top area (slider of buttons).     	 	  */
  tryMe($event){
    console.log(JSON.stringify($event));
    let courseTitle = $event.title;
    delete $event['title'];
    delete $event['progress'];
    this.app.setActiveCourse(courseTitle);
  	this.courseTitle = courseTitle;

  	//this.dur = this.app.progressKeys.length;
  	this.popDays();
  }

  /* Go to the aura content */
  intoTheContent(stat,ind:number = 1){
  	//console.log(this.activeCourse[ind]);
    let courseData = this.app.activeCourse[ind];
    courseData["day"] = ind;
  	this.navCtrl.setRoot(AuraContentPage,{data:courseData});
  }

}
