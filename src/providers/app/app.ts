import { Injectable,ViewChild, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Cookie } from "ng2-cookies";
import 'rxjs/add/operator/map';

import { aura } from "../../assets/aura/config/aura.config";
import { EvtProvider } from "../../providers/evt/evt";
import { Observable } from 'rxjs';

import { Config } from '../../config/environment.dev';

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
  //array of lessons in a course
	activeCourse : any;
  //total lessons / days in a course
	activeDur : number = 1;
  hasValidUserAge : boolean = false;
  lessonTimer?: any;
  lessonTimeLimit?:any = 10;//seconds
  currentCourse?: string;
  currentLesson?: number = 1;
  today = new Date();

  playToggleMap?: Array<any> = [];
  constructor(
    public http: Http,
    public evt: EvtProvider
  ) {
    this.lessonTimeLimit = Config.lessonCompletionTimeLimit || this.lessonTimeLimit;
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
          course: crs
        };
			}
			else{
				mast[crs] = {};
				mast[crs][ar.Day] = {
          id:ar.ID,
          title:ar.Title,
          path:ar.path,
          desc:ar.Description,
          course: crs
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
  ngOnInit(){
    alert('XXX');
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
      }else{
        localStorage.setItem('myThng', JSON.stringify(result[0].results[0].product));
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
            "currentLesson": courseData.day,
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
    this.isLastLesson(courseData.course, courseData.day).then(isLastLesson => {
      if (isLastLesson) {
        this.evt.createThngAction('_CourseCompleted',
          {
            "customFields": {
              "currentCourse": courseData.course,
              "currentLesson": courseData.day,
              "currentLessonContentId": courseData.id
            }
          }
        )
      }
    })
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
      this.startLessonTimer(lessonData);
    } else {
      this.stopLessonTimer(lessonData);
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
          "currentLesson": lessonData.day,
          "currentLessonContentId": lessonData.id
        }
      }
    )
    this.setCurrentLesson(lessonData.day);
    this.setCurrentCourse(lessonData.course);
  }

  startLessonTimer(lessonData: any) {
    let timer = Observable.timer(1000, 1000);
    let alive: boolean = true;
    this.lessonTimer =
      timer
      .takeWhile(() => alive)
      .subscribe((val) => {

        if (val == (this.lessonTimeLimit)) { //Todo: put this in config
        // if (val % this.lessonTimeLimit === 0) { //Todo: put this in config
          //if 10 mins, trigger a _LessonCompleted action
          this.completeLesson(lessonData);
          this.lessonTimer.unsubscribe();

        }
      })

  }

  stopLessonTimer(lessonData: any) {
    if (typeof this.lessonTimer !== 'undefined') {
      this.lessonTimer.unsubscribe();
    }
  }

  completeLesson(lessonData: any) {
    /**
     * App helper to put Lesson completed data to EVT
     */
    let self = this;
    this.evt.createThngAction('_LessonCompleted',
      {
        "customFields": {
          "currentCourse": lessonData.course,
          "currentLesson": lessonData.day,
          "currentLessonContentId": lessonData.id
        }
      }
    ).then((res)=> {
        self.updateCompletedLessonsCnt(lessonData.course);
        self.completeCourse(lessonData);
    });
  }

  isLastLesson(course, lessonDay): Promise<any> {
    /**
     * For a given course and day, is it the last one?
     */

    let self = this;
    return this.toGroup().then(
      res=> {
        if (typeof self.courses == 'undefined' || self.courses.length < 0) {
          self.courses = res;
        }
        let courseLen = Object.keys(self.courses[course]).length;
        return (courseLen <= lessonDay);
      }
    );
  }

  setCurrentCourse(course: string) {
    this.currentCourse = course;
  }

  getCurrentCourse(): string {
    if (typeof this.currentCourse !== 'undefined') {
      return this.currentCourse;
    } else {
      return 'Mindfulness';
    }
  }

  setCurrentLesson(day: number) {
    this.currentLesson = day;
  }

  getCurrentLesson(): number {
    return this.currentLesson;
  }

  updateCompletedLessonsCnt(course: any) {
    /**
     * Update the tally of completed lessons for the day
     */
    let crsCnt =  this.getLessonsCompletedToday(course) + 1;
    let totCnt =  this.getLessonsCompletedToday() + 1;
    if (typeof course !== 'undefined') {
      localStorage.setItem("lcCnt" + course + this.today.toDateString(), crsCnt.toString());
      localStorage.setItem("lcCnt" + this.today.toDateString(), totCnt.toString());
    }
  }

  getLessonsCompletedToday(course?: any): number {
    /**
     * Get the tally of completed Lessons for the day
     */
    if (typeof course == 'undefined') {
      return (parseInt(localStorage.getItem("lcCnt") + this.today.toDateString()) || 0);
    } else {
      if (typeof this.courses[course] == 'undefined') {
        return 0;
      }
      return (parseInt(localStorage.getItem("lcCnt" + course + this.today.toDateString())) || 0);
    }
  }

  getLessonsRemainingToday(course?: any) {
    /**
     * Check total remaining new lessons for the day
     * w/o params shows total for all courses
     *
     */
    if (typeof course == 'undefined') {
      return (Config.totalDailyLessonLimit - this.getLessonsCompletedToday());
    } else {
      if (this.courses[course] != 'undefined') {
        let remCnt = (Config.courseDailyLessonLimit - this.getLessonsCompletedToday(course));
        return (remCnt >= 0 ? remCnt : 0);
      }
    }
  }
}
