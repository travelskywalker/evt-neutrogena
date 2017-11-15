//import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Component, ViewChild} from '@angular/core';
//import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';

import { Config } from "../../config/environment.dev";
import { AppProvider } from "../../providers/app/app";

import { AuraContentPage } from "../../pages/aura-content/aura-content";
import { LoginPage } from "../../pages/login/login";
import { HomePage } from "../../pages/home/home";
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
	activeCourse ?: [{desc:string,id:string,path:string,title:string, course:string, author: string}] = [
    {desc:"",id:"",path:"",title:"", course: "", author: ""}
  ];
	courseTitle?: string = "Mindfulness";
  addLesson: number = 0;
  labelIntro = "Start this course";
  aura_url = Config.aura_url;
  constructor(private app:AppProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loading: LoadingController
              //private render: Renderer2,
              //private viewCtrl : ViewController,
              //private scr : ScriptService
  ) {
  }

  ionViewWillEnter() {

    if (this.app.evt.hasUserContext()) {

      console.log("ionViewWillEnter Aura Home");if (!this.app.hasActiveCourse()) {

        let self = this;
        let loading = self.loading.create({
          spinner: 'crescent',
          content: `Please wait...`,
          enableBackdropDismiss: true
        })
        loading.present();
        this.app.initCourses().then(()=> {
          this.app.initProgArr().then(()=> {
            console.log("Last completed:" + this.app.getLastCompletedCourse());
            this.app.setActiveCourse(this.app.getLastCompletedCourse());
            loading.dismiss();
            this.navCtrl.setRoot("AuraMainPage");
          })
        })
      }

    } else {

      this.navCtrl.setRoot(HomePage);

    }
  }

  ionViewDidLoad() {
    //clear timer from content page
    this.app.stopLessonTimer();
    this.initActiveCourse();
    this.initLabelIntro();

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
    this.initLabelIntro();
  	//this.dur = this.app.progressKeys.length;
  	this.popDays();
  }

  /* Go to the aura content */
  intoTheContent(stat,ind:number = 1){
    console.log(ind);
    console.log(this.app.nextLesson(this.courseTitle));
    if (ind >= this.app.nextLesson(this.courseTitle)
      && this.app.isNextLessonLocked(this.courseTitle)) {

      this.navCtrl.push(LoginPage);

    } else {
      //console.log(this.activeCourse[ind]);
      let courseData = this.app.activeCourse[ind];
      courseData["day"] = ind;
      this.navCtrl.setRoot(AuraContentPage,{data:courseData});
    }

  }

  initLabelIntro() {
    if (this.app.hasLoggedIn()) {
      if (this.app.hasStartedCourse(this.courseTitle)) {
        this.labelIntro = "Continue";
      } else {
        this.labelIntro = "Start this course";
      }
    } else {
      if (this.app.hasStartedCourse(this.courseTitle)) {
        this.labelIntro = "Sign in to access content";
      } else {
        this.labelIntro = "Start this course";
      }
    }
  }

  getDayBtnIcon() {
    if (this.app.isNextLessonLocked(this.courseTitle)) {
      return "lock";
    } else {
      return "play";
    }
  }
}
