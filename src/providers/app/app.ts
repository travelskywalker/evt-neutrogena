//import { Injectable,ViewChild, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Cookie } from "ng2-cookies";
import 'rxjs/add/operator/map';
import '../../app/tep';

import { aura } from "../../assets/aura/config/aura.config";
import { EvtProvider } from "../../providers/evt/evt";
import { Observable } from 'rxjs';

import { Config } from '../../config/environment';
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
  /**
   * holds the time played in seconds used to get time remaining till completion
   */
  playTimerMap?: Array<any> = [];
  /**
   * Holds the instance of notice component when it gets created.
   */
  public noticeViewManager?: any;
  /**
   * Holds the instance of reorder popup when it gets created.
   */
  public reorderViewManager?: any;
  public hiddenPar?: any;
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
          course: crs,
          author: ar.Author
        };
			}
			else{
				mast[crs] = {};
				mast[crs][ar.Day] = {
          id:ar.ID,
          title:ar.Title,
          path:ar.path,
          desc:ar.Description,
          course: crs,
          author: ar.Author
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

  saveAgeGateData(ageGated?: any, cookiesOn?: any, selectedDate?: JSON) {
    /**
     * Save age gating info for user into Cookie
     */

    if(cookiesOn){ // remember the user, for 24 hours or more, used 7 days
      Cookie.set('agd', ageGated, Config.age_gate_expiry);
      Cookie.set('age_gate',"true", Config.age_gate_expiry);
      Cookie.set('birthdate',JSON.stringify(selectedDate), Config.age_gate_expiry);

    } else {

      Cookie.set('agd', ageGated);
      Cookie.set('age_gate',"true");
      Cookie.set('birthdate',JSON.stringify(selectedDate));
    }

    if (this.hasLoggedIn()) {
      //save the birthdate, dob for relog-in use.
      let self = this;
      this.auth.updateUser({dob: selectedDate}).then(res=>{
        self.auth.setUserMetadata(res['user_metadata']);
      })

    }
  }

  getCookieDOB() {
    return Cookie.get('birthdate');
  }

  getCookieAge(precalc?: boolean=false) {
    if (precalc == true) {
      return parseInt(Cookie.get("agd"));
    } else{
      let currentDate = new Date().getFullYear();
      return (currentDate - this.getCookieDOB().year);
    }
  }

  saveThngContext(result: any) {
    /**
     * Save the THNG scanned or created via IR scan to localStorage for later use
     */
    if (this.getThngContext() === null) {
      /**
       * Ignore other THNGs if there's already one in localStorage
       */
      if (typeof result.id !== 'undefined') {
        localStorage.setItem('myThng', JSON.stringify(result));
      } else if (typeof result[0].results[0].thng !== "undefined"){
        localStorage.setItem('myThng', JSON.stringify(result[0].results[0].thng));
      }else if (typeof result[0].results[0].product !== "undefined"){
        localStorage.setItem('myProduct', JSON.stringify(result[0].results[0].product));
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

  playLesson(lessonData: any, pmc?: any, ifStartPlayClassList?: any) {
    /**
     * single-point entry for handling play button actions for AURA content
     */

    if (typeof this.playToggleMap[lessonData.course] === 'undefined') {
      this.playToggleMap[lessonData.course] = {}
    }
    console.log("toggle", this.playToggleMap[lessonData.course][lessonData.id] );
    if ( typeof this.playToggleMap[lessonData.course][lessonData.id] === 'undefined' ) {
      //playing
      console.log('toggle set')
      this.playToggleMap[lessonData.course][lessonData.id] = 1

    } else if (this.playToggleMap[lessonData.course][lessonData.id] === 1) {
      //stopped
      this.playToggleMap[lessonData.course][lessonData.id] = 0

    } else if (this.playToggleMap[lessonData.course][lessonData.id] === 0) {
      //playing
      this.playToggleMap[lessonData.course][lessonData.id] = 1

    }
    console.log("toggle", this.playToggleMap[lessonData.course][lessonData.id] );
    if (this.playToggleMap[lessonData.course][lessonData.id] === 1) {
      this.evt.createThngAction('_Play');
      this.startLesson(lessonData);
      this.startLessonTimer(lessonData, pmc, ifStartPlayClassList);
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
    );
    this.setCurrentLesson(lessonData.day);
    this.setCurrentCourse(lessonData.course);
  }

  startLessonTimer(lessonData: any, pmc?: any, ifStartPlayClassList?: any) {
    let timer = Observable.timer(1000, 1000);
    let alive: boolean = true;
    console.log('timer started');
    this.lessonTimer =
      timer
      .takeWhile(() => alive)
      .subscribe((val) => {
        if (val % 10 == 0) {
          console.log("lesson timer ping " + val, ifStartPlayClassList.contains('fa-play'), this.playToggleMap[lessonData.course][lessonData.id]);
        }

        //checks for time remaining to completion or has completed based on widget timer,
        //fa-play class btn, and if it was still playing using the toggle info
        if (this.getLessonTimeRemaining(lessonData, val) <= 0 || (val > 0
          && ifStartPlayClassList.contains('fa-play')===true
          && this.playToggleMap[lessonData.course][lessonData.id]==1)) {
          this.completeLesson(lessonData);
          pmc.toggleView(true, lessonData);
          this.lessonTimer.unsubscribe();
          console.log('timer end');
        }
      })

  }

  /**
   * Get the time remaining for lesson based on configured lesson time limit
   *
   * @param lessonData
   * @param timerVal
   * @returns {number}
   */
  getLessonTimeRemaining(lessonData?: any, timerVal?: number): number {
    if (typeof this.playTimerMap[lessonData.course]=='undefined') {
      this.playTimerMap[lessonData.course] = {}
    }
    if (typeof this.playTimerMap[lessonData.course][lessonData.id]=='undefined') {
      this.playTimerMap[lessonData.course][lessonData.id] = timerVal;
    } else {
      this.playTimerMap[lessonData.course][lessonData.id] += 1;
    }

    let timeRemaining = this.lessonTimeLimit - this.playTimerMap[lessonData.course][lessonData.id];
    console.log('time remaining', timeRemaining);
    return timeRemaining;

  }

  stopLessonTimer(lessonData?: any) {
    if (typeof this.lessonTimer !== 'undefined') {
      if (typeof lessonData != 'undefined')  {
        //ensure that the play toggle is also marked as zero, when stop is called from content page
        this.playToggleMap[lessonData.course][lessonData.id] = 0;
      }
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
    return this.evt.createThngAction('_LessonCompleted',
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
    let usr = typeof this.evt.getUser() != 'undefined' ? this.evt.getUser().id : '';

    if (typeof course == 'undefined') {
      str = "lcCnt" + usr + this.today.toDateString();
    } else {
      str = "lcCnt" + usr + course + this.today.toDateString()
    }
    return str.tephash();
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
        if (this.hasLoggedIn()) {
          return (remCnt >= 0 ? remCnt : 0);
        } else {
          if (this.nextLesson(course) <= Config.anonUserLessonLimit) {
            return 1;
          } else {
            return 0;
          }
        }
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

  hasCompletedCourse(course: any): boolean {
    return (this.hasStartedCourse(course) && this.getCourseProgress(course) == this.getCourseDuration(course));
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
        crsNextLesson = crsLastLesson + this.getAdditionalLesson(course);
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

  getTotalAvailableLessons(course?: any): number {
    /**
     * Get total available lessons. Separate branches between Anon and Logged-in user
     */
    if (this.hasLoggedIn()) {
      let availableLessons = this.getLastCompletedLesson().lessonNumber > 0 ? this.lastLesson(course) : 0;

      return availableLessons;
    } else {

      let progressCnt = this.getCourseProgress(course);
      console.log("progressCnt" + progressCnt);
      if (progressCnt >= Config.anonUserLessonLimit) {
        return Config.anonUserLessonLimit; //only 1 lesson available for anon user
      } else {
        return this.lastLesson(course);
      }
    }

  }

  getArrDay(course?: any): Array<any> {
    //add a lesson if there are lesson credit remaining and if there's history
    let arrDay = [];
    let availableLessons = this.getTotalAvailableLessons(course);

    for(let i=0;i < availableLessons;i++){
      let iDay = i + 1;
    	let st = !(iDay==this.nextLesson(course));
    	arrDay.push({day:iDay,status:st});
    }

    console.log("lastLesson" + this.lastLesson(course));
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

  isNextLessonLocked(course?: any): boolean {
    if (!this.hasLoggedIn()) {
      //logged in, no lock, don't bother
      let nextLesson = this.nextLesson(course);
      if (typeof nextLesson != 'undefined') {
        if (nextLesson > Config.anonUserLessonLimit) {
          return true;
        }
      }
    }

    return false;
  }

  startLogin() {
    console.log("Login action called");
    localStorage.loginStarted = 1;
  }

  resetThngContext() {
    localStorage.removeItem("myThng");
    localStorage.removeItem("myProduct");
  }

  completeLogin(userData?:any): Promise<any> {
    let self = this;
    return new Promise(function(resolve, reject) {
      if (typeof localStorage.loginStarted != 'undefined') {
        console.log("finalizeLogin");
        //set evt user info
        self.auth.setEVTInfo();

        //reset the THNG context
        self.resetThngContext();

        //set the age gate data from auth0 user metadata
        if (typeof userData != 'undefined') {
          let umd = self.auth.isFB() === true ? userData[Config.fbUserMetadataNS + 'user_metadata'] : userData['user_metadata'];
          if (typeof umd['dob'] != 'undefined') {
            let agd = new Date().getFullYear() - parseInt(umd['dob']['year']);
            self.saveAgeGateData(agd, false, umd['dob']);
          }
        }

        self.evt.createUserAction("_Login").then(()=>{
          self.evt.getThngContext().then(th=>{
            console.log("getThngContext");
            console.log(th);
            if (typeof th != "undefined") {
              if (typeof localStorage.myThng == 'undefined') {
                self.saveThngContext(th);
              }
              resolve(th);
            } else {
              resolve(false);
            }
          });
          localStorage.removeItem('loginStarted');
        });


      } else {
        resolve(false);
      }
    });

  }

  setBeginTS(): void {
    /**
     * set beginning of use
     */
    console.log(typeof Cookie.get('ts_begin'));
    if (typeof Cookie.get('ts_begin') == 'undefined' || !Cookie.get('ts_begin')) {
      let dy = Date.now(); //start of the day
      Cookie.set('ts_begin', dy.toString(), Config.thngDaysLifeSpan);
    }
  }

  getBeginTS(): any {
    /**
     * return since beginning of use.
     */
    return parseInt(Cookie.get('ts_begin'));
  }

  hasSignInNotice(): boolean {
    /**
     * Check if there's a need to popup a signin notice
     */

    if (!this.hasLoggedIn()) {
      let daysSince = Math.floor((Date.now() - parseInt(this.getBeginTS())) / (86400 * 1000));
      if (daysSince >= Config.anonUserDaysToSignInNotice) {
        console.log('daysSince:' + daysSince);
        return true;
      }
    }
    return false;
  }

  getUserCreatedAt(): any {
    if (this.hasLoggedIn() && typeof localStorage.userInfo != 'undefined') {
      //only for logged in
      let usr = JSON.parse(localStorage.userInfo);
      let userCreatedAt = new Date(usr.created_at);
      return userCreatedAt;
    }
  }

  hasReorderNotice(): boolean {
    if (this.hasLoggedIn()) {
      let daysSinceCreatedAt = Math.floor((Date.now() - this.getUserCreatedAt().getTime()) / (86400 * 1000));
      console.log('daysSinceCreatedAt: ' + daysSinceCreatedAt);
      if (daysSinceCreatedAt >= Config.dayToReorderNotice) {
        return true;
      }

    }
  }

  /**
   * Registration have been started, completed in Auth0.
   * Registered user local actions is not yet connected in EVT
   *
   * @param regAuth0UserId
   */
  startReg(regAuth0UserId: any): void {
    console.log("startReg:" + regAuth0UserId);
    //create the action anyway, but add registerIdType
    this.evt.createThngAction(
      "_Activated", {
        customFields: {
          registeredUserIdType: 'auth0',
          registeredUserId: regAuth0UserId
        }
      }, true); //called against on anon user
    localStorage.regStarted = regAuth0UserId;
  }

  /**
   * Complete the registration process
   * - checks user_metadata from auth0
   * - checks that regid and local device are equivalent
   * - calls the _Activated action with evt user id w/ anon user
   *
   * @param userData
   *
   */
  completeReg(userData: any): Promise<any> {

    let self = this;
    return new Promise(function(resolve, reject) {
      let regEvtUserId:any;
      let regAuth0UserId:any;

      if (self.auth.isFB()) {

        regEvtUserId = userData[Config.fbUserMetadataNS + 'user_metadata'].evrythngUserData.evrythngUser;
        regAuth0UserId = 'facebook';

      } else {

        regEvtUserId = userData.user_metadata.evrythngUserData.evrythngUser;
        regAuth0UserId = userData.user_id.replace('auth0|', '');

      }


      if (typeof localStorage.regStarted != 'undefined' && regEvtUserId && regAuth0UserId) {
        console.log("reg start detected");

        if (localStorage.regStarted === regAuth0UserId) {

          //valid registration to complete
          console.log("valid registration to complete");
          return self.evt.createThngAction(
            "_Activated", {
              customFields: {
                registeredUserIdType: 'evt',
                registeredUserId: regEvtUserId
              }
            }, true).then( //called with anon user
              es=>{
              localStorage.removeItem("regStarted");
            }
          );
        }

      } else {

        resolve(false);

      }

    });

  }
}
