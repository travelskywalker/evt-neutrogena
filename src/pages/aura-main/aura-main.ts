//import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Component, ViewChild} from '@angular/core';
//import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';

import { Config } from "../../config/environment";
import { AppProvider } from "../../providers/app/app";
//import { AuthService } from '../../providers/auth/auth.service';

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
  progressKeys: any;
  progressArr: any = {};

  constructor(private app:AppProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loading: LoadingController
  ) {

  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {

    //clear timer from content page
    this.app.stopLessonTimer();

    //set hero aura content title and lessons
    this.initActiveCourse();

    //set hero aura content label
    this.initLabelIntro();

    //to enter this page, a user must have an evt user context, has either a product or thng context and
    //is age gated with valid age. Otherwise, take the user to the scan page
    if (this.app.evt.hasUserContext()
      && (this.app.evt.hasLocalProduct() || this.app.evt.hasLocalThng())
      && this.app.isValidAge()) {

      if (!this.app.hasActiveCourse() || this.navParams.get('reload')) {

        let self = this;
        let loading = self.loading.create({
          spinner: 'crescent',
          content: `Please wait...`,
          enableBackdropDismiss: false,
          dismissOnPageChange: true,
          showBackdrop: true
        })
        loading.present();

        this.app.initProgArr().then((res)=> {

          console.log("Last played:" + this.navParams.get('lastplayed'), this.app.progressArr);
          let lastActiveCourse = this.navParams.get('lastplayed') ? this.navParams.get('lastplayed') : this.app.getLastActiveCourse();
          this.app.setActiveCourse(lastActiveCourse);

          this.initActiveCourse();
          this.courseTitle = lastActiveCourse;

          loading.dismiss();

        });
      }

    } else {

      this.navCtrl.setRoot(HomePage);

    }

  }

  initActiveCourse() {

    this.initProgressState();

    this.courseTitle = this.app.getCurrentCourse();
    this.initLabelIntro();

    this.popDays();

  }

  initProgressState() {

    if (typeof this.progressKeys == 'undefined') {
      this.progressKeys = Object.keys(this.app.getCourses());
    }

    let pk = {};
    this.progressKeys.forEach((val)=>{
      pk[val] = typeof this.app.progressArr[val] == 'undefined' ?  0
        : this.app.progressArr[val].length
    });
    this.progressArr = pk;

  }
  /* Add buttons depending on number of days *
   * Animate for effect to the current day 	 */
  popDays(){
  	this.arrDay = this.app.getArrDay(this.courseTitle);
    this.slideDayButtons();
  }

  slideDayButtons() {
    setTimeout(()=>{
      try{
        this.btnSlide.slideTo(this.app.nextLesson());
      }catch(e){
        //console.log(e);
      }
    },300);
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
    //console.log(JSON.stringify($event));
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
    console.log(this.app.nextLesson(this.courseTitle));

    if (ind >= this.app.nextLesson(this.courseTitle)
      && this.app.isNextLessonLocked(this.courseTitle)) {

      this.navCtrl.setRoot(LoginPage);

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
        if (this.app.hasCompletedCourse(this.courseTitle)) {
          this.labelIntro = "Completed";
        } else {
          this.labelIntro = "Continue";
        }

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

  toSignUp() {
    if (this.labelIntro == "Sign in to access content") {
      this.navCtrl.push("SignUpPage");
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
