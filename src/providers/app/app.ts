//import { Injectable,ViewChild, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cookie } from "ng2-cookies";
import 'rxjs/add/operator/map';

import { aura } from "../../assets/aura/config/aura.config";
import { EvtProvider } from "../../providers/evt/evt";
import { Observable } from 'rxjs';

import { Config } from '../../config/environment.dev';
import { AuthService } from '../../providers/auth/auth.service';

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
	private courses ?: Array<any> = [];
  //array of lessons in a course
	activeCourse : any;
  //total lessons / days in a course
	activeDur : number = 1;
  hasValidUserAge : boolean = false;
  lessonTimer?: any;
  lessonTimeLimit?:any = Config.lessonCompletionTimeLimit;//seconds
  currentCourse?: string;
  currentLesson?: number = 1;
  courseHistory?: Array<any> = [];
  today = new Date();
  userCustomFields?: any;
  activeCourseState?: Array<any> = [0, 0, 0, 1];

  playToggleMap?: Array<any> = [];
  constructor(
    public http: Http,
    public evt: EvtProvider,
    public auth: AuthService
  ) {
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
  setActiveCourse(courseTitle?: any){
    console.log("Activecourse is set");
  	this.activeCourse = this.getCourseData(courseTitle);
    console.log(this.activeCourse);
    this.activeCourseState[courseTitle] = this.getCourseState(courseTitle);
    this.activeDur = this.getCourseDuration(courseTitle);
    this.currentCourse = courseTitle;

  	//let ll = Object.keys(this.activeCourse).map(a=>{return this.activeCourse[a]});
  	//this.activeDur = ll.length; //subtract 2 because there are 2 extra fields: current progress and title

  }
  ngOnInit(){
    alert('XXX');
  }
  setDur(val:number){
  	this.activeDur = val;
  }

  initCourses(){
    /**
     *
     * @type {AppProvider}
     *
     * group lessons into courses
     * initialize default course title, data and duration (from grouping)
     * initialize courses
     */
  	let self = this;
  	return this.toGroup().then(res=>{
      console.log("initCourses");
      console.log(res);
      self.courses = res;
      console.log(self.courses);

      self.currentCourse = 'Mindfulness';
      self.activeCourse = res['Mindfulness'];
      self.activeDur = Object.keys(self.activeCourse).length;

      if (this.evt.hasUserContext()) {
        return this.initProgArr();
      }
  	})
  }

  initProgArr(): Promise<any> {
    /**
     *
     * @type {AppProvider}
     *
     * Get data from EVT and store it a progress array in-memory
     */
  	let self = this;
    return this.getProgressStateFromEvt().then(customFields =>{
      console.log("COURSE HISTORY");
      console.log(self.courseHistory);
      self.courseHistory.forEach((val)=>{
        if (typeof self.progressArr[val.courseNumber] === 'undefined') {
          self.progressArr[val.courseNumber] = [];
        }
        if (self.progressArr[val.courseNumber].indexOf(val.lessonNumber) === -1) {
          self.progressArr[val.courseNumber].push(val.lessonNumber);
        }

      });

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
    if (courseData.day === 1 && !this.hasStartedCourse(courseData.course)) {
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
    if (this.hasLessonCompleted(lessonData)) {
      return;
    }
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

  stopLessonTimer(lessonData?: any) {
    if (typeof this.lessonTimer !== 'undefined') {
      this.lessonTimer.unsubscribe();
    }
  }

  completeLesson(lessonData: any) {
    /**
     * App helper to put Lesson completed data to EVT
     */
    if (this.hasLessonCompleted(lessonData)) {
      return;
    }

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
    /**
     * Get the CURRENT course of the user. CURRENT is not ACTIVE but the state
     * from last update. ACTIVE is the one in use by tapping or clicking.
     */
    if (typeof this.currentCourse !== 'undefined') {
      return this.currentCourse;
    } else {
      return 'Mindfulness';
    }

  }

  setCurrentLesson(day: number) {
    this.currentLesson = day;
  }

  getCurrentLesson(course?: any): number {
    /**
     *
     * Get the CURRENT lesson of the user.
     * CURRENT is not ACTIVE but the state
     * from last update. ACTIVE is the one
     * in use by tapping or clicking.
     *
     */
    if (typeof course != 'undefined' && typeof this.progressArr[course] != 'undefined') {
      let lesson = this.progressArr[course].sortNum()[this.progressArr[course].length-1];
      console.log("course: " + course + ", lesson: " + lesson);
      return lesson;
    }
    return this.currentLesson;
  }

  updateCompletedLessonsCnt(course: any) {
    /**
     * Update the tally of completed lessons for the day
     */
    let crsCnt =  this.getLessonsCompletedToday(course) + 1;
    let totCnt =  this.getLessonsCompletedToday() + 1;
    if (typeof course !== 'undefined') {
      localStorage.setItem(this.getLSKey(course), crsCnt.toString());
      localStorage.setItem(this.getLSKey(), totCnt.toString());
      //refresh the progress
      this.initProgArr();
    }
  }

  getLessonsCompletedToday(course?: any): number {
    /**
     * Get the tally of completed Lessons for the day
     */
    if (typeof course == 'undefined') {
      return (parseInt(localStorage.getItem(this.getLSKey())) || 0);
    } else {
      if (typeof this.courses[course] == 'undefined') {
        return 0;
      }
      return (parseInt(localStorage.getItem(this.getLSKey(course))) || 0);
    }
  }

  getLSKey(course?: any): string {
    /**
     * Get a lesson key counter
     * @type {string}
     */
    let str = "";
    if (typeof course != 'undefined') {
      str = "lcCnt" + this.today.toDateString();
    } else {
      str = "lcCnt" + course + this.today.toDateString()
    }

    return str;
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

  getAdditionalLesson(course?: any): number {
    /**
     * Get one additional lesson if there are still lesson credits for the day
     */
    if (this.getCourseProgress(course) >= this.getCourseDuration(course)) {
      return 0;
    }
    return (this.getLessonsRemainingToday(course) > 0 ? 1 : 0);
  }

  getProgressStateFromEvt(): Promise<any> {
    return this.evt.getUserCustomFields().then((customFields)=> {
      console.log("customFields");
      console.log(customFields);
      if (typeof customFields != 'undefined') {
        this.userCustomFields = customFields;
        let cl = null;
        let cc = "";
        if (customFields.hasOwnProperty('courseHistory') && customFields.courseHistory.length > 0) {
          this.courseHistory = customFields.courseHistory;
          let lastLessonCompleted = this.getLastCompletedLesson();
          if (typeof lastLessonCompleted !== 'undefined') {
            cl = lastLessonCompleted.lessonNumber;
            cc = lastLessonCompleted.courseNumber;
          }
        }

        if (customFields.hasOwnProperty('currentLesson')) {
          this.currentLesson = parseInt(customFields.currentLesson);
        }  else if (cl !== null) {
          this.currentLesson = cl;
        }
        if (customFields.hasOwnProperty('currentCourse')) {
          this.currentCourse = customFields.currentCourse;
        } else if (cc !== "") {
          this.currentCourse = cc;
        }

        return customFields;
      }



    })

  }

  hasStartedCourse(course: any): boolean {
    console.log("hasStarted " + typeof this.progressArr[course] != 'undefined');
    console.log(this.progressArr);
    return (typeof this.progressArr[course] != 'undefined');
  }

  hasLessonCompleted(lessonData) {
    if (typeof this.progressArr != 'undefined' && typeof this.progressArr[lessonData.course] != 'undefined') {
      return (this.progressArr[lessonData.course].indexOf(lessonData.day) >= 0);
    }
  }

  getCourseState(course: string): any {
    /**
     * Return
     * [ course progress,
     *   course total duration,
     *   current lesson,
     *   next lesson]
     *
     */
    let crsProgress = 0;
    let crsDuration = 0;
    let crsLastLesson = 0;
    let crsNextLesson = 1;
    if (typeof this.progressArr[course] != 'undefined') {
      crsProgress = this.getCourseProgress(course);
      crsDuration = this.getCourseDuration(course);
      crsLastLesson = this.getCurrentLesson(course);

      if (crsDuration > crsLastLesson) {
        crsNextLesson = crsLastLesson + this.getAdditionalLesson();
      } else {
        crsNextLesson = crsLastLesson;
      }

    } else {
      crsProgress = 0;
      crsDuration = this.getCourseDuration(course);
      crsLastLesson = 0; //last Lesson Completed
      crsNextLesson = 1;
    }
    let st = [crsProgress, crsDuration, crsLastLesson, crsNextLesson];
    console.log('course state: ');
    console.log(st);
    this.activeCourseState[course] = st;
    return st;
  }


  nextLesson(course?: any) {
    /**
     * current course state helper
     */
    if (typeof course == 'undefined') {
      course = this.currentCourse;
    }
    if (typeof this.activeCourseState[course] == 'undefined') {
      return 1;
    }
    return this.activeCourseState[course][3];
  }

  lastLesson(course?: any) {
    /**
     * current course state helper
     * Last used/active lesson
     *
     */
    if (typeof course == 'undefined') {
      course = this.currentCourse;
    }
    if (typeof this.activeCourseState[course] == 'undefined') {
      return 0;
    }
    return this.activeCourseState[course][2];
  }

  courseDuration(course?: any) {
    /**
     * current course state helper
     */
    if (typeof course == 'undefined') {
      course = this.currentCourse;
    }
    if (typeof this.activeCourseState[course] == 'undefined') {
      return 10;
    }
    return this.activeCourseState[course][1];
  }

  progressCount(course?: any) {
    /**
     * current course state helper
     */
    if (typeof course == 'undefined') {
      course = this.currentCourse;
    }
    if (typeof this.activeCourseState[course] == 'undefined') {
      return;
    }
    return this.activeCourseState[course][0];
  }

  hasNextLesson(course?: any): boolean {
    if (this.getCourseProgress(course) >= this.getCourseDuration(course)) {
      //has reached end
      return false;
    }
    return (this.nextLesson(course) !== this.getCourseProgress(course));
  }

  getCourseDuration(course: any): number {
    if (typeof this.courses != 'undefined' && typeof this.courses[course] != 'undefined') {
      //console.log(this.courses[course]);
      return Object.keys(this.courses[course]).length;
    } else {
      return 10;
    }
  }

  getCourseProgress(course: any): number {
    /**
     * returns 0 or the lesson day
     */
    //console.log("PROGRESS ARRAY");
    //console.log(this.progressArr);
    return (typeof this.progressArr[course] != 'undefined') ? this.progressArr[course].length : 0;
  }

  getArrDay(course?: any): Array<any> {
    //add a lesson if there are lesson credit remaining and if there's history
    let arrDay = [];
    let availableLessons = this.getLastCompletedLesson() > 0 ?
      this.lastLesson(course) + this.getAdditionalLesson(course) : 0;
    //let availableLessons = this.lastLesson(course) + this.getAdditionalLesson(course);

    for(let i=0;i < availableLessons;i++){
      let iDay = i + 1;
    	let st = !(iDay==this.nextLesson(course));
    	arrDay.push({day:iDay,status:st});
    }
    console.log(this.lastLesson(course));
    console.log(arrDay);
    console.log("hasNextLesson:" + this.hasNextLesson(course));
    return arrDay;
  }

  getLastCompletedLesson(): any {
    if (typeof this.courseHistory != 'undefined' && this.courseHistory.length > 0) {
      return this.courseHistory[this.courseHistory.length-1]
    } else {
      return {
        courseNumber: "",
        lessonNumber: 0
      };
    }
  }

  getLastCompletedCourse() {
    if (typeof this.getLastCompletedLesson() != 'undefined' && this.getLastCompletedLesson().lessonNumber > 0) {
      return this.getLastCompletedLesson()['courseNumber'];
    } else {
      return 'Mindfulness';
    }
  }

  hasActiveCourse(): boolean {
    /**
     * Check if Active course has been initialize or set
     */
    return (typeof this.activeCourse != 'undefined');
  }

  getCourseData(course: string): any {
    /**
     * Get all lessons of a course
     */
    if (typeof this.courses == 'undefined' || typeof this.courses[course] == 'undefined') {
      return;
    }
    let s = this.courses[course];
    return s;
  }

  hasLoggedIn(): boolean {
    return this.auth.loggedIn();
  }

  getLessonData(course:any, lessonId: any): any{
    if (typeof this.courses[course] != 'undefined') {
      return this.courses[course][lessonId];
    }
  }
}
