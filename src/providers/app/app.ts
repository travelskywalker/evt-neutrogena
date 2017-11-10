import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cookie } from "ng2-cookies";
import 'rxjs/add/operator/map';

import { aura } from "../../assets/aura/config/aura.config";
import { EvtProvider } from "../../providers/evt/evt";

/*
 *	Generated class for the AppProvider provider.
 *
 *	This is the main service for handling user progress
 *	This contains all the progress variables.
 *	The variables in the content page are here.
*/
@Injectable()
export class AppProvider {
	progressArr ?: Array<any> = [];
	progressKeys ?: Array<any> = [];
	courses ?: Array<any> = [];
	activeCourse : any;
	activeDur : number = 1;
  hasValidUserAge : boolean = false;

  playToggleMap?: Array<any> = [];
  constructor(
    public http: Http,
    public evt: EvtProvider
  ) {
    console.log(aura);
    this.initCourses();
  }

  /* GET the aura variable containing the content details, path..etc. */
  toGroup():Promise<any>{
  	let mast = [];
	  let promises = aura.map(ar=>{
			let crs = ar.Course.trim();
			if(mast.hasOwnProperty(crs)){
				mast[crs][ar.Day]= {
          id:ar.ID,
          title:ar.Title,
          path:ar.path,
          desc:ar.Description,
          course: ar.Course
        };
			}
			else{
				mast[crs] = {};
				mast[crs][ar.Day] = {
          id:ar.ID,
          title:ar.Title,
          path:ar.path,
          desc:ar.Description,
          course: ar.Course
        };
			}
	  	})

  	return Promise.all(promises).then(()=>{ this.progressKeys = Object.keys(mast); return mast});


  }

  /* set the active course for the top component in the main page */
  setActiveCourse(val){
  	this.activeCourse = val;
  	let ll = Object.keys(this.activeCourse).map(a=>{return this.activeCourse[a]});

  	this.activeDur = ll.length; //subtract 2 because there are 2 extra fields: current progress and title

  }

  setDur(val:number){
  	this.activeDur = val;
  }

  initCourses(){
  	let self = this;
  	self.toGroup().then(res=>{
  		self.initProgArr();
  		self.courses = res;
  		self.activeCourse = res['Mindfulness'];
  		self.activeDur = Object.keys(self.activeCourse).length;
  	})
  }

  initProgArr(){
  	let self = this;
  	this.progressKeys.forEach((val,ind)=>{
  		let init = {val:[]};
  		self.progressArr.push(init);
  	});
  }

  static isAgeGated() {
    return Cookie.get("age_gate");
  }

  isValidAge() {
    /**
     * Check if there's a previous age gating info
     * Check if greater than age allowed
     */
    let isAgeGated = Cookie.get("age_gate");
    let agd = Cookie.get("agd");
    this.hasValidUserAge = (isAgeGated && parseInt(agd) >= 18);
    return this.hasValidUserAge;
  }

  saveAgeGateData(ageGated: any, cookiesOn: any, selectedDate: JSON) {
    /**
     * Save age gating info for user into Cookie
     */
    if(cookiesOn){ // remember the user, for 24 hours or more, used 7 days
      Cookie.set('agd', ageGated, 7);
      Cookie.set('age_gate',"true", 7);
      Cookie.set('birthdate',JSON.stringify(selectedDate), 7);
    }
  }

  updateUserProgress(){
  	//TODO: get user data first from EVT. probably from custom fields

  	//TODO: assign user data to existing mapping.
  }


  saveThngContext(result: JSON) {
    /**
     * Save the THNG scanned or created via IR scan to localStorage for later use
     */
    if (this.getThngContext() === null) {
      /**
       * Ignore other THNGs if there's already one in localStorage
       */
      if (typeof result[0].results[0].thng !== "undefined"){
        localStorage.setItem('myThng', JSON.stringify(result[0].results[0].thng));
      }
    }

  }

  getThngContext() {
    /**
     * get the THNG from the localStorage
     */
    return localStorage.getItem('myThng');
  }

  startCourse(courseData: any) {
    /**
     * App helper function to start a course
     */
    if (courseData.day === 1) {
      this.evt.createThngAction('_CourseStarted',
        {
          "customFields": {
            "currentCourse": courseData.course,
            "currentLesson": courseData.title,
            "currentLessonContentId": courseData.id
          }
        }
      )
    }

  }

  completeCourse(courseData: any) {
    /**
     * App helper function to complete a course
     */
    if (courseData.day === 10) {
      this.evt.createThngAction('_CourseCompleted',
        {
          "customFields": {
            "currentCourse": courseData.course,
            "currentLesson": courseData.title,
            "currentLessonContentId": courseData.id
          }
        }
      )
    }
  }

  playLesson(lessonData: any) {
    /**
     * single-point entry for handling play button actions for AURA content
     */
    if (typeof this.playToggleMap[lessonData.course] === 'undefined') {
      this.playToggleMap[lessonData.course] = {}
    }

    if ( typeof this.playToggleMap[lessonData.course][lessonData.id] === 'undefined' ) {
      //playing
      this.playToggleMap[lessonData.course][lessonData.id] = 1
    } else if (this.playToggleMap[lessonData.course][lessonData.id] === 1) {
      //stopped
      this.playToggleMap[lessonData.course][lessonData.id] = 0
    } else if (this.playToggleMap[lessonData.course][lessonData.id] === 0) {
      //playing
      this.playToggleMap[lessonData.course][lessonData.id] = 1
    }

    if (this.playToggleMap[lessonData.course][lessonData.id] === 1) {
      this.evt.createThngAction('_Play');
      this.startLesson(lessonData);
    }
  }

  startLesson(lessonData: any) {
    /**
     * App helper to put Lesson started data to EVT
     */
    this.evt.createThngAction('_LessonStarted',
      {
        "customFields": {
          "currentCourse": lessonData.course,
          "currentLesson": lessonData.title,
          "currentLessonContentId": lessonData.id
        }
      }
    )

  }

  completeLesson(lessonData: any) {
    /**
     * App helper to put Lesson completed data to EVT
     */
    this.evt.createThngAction('_LessonStarted',
      {
        "customFields": {
          "currentCourse": lessonData.course,
          "currentLesson": lessonData.title,
          "currentLessonContentId": lessonData.id
        }
      }
    )

  }

}
