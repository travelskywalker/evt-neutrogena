webpackJsonp([0],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_evt_evt__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__age_gate_age_gate__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__aura_main_aura_main__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_cookies__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng2_cookies__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignUpPage = (function () {
    function SignUpPage(navCtrl, navParams, render, auth0, formBuilder, loader, evt, app, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.evt = evt;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.invalidReg = false;
        this.emailTaken = false;
        this.formGroup = this.formBuilder.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].required],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_9__angular_forms__["g" /* Validators */].pattern(/.*([A-Z+]|[0-9+]).*$/)])]
        });
        console.log(navParams.data);
    }
    SignUpPage.prototype.ionViewDidLoad = function () {
    };
    SignUpPage.prototype.ionViewWillEnter = function () {
        if (this.app.hasLoggedIn()) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__aura_main_aura_main__["a" /* AuraMainPage */]);
        }
        else {
            if (__WEBPACK_IMPORTED_MODULE_10_ng2_cookies__["Cookie"].get('age_gate') === "true" || this.navParams.get('age_gate') == true) {
                console.log('Passed age gate!');
            }
            else {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__age_gate_age_gate__["a" /* AgeGatePage */]);
            }
        }
    };
    SignUpPage.prototype.focused = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        this.render.addClass(node, "focused");
        //this.render.setStyle(node,"box-shadow","2px 2px 3px 1px rgb(240,119,33)");
    };
    SignUpPage.prototype.blurred = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        this.render.removeClass(node, "focused");
        //this.render.removeStyle(node,"box-shadow");
    };
    SignUpPage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        console.log("dismiss");
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        }
    };
    /**
     * Register via email + password.
     */
    SignUpPage.prototype.signup = function () {
        var _this = this;
        var usr = this.formGroup.value;
        var self = this;
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        this.auth0.searchUser(usr.email).then(function (found) {
            if (found) {
                console.log(usr, found);
                load.dismiss();
                self.emailTaken = true;
            }
            else {
                self.auth0.signup({ email: usr.email, pass: usr.password }, usr.firstName, usr.lastName).then(function (response) {
                    /* add _Activated action for anonymous user */
                    console.log("isAnon:" + localStorage.getItem("isAnon"));
                    console.log("Signup:" + JSON.stringify(response));
                    var res = response;
                    if (localStorage.getItem("isAnon")) {
                        var regUserId_1 = res.data.Id;
                        self.evt.getAnonUserContext().then(function (usr) {
                            //At this point the evrythngUser  won't be available. Only auth0 registered Id.
                            self.app.startReg(regUserId_1);
                        }).catch(function (err) {
                            console.log(err, 'thng error');
                        });
                    }
                    _this.showAlert("Your registration was successful");
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                })
                    .catch(function (err) {
                    console.log(err);
                    if (_this.auth0.parseErrCode(err) === 'user_exists') {
                        _this.emailTaken = true;
                    }
                    self.invalidReg = true;
                    load.dismiss();
                });
            }
        }).catch(function (err) {
            console.log("Something went wrong.", err);
        });
    };
    /**
     * register via facebook
     *
     * @constructor
     */
    SignUpPage.prototype.FBauth = function () {
        this.auth0.fbAuth();
        //FB registration will redirect to FB then back to app, at this point there is no registration ID, until
        //it is back to the callback URL (auth module or route :data) which does not distinguish login vs registration thus
        //we use 'facebook' as registration ID of auth0 instead.
        this.app.startReg('facebook');
    };
    SignUpPage.prototype.toLogin = function () {
        this.navCtrl.pop();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    SignUpPage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            message: text,
            buttons: ['Ok']
        });
        alert.present();
    };
    return SignUpPage;
}());
SignUpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sign-up',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/sign-up/sign-up.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Sign Up</p>\n	<p class="form-desc">Let\'s get started with your free mindulness sessions.</p>\n	<form [formGroup]="formGroup" id="sign-up-form" #signUpForm>\n		<ion-row>\n			<ion-input type="text" formControlName="firstName" placeholder="First Name" (ionFocus)="focused($event)" [(ngModel)]="firstName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="text" formControlName="lastName" placeholder="Last Name" (ionFocus)="focused($event)" [(ngModel)]="lastName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row [ngClass]="{\'taken\':emailTaken, \'invalid\': !formGroup.controls.email.valid}">\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [ngClass]="{\'taken\':emailTaken, \'invalid\': !formGroup.controls.email.valid}"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<div class="space-40"></div>\n		<p class="form-desc log">Already registered? Log in <a class="linker" (tap)="toLogin()">here</a>.</p>\n		<button ion-button id="signUp" class="getStarted" (tap)="signup()" [disabled]="!formGroup.valid">Get Started</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="signUpFB" class="fbReg" (tap)="FBauth()">Sign Up with Facebook</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/sign-up/sign-up.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_9__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_evt_evt__["a" /* EvtProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_app__["a" /* AppProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], SignUpPage);

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_tep__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_tep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__app_tep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_aura_config_aura_config__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_evt_evt__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Injectable,ViewChild, OnInit } from '@angular/core';










/*
 *	Generated class for the AppProvider provider.
 *
 *	This is the main service for handling user progress
 *	This contains all the progress variables.
 *	The variables in the content page are here.
*/
var AppProvider = (function () {
    function AppProvider(http, evt, auth) {
        this.http = http;
        this.evt = evt;
        this.auth = auth;
        this.progressArr = {};
        this.progressKeys = [];
        this.courses = [];
        //total lessons / days in a course
        this.activeDur = 1;
        this.hasValidUserAge = false;
        this.lessonTimeLimit = __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].lessonCompletionTimeLimit; //seconds
        this.currentLesson = 1;
        this.courseHistory = [];
        this.today = new Date();
        this.activeCourseState = [0, 0, 0, 1];
        this.playToggleMap = [];
        /**
         * holds the time played in seconds used to get time remaining till completion
         */
        this.playTimerMap = [];
    }
    AppProvider.prototype.isDesktopView = function () {
        var ua = navigator.userAgent;
        var isDesktop = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
            isDesktop = false;
        else if (/Chrome/i.test(ua))
            isDesktop = true;
        else
            isDesktop = true;
        return isDesktop;
    };
    /* GET the aura variable containing the content details, path..etc. */
    AppProvider.prototype.toGroup = function () {
        var _this = this;
        var mast = {};
        var promises = __WEBPACK_IMPORTED_MODULE_5__assets_aura_config_aura_config__["a" /* aura */].map(function (ar) {
            var crs = ar.Course.trim();
            if (mast.hasOwnProperty(crs)) {
                mast[crs][ar.Day] = {
                    id: ar.ID,
                    title: ar.Title,
                    path: ar.path,
                    desc: ar.Description,
                    course: crs,
                    author: ar.Author
                };
            }
            else {
                mast[crs] = {};
                mast[crs][ar.Day] = {
                    id: ar.ID,
                    title: ar.Title,
                    path: ar.path,
                    desc: ar.Description,
                    course: crs,
                    author: ar.Author
                };
            }
        });
        return Promise.all(promises).then(function () { _this.progressKeys = Object.keys(mast); return mast; });
    };
    /* set the active course for the top component in the main page */
    AppProvider.prototype.setActiveCourse = function (courseTitle) {
        console.log("Activecourse is set", courseTitle);
        this.activeCourse = this.getCourseData(courseTitle);
        this.activeCourseState[courseTitle] = this.getCourseState(courseTitle);
        this.activeDur = this.getCourseDuration(courseTitle);
        this.currentCourse = courseTitle;
        //let ll = Object.keys(this.activeCourse).map(a=>{return this.activeCourse[a]});
        //this.activeDur = ll.length; //subtract 2 because there are 2 extra fields: current progress and title
    };
    AppProvider.prototype.ngOnInit = function () {
        alert('XXX');
    };
    AppProvider.prototype.setDur = function (val) {
        this.activeDur = val;
    };
    AppProvider.prototype.initCourses = function () {
        /**
         *
         * @type {AppProvider}
         *
         * group lessons into courses
         * initialize default course title, data and duration (from grouping)
         * initialize courses
         */
        var self = this;
        if (typeof localStorage.courses != 'undefined') {
            console.log('courses from storage');
            return new Promise(function (resolve) {
                self.courses = JSON.parse(localStorage.courses);
                resolve(true);
            });
        }
        else {
            return this.toGroup().then(function (res) {
                console.log("initCourses");
                console.log(typeof res, JSON.stringify(res));
                self.courses = res;
                localStorage.courses = JSON.stringify(res);
            });
        }
    };
    AppProvider.prototype.getCourses = function () {
        return this.courses;
    };
    /**
     * Get data from EVT and store it a progress array in-memory
     * @returns Promise<any>
     */
    AppProvider.prototype.initProgArr = function () {
        var self = this;
        if (typeof localStorage.courseHistory != 'undefined' && localStorage.courseHistory !== "[]") {
            console.log('progressArr from storage');
            return new Promise(function (resolve) {
                self.courseHistory = JSON.parse(localStorage.courseHistory);
                var progArr = self._initProgArr();
                resolve(progArr);
            });
        }
        else {
            return self.getProgressStateFromEvt().then(function (customFields) {
                self._initProgArr();
            });
        }
    };
    AppProvider.prototype._initProgArr = function () {
        var _this = this;
        localStorage.setItem('courseHistory', JSON.stringify(this.courseHistory));
        this.courseHistory.forEach(function (val) {
            if (typeof _this.progressArr[val.courseNumber] === 'undefined') {
                _this.progressArr[val.courseNumber] = [];
            }
            if (_this.progressArr[val.courseNumber].indexOf(val.lessonNumber) === -1) {
                _this.progressArr[val.courseNumber].push(val.lessonNumber);
            }
        });
        this._setCourseCounters();
        return this.progressArr;
    };
    AppProvider.prototype.isCourseHistoryMatch = function () {
        if ((typeof localStorage.courseHistory != 'undefined') && (this.courseHistory == JSON.parse(localStorage.courseHistory)))
            return false;
        else
            return true;
    };
    AppProvider.isAgeGated = function () {
        return __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get("age_gate");
    };
    AppProvider.prototype.isValidAge = function () {
        /**
         * Check if there's a previous age gating info
         * Check if greater than age allowed
         */
        var isAgeGated = __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get("age_gate");
        var agd = __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get("agd");
        this.hasValidUserAge = (isAgeGated && parseInt(agd) >= 18);
        return this.hasValidUserAge;
    };
    AppProvider.prototype.saveAgeGateData = function (ageGated, cookiesOn, selectedDate) {
        /**
         * Save age gating info for user into Cookie
         */
        if (cookiesOn) {
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('agd', ageGated, __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].age_gate_expiry);
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('age_gate', "true", __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].age_gate_expiry);
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('birthdate', JSON.stringify(selectedDate), __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].age_gate_expiry);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('agd', ageGated);
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('age_gate', "true");
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('birthdate', JSON.stringify(selectedDate));
        }
        if (this.hasLoggedIn()) {
            //save the birthdate, dob for relog-in use.
            var self_1 = this;
            this.auth.updateUser({ dob: selectedDate }).then(function (res) {
                self_1.auth.setUserMetadata(res['user_metadata']);
            });
        }
    };
    AppProvider.prototype.getCookieDOB = function () {
        return __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get('birthdate');
    };
    AppProvider.prototype.getCookieAge = function (precalc) {
        if (precalc === void 0) { precalc = false; }
        if (precalc == true) {
            return parseInt(__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get("agd"));
        }
        else {
            var currentDate = new Date().getFullYear();
            return (currentDate - new Date(this.getCookieDOB()).getFullYear());
        }
    };
    AppProvider.prototype.saveThngContext = function (result) {
        /**
         * Save the THNG scanned or created via IR scan to localStorage for later use
         */
        if (this.getThngContext() === null) {
            /**
             * Ignore other THNGs if there's already one in localStorage
             */
            if (typeof result.id !== 'undefined') {
                localStorage.setItem('myThng', JSON.stringify(result));
            }
            else if (typeof result[0].results[0].thng !== "undefined") {
                localStorage.setItem('myThng', JSON.stringify(result[0].results[0].thng));
            }
            else if (typeof result[0].results[0].product !== "undefined") {
                localStorage.setItem('myProduct', JSON.stringify(result[0].results[0].product));
                this.evt.setLocalStorageTimeout();
            }
        }
    };
    AppProvider.prototype.getThngContext = function () {
        /**
         * get the THNG from the localStorage
         */
        return localStorage.getItem('myThng');
    };
    AppProvider.prototype.startCourse = function (courseData) {
        /**
         * App helper function to start a course
         */
        if (courseData.day === 1 && !this.hasStartedCourse(courseData.course)) {
            this.evt.createThngAction('_CourseStarted', {
                "customFields": {
                    "currentCourse": courseData.course,
                    "currentLesson": courseData.day,
                    "currentLessonContentId": courseData.id
                }
            });
        }
    };
    AppProvider.prototype.completeCourse = function (courseData) {
        var _this = this;
        /**
         * App helper function to complete a course
         */
        this.isLastLesson(courseData.course, courseData.day).then(function (isLastLesson) {
            if (isLastLesson) {
                _this.evt.createThngAction('_CourseCompleted', {
                    "customFields": {
                        "currentCourse": courseData.course,
                        "currentLesson": courseData.day,
                        "currentLessonContentId": courseData.id
                    }
                });
            }
        });
    };
    AppProvider.prototype.playLesson = function (lessonData, pmc, ifStartPlayClassList) {
        /**
         * single-point entry for handling play button actions for AURA content
         */
        if (typeof this.playToggleMap[lessonData.course] === 'undefined') {
            this.playToggleMap[lessonData.course] = {};
        }
        console.log("toggle", this.playToggleMap[lessonData.course][lessonData.id]);
        if (typeof this.playToggleMap[lessonData.course][lessonData.id] === 'undefined') {
            //playing
            console.log('toggle set');
            this.playToggleMap[lessonData.course][lessonData.id] = 1;
        }
        else if (this.playToggleMap[lessonData.course][lessonData.id] === 1) {
            //stopped
            this.playToggleMap[lessonData.course][lessonData.id] = 0;
        }
        else if (this.playToggleMap[lessonData.course][lessonData.id] === 0) {
            //playing
            this.playToggleMap[lessonData.course][lessonData.id] = 1;
        }
        console.log("toggle", this.playToggleMap[lessonData.course][lessonData.id]);
        if (this.playToggleMap[lessonData.course][lessonData.id] === 1) {
            this.evt.createThngAction('_Play');
            this.startLesson(lessonData);
            this.startLessonTimer(lessonData, pmc, ifStartPlayClassList);
        }
        else {
            this.stopLessonTimer(lessonData);
        }
    };
    AppProvider.prototype.startLesson = function (lessonData) {
        /**
         * App helper to put Lesson started data to EVT
         */
        if (this.hasLessonCompleted(lessonData)) {
            return;
        }
        this.evt.createThngAction('_LessonStarted', {
            "customFields": {
                "currentCourse": lessonData.course,
                "currentLesson": lessonData.day,
                "currentLessonContentId": lessonData.id
            }
        });
        this.setCurrentLesson(lessonData.day);
        this.setCurrentCourse(lessonData.course);
    };
    AppProvider.prototype.startLessonTimer = function (lessonData, pmc, ifStartPlayClassList) {
        var _this = this;
        var timer = __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].timer(1000, 1000);
        var alive = true;
        console.log('timer started');
        this.lessonTimer =
            timer
                .takeWhile(function () { return alive; })
                .subscribe(function (val) {
                if (val % 10 == 0) {
                    console.log("lesson timer ping " + val, ifStartPlayClassList.contains('fa-play'), _this.playToggleMap[lessonData.course][lessonData.id]);
                }
                //checks for time remaining to completion or has completed based on widget timer,
                //fa-play class btn, and if it was still playing using the toggle info
                if (_this.getLessonTimeRemaining(lessonData, val) <= 0 || (val > 0
                    && ifStartPlayClassList.contains('fa-play') === true
                    && _this.playToggleMap[lessonData.course][lessonData.id] == 1)) {
                    _this.completeLesson(lessonData);
                    pmc.toggleView(true, lessonData);
                    _this.stopLessonTimer(lessonData, true);
                    console.log('timer end');
                }
            });
    };
    /**
     * Get the time remaining for lesson based on configured lesson time limit
     *
     * @param lessonData
     * @param timerVal
     * @returns {number}
     */
    AppProvider.prototype.getLessonTimeRemaining = function (lessonData, timerVal) {
        if (typeof this.playTimerMap[lessonData.course] == 'undefined') {
            this.playTimerMap[lessonData.course] = {};
        }
        if (typeof this.playTimerMap[lessonData.course][lessonData.id] == 'undefined') {
            this.playTimerMap[lessonData.course][lessonData.id] = timerVal;
        }
        else {
            this.playTimerMap[lessonData.course][lessonData.id] += 1;
        }
        var timeRemaining = this.lessonTimeLimit - this.playTimerMap[lessonData.course][lessonData.id];
        console.log('time remaining', timeRemaining);
        return timeRemaining;
    };
    AppProvider.prototype.stopLessonTimer = function (lessonData, reset) {
        if (reset === void 0) { reset = false; }
        if (typeof this.lessonTimer !== 'undefined') {
            if (typeof lessonData != 'undefined') {
                //ensure that the play toggle is also marked as zero, when stop is called from content page
                this.playToggleMap[lessonData.course][lessonData.id] = 0;
                if (reset) {
                    //reached the end of the audio and timer is reset to 0
                    this.playTimerMap[lessonData.course][lessonData.id] = 0;
                }
            }
            this.lessonTimer.unsubscribe();
        }
    };
    AppProvider.prototype.completeLesson = function (lessonData) {
        /**
         * App helper to put Lesson completed data to EVT
         */
        if (this.hasLessonCompleted(lessonData)) {
            return;
        }
        var self = this;
        localStorage.removeItem('courseHistory');
        return this.evt.createThngAction('_LessonCompleted', {
            "customFields": {
                "currentCourse": lessonData.course,
                "currentLesson": lessonData.day,
                "currentLessonContentId": lessonData.id
            }
        }).then(function (res) {
            self.updateCompletedLessonsCnt(lessonData.course);
            self.completeCourse(lessonData);
        });
    };
    AppProvider.prototype.isLastLesson = function (course, lessonDay) {
        /**
         * For a given course and day, is it the last one?
         */
        var self = this;
        return new Promise(function (resolve) {
            //if lesson day is the length or course or has an overflow (more than intended for some stupid reason), then its the last lesson
            resolve(self.getCourseDuration(course) <= lessonDay);
        });
    };
    AppProvider.prototype.setCurrentCourse = function (course) {
        this.currentCourse = course;
    };
    AppProvider.prototype.getCurrentCourse = function () {
        /**
         * Get the CURRENT course of the user. CURRENT is not ACTIVE but the state
         * from last update. ACTIVE is the one in use by tapping or clicking.
         */
        if (typeof this.currentCourse !== 'undefined') {
            return this.currentCourse;
        }
        else {
            return 'Mindfulness';
        }
    };
    AppProvider.prototype.setCurrentLesson = function (day) {
        this.currentLesson = day;
    };
    AppProvider.prototype.getCurrentLesson = function (course) {
        /**
         *
         * Get the CURRENT lesson of the user.
         * CURRENT is not ACTIVE but the state
         * from last update. ACTIVE is the one
         * in use by tapping or clicking.
         *
         */
        if (typeof course != 'undefined' && typeof this.progressArr[course] != 'undefined') {
            var lesson = this.progressArr[course].sortNum()[this.progressArr[course].length - 1];
            console.log("course: " + course + ", lesson: " + lesson);
            return lesson;
        }
        return this.currentLesson;
    };
    AppProvider.prototype.updateCompletedLessonsCnt = function (course) {
        /**
         * Update the tally of completed lessons for the day
         */
        var crsCnt = this.getLessonsCompletedToday(course) + 1;
        var totCnt = this.getLessonsCompletedToday() + 1;
        if (typeof course !== 'undefined') {
            localStorage.setItem(this.getLSKey(course), crsCnt.toString());
            localStorage.setItem(this.getLSKey(), totCnt.toString());
            //refresh the progress
            localStorage.removeItem('courseHistory');
            localStorage.removeItem('lessonCtr');
        }
    };
    AppProvider.prototype.getLessonsCompletedToday = function (course) {
        /**
         * Get the tally of completed Lessons for the day
         */
        var dt = this.getFullDayFromTS();
        if (typeof course == 'undefined') {
            if (typeof this.lessonCtr['total'] != 'undefined' && typeof this.lessonCtr['total'][dt] != 'undefined') {
                return parseInt(this.lessonCtr['total'][dt]);
            }
            //fallback for overall local ctr.
            return (parseInt(localStorage.getItem(this.getLSKey())) || 0);
        }
        else {
            if (typeof this.courses[course] == 'undefined') {
                return 0;
            }
            else if (typeof this.lessonCtr != 'undefined') {
                if (typeof this.lessonCtr[course] != 'undefined' && typeof this.lessonCtr[course][dt] != 'undefined') {
                    return parseInt(this.lessonCtr[course][dt]);
                }
            }
            //fallback on local ctr
            return (parseInt(localStorage.getItem(this.getLSKey(course))) || 0);
        }
    };
    AppProvider.prototype.getLSKey = function (course) {
        /**
         * Get a lesson key counter
         * @type {string}
         */
        var str = "";
        var usrData = this.evt.getUserContextKeys(!this.hasLoggedIn());
        var usr = typeof usrData != 'undefined' ? usrData[1] : '';
        if (typeof course == 'undefined') {
            str = "lcCnt" + usr + this.today.toDateString();
        }
        else {
            str = "lcCnt" + usr + course + this.today.toDateString();
        }
        return str.tephash();
    };
    /**
     *
     * set the Lesson counter in localStorage after courseHistory have been refreshed
     *
     * @private
     */
    AppProvider.prototype._setCourseCounters = function () {
        var _this = this;
        if (typeof this.courseHistory != 'undefined') {
            var lessonCtr_1 = { 'total': {} };
            var dayContext_1;
            var courseContext_1;
            var dtTotal_1 = 'total';
            this.courseHistory.forEach(function (val) {
                courseContext_1 = val.courseNumber;
                dayContext_1 = _this.getFullDayFromTS(val.timeCompleted);
                if (typeof lessonCtr_1[courseContext_1] == 'undefined') {
                    lessonCtr_1[courseContext_1] = {};
                    lessonCtr_1[courseContext_1][dayContext_1] = 1;
                }
                else {
                    if (typeof lessonCtr_1[courseContext_1][dayContext_1] == 'undefined') {
                        lessonCtr_1[courseContext_1][dayContext_1] = 1;
                    }
                    else {
                        lessonCtr_1[courseContext_1][dayContext_1] += 1;
                    }
                }
                if (typeof lessonCtr_1[dtTotal_1][dayContext_1] == 'undefined') {
                    lessonCtr_1[dtTotal_1][dayContext_1] = 1;
                }
                else {
                    lessonCtr_1[dtTotal_1][dayContext_1] += 1;
                }
            });
            this.lessonCtr = lessonCtr_1;
            localStorage.lessonCtr = JSON.stringify(lessonCtr_1);
        }
    };
    /**
     *
     * Get day context in format YYYYMMDD from a given timestamp. Defaults to today.
     *
     * @param ts
     * @returns {string|any}
     */
    AppProvider.prototype.getFullDayFromTS = function (ts) {
        var dayContext;
        var dt;
        if (typeof ts == 'undefined') {
            //today
            dt = new Date();
        }
        else {
            //ts provided
            dt = new Date(parseInt(ts) * 1000);
        }
        dayContext = '' + dt.getFullYear() + dt.getMonth() + dt.getDate();
        return dayContext;
    };
    /**
     *
     * Check total remaining new lessons for the day
     * w/o params shows total for all courses
     *
     * @param course
     * @returns {number}
     */
    AppProvider.prototype.getLessonsRemainingToday = function (course) {
        var totalRemCnt = (__WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].totalDailyLessonLimit - this.getLessonsCompletedToday());
        if (typeof course == 'undefined') {
            return totalRemCnt;
        }
        else {
            if (totalRemCnt <= 0) {
                //no more lessons for the entire day on all courses;
                console.log("no more lessons for today");
                return 0;
            }
            if (this.courses[course] != 'undefined') {
                var remCnt = (__WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].courseDailyLessonLimit - this.getLessonsCompletedToday(course));
                if (this.hasLoggedIn()) {
                    return (remCnt >= 0 ? remCnt : 0);
                }
                else {
                    //add 1 for locked lesson day
                    var remCntPlusLocked = remCnt + 1;
                    if (remCntPlusLocked >= __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].anonUserLessonLimit) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
        }
    };
    AppProvider.prototype.getAdditionalLesson = function (course) {
        /**
         * Get one additional lesson if there are still lesson credits for the day
         */
        if (this.getCourseProgress(course) >= this.getCourseDuration(course)) {
            return 0;
        }
        return (this.getLessonsRemainingToday(course) > 0 ? 1 : 0);
    };
    AppProvider.prototype.getProgressStateFromEvt = function () {
        var _this = this;
        return this.evt.getUserCustomFields().then(function (customFields) {
            console.log("customFields");
            console.log(customFields);
            if (typeof customFields != 'undefined') {
                _this.userCustomFields = customFields;
                var cl = null;
                var cc = "";
                if (customFields.hasOwnProperty('courseHistory') && customFields.courseHistory.length > 0) {
                    _this.courseHistory = customFields.courseHistory;
                    var lastLessonCompleted = _this.getLastCompletedLesson();
                    if (typeof lastLessonCompleted !== 'undefined') {
                        cl = lastLessonCompleted.lessonNumber;
                        cc = lastLessonCompleted.courseNumber;
                    }
                }
                if (customFields.hasOwnProperty('currentLesson')) {
                    _this.currentLesson = parseInt(customFields.currentLesson);
                }
                else if (cl !== null) {
                    _this.currentLesson = cl;
                }
                if (customFields.hasOwnProperty('currentCourse')) {
                    _this.currentCourse = customFields.currentCourse;
                }
                else if (cc !== "") {
                    _this.currentCourse = cc;
                }
                return customFields;
            }
        });
    };
    AppProvider.prototype.getLessonCompletedFromEVT = function () {
        return this.evt.getAction('_LessonCompleted');
    };
    AppProvider.prototype.subscribeCourseHistory = function () {
        this.evt.getUserCustomFields().then(function (customFields) {
            customFields.courseHistor;
        });
    };
    AppProvider.prototype.hasStartedCourse = function (course) {
        console.log("hasStarted " + typeof this.progressArr[course] != 'undefined');
        console.log(this.progressArr);
        return (typeof this.progressArr[course] != 'undefined');
    };
    AppProvider.prototype.hasCompletedCourse = function (course) {
        return (this.hasStartedCourse(course) && this.getCourseProgress(course) == this.getCourseDuration(course));
    };
    AppProvider.prototype.hasLessonCompleted = function (lessonData) {
        if (typeof this.progressArr != 'undefined' && typeof this.progressArr[lessonData.course] != 'undefined') {
            return (this.progressArr[lessonData.course].indexOf(lessonData.day) >= 0);
        }
    };
    AppProvider.prototype.getCourseState = function (course) {
        /**
         * Return
         * [ course progress,
         *   course total duration,
         *   current lesson,
         *   next lesson]
         *
         */
        var crsProgress = 0;
        var crsDuration = 0;
        var crsLastLesson = 0;
        var crsNextLesson = 1;
        if (typeof this.progressArr[course] != 'undefined') {
            console.log('course state this.progressArr');
            crsProgress = this.getCourseProgress(course);
            crsDuration = this.getCourseDuration(course);
            crsLastLesson = this.getCurrentLesson(course);
            if (crsDuration > crsLastLesson) {
                crsNextLesson = crsLastLesson + this.getAdditionalLesson(course);
                console.log('course state getAdditionalLesson', this.getAdditionalLesson(course));
            }
            else {
                crsNextLesson = crsLastLesson;
            }
        }
        else {
            crsProgress = 0;
            crsDuration = this.getCourseDuration(course);
            crsLastLesson = 0; //last Lesson Completed
            crsNextLesson = 1;
        }
        var st = [crsProgress, crsDuration, crsLastLesson, crsNextLesson];
        console.log('course state: ', course, st);
        console.log(st);
        //this.activeCourseState[course] = st;
        return st;
    };
    AppProvider.prototype.nextLesson = function (course) {
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
    };
    AppProvider.prototype.lastLesson = function (course) {
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
    };
    AppProvider.prototype.courseDuration = function (course) {
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
    };
    AppProvider.prototype.progressCount = function (course) {
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
    };
    AppProvider.prototype.hasNextLesson = function (course) {
        if (this.getCourseProgress(course) >= this.getCourseDuration(course)) {
            //has reached end
            return false;
        }
        return (this.nextLesson(course) !== this.getCourseProgress(course));
    };
    AppProvider.prototype.getCourseDuration = function (course) {
        if (typeof this.courses != 'undefined' && typeof this.courses[course] != 'undefined') {
            //console.log(this.courses[course]);
            return Object.keys(this.courses[course]).length;
        }
        else {
            return 10;
        }
    };
    AppProvider.prototype.getCourseProgress = function (course) {
        /**
         * returns 0 or the lesson day
         */
        //console.log("PROGRESS ARRAY");
        //console.log(this.progressArr);
        return (typeof this.progressArr[course] != 'undefined') ? this.progressArr[course].length : 0;
    };
    AppProvider.prototype.getTotalAvailableLessons = function (course) {
        /**
         * Get total available lessons. Separate branches between Anon and Logged-in user
         */
        if (this.hasLoggedIn()) {
            var availableLessons = this.getLastCompletedLesson().lessonNumber > 0 ? this.lastLesson(course) : 0;
            return availableLessons;
        }
        else {
            var progressCnt = this.getCourseProgress(course);
            console.log("progressCnt" + progressCnt);
            if (progressCnt >= __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].anonUserLessonLimit) {
                return __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].anonUserLessonLimit; //only 1 lesson available for anon user
            }
            else {
                return this.lastLesson(course);
            }
        }
    };
    AppProvider.prototype.getArrDay = function (course) {
        //add a lesson if there are lesson credit remaining and if there's history
        var arrDay = [];
        var availableLessons = this.getTotalAvailableLessons(course);
        for (var i = 0; i < availableLessons; i++) {
            var iDay = i + 1;
            var st = !(iDay == this.nextLesson(course));
            arrDay.push({ day: iDay, status: st });
        }
        //console.log("lastLesson" + this.lastLesson(course));
        //console.log(arrDay);
        //console.log("hasNextLesson:" + this.hasNextLesson(course));
        return arrDay;
    };
    AppProvider.prototype.getLastCompletedLesson = function () {
        if (typeof this.courseHistory != 'undefined' && this.courseHistory.length > 0) {
            return this.courseHistory[this.courseHistory.length - 1];
        }
        else {
            return {
                courseNumber: "",
                lessonNumber: 0
            };
        }
    };
    AppProvider.prototype.getLastActiveCourse = function () {
        if (typeof this.getLastCompletedLesson() != 'undefined' && this.getLastCompletedLesson().lessonNumber > 0) {
            return this.getLastCompletedLesson()['courseNumber'];
        }
        else {
            return 'Mindfulness';
        }
    };
    AppProvider.prototype.hasActiveCourse = function () {
        /**
         * Check if Active course has been initialize or set
         */
        return (typeof this.activeCourse != 'undefined');
    };
    AppProvider.prototype.getCourseData = function (course) {
        /**
         * Get all lessons of a course
         */
        if (typeof this.courses == 'undefined' || typeof this.courses[course] == 'undefined') {
            return;
        }
        var s = this.courses[course];
        return s;
    };
    AppProvider.prototype.hasLoggedIn = function () {
        return this.auth.loggedIn();
    };
    AppProvider.prototype.getLessonData = function (course, lessonId) {
        if (typeof this.courses[course] != 'undefined') {
            return this.courses[course][lessonId];
        }
    };
    AppProvider.prototype.isNextLessonLocked = function (course) {
        if (!this.hasLoggedIn()) {
            //logged in, no lock, don't bother
            var nextLesson = this.nextLesson(course);
            if (typeof nextLesson != 'undefined') {
                if (nextLesson > __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].anonUserLessonLimit) {
                    return true;
                }
            }
        }
        return false;
    };
    AppProvider.prototype.startLogin = function () {
        console.log("Login action called");
        localStorage.loginStarted = 1;
    };
    AppProvider.prototype.resetThngContext = function () {
        localStorage.removeItem("myThng");
        localStorage.removeItem("myProduct");
    };
    AppProvider.prototype.completeLogin = function (userData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (typeof localStorage.loginStarted != 'undefined') {
                console.log("finalizeLogin");
                //set evt user info
                self.auth.setEVTInfo();
                //reset the THNG context
                self.resetThngContext();
                //set the age gate data from auth0 user metadata
                if (typeof userData != 'undefined') {
                    var umd = self.auth.isFB() === true ? userData[__WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'] : userData['user_metadata'];
                    if (typeof umd['dob'] != 'undefined') {
                        var agd = new Date().getFullYear() - parseInt(umd['dob']['year']);
                        self.saveAgeGateData(agd, false, umd['dob']);
                    }
                }
                self.evt.createUserAction("_Login").then(function () {
                    self.evt.getThngContext().then(function (th) {
                        console.log("getThngContext");
                        console.log(th);
                        if (typeof th != "undefined") {
                            if (typeof localStorage.myThng == 'undefined') {
                                self.saveThngContext(th);
                            }
                            resolve(th);
                        }
                        else {
                            resolve(false);
                        }
                    });
                    localStorage.removeItem('loginStarted');
                });
            }
            else {
                resolve(false);
            }
        });
    };
    AppProvider.prototype.setBeginTS = function () {
        /**
         * set beginning of use
         */
        console.log(typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get('ts_begin'));
        if (typeof __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get('ts_begin') == 'undefined' || !__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get('ts_begin')) {
            var dy = Date.now(); //start of the day
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('ts_begin', dy.toString(), __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].thngDaysLifeSpan);
        }
    };
    AppProvider.prototype.getBeginTS = function () {
        /**
         * return since beginning of use.
         */
        return parseInt(__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get('ts_begin'));
    };
    AppProvider.prototype.hasSignInNotice = function () {
        /**
         * Check if there's a need to popup a signin notice
         */
        if (!this.hasLoggedIn()) {
            var daysSince = Math.floor((Date.now() - parseInt(this.getBeginTS())) / (86400 * 1000));
            if (daysSince >= __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].anonUserDaysToSignInNotice) {
                console.log('daysSince:' + daysSince);
                return true;
            }
        }
        return false;
    };
    AppProvider.prototype.getUserCreatedAt = function () {
        if (this.hasLoggedIn() && typeof localStorage.userInfo != 'undefined') {
            //only for logged in
            var usr = JSON.parse(localStorage.userInfo);
            var userCreatedAt = void 0;
            if (this.auth.isFB()) {
                //OIDC-conformant authentication, passwordless
                userCreatedAt = new Date(usr[__WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'].created_at);
            }
            else {
                userCreatedAt = new Date(usr.created_at);
            }
            return userCreatedAt;
        }
    };
    AppProvider.prototype.hasReorderNotice = function () {
        if (this.hasLoggedIn()) {
            var daysSinceCreatedAt = Math.floor((Date.now() - this.getUserCreatedAt().getTime()) / (86400 * 1000));
            console.log('daysSinceCreatedAt: ' + daysSinceCreatedAt);
            if (daysSinceCreatedAt >= __WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].dayToReorderNotice) {
                return true;
            }
        }
    };
    /**
     * Registration have been started, completed in Auth0.
     * Registered user local actions is not yet connected in EVT
     *
     * @param regAuth0UserId
     */
    AppProvider.prototype.startReg = function (regAuth0UserId) {
        console.log("startReg:" + regAuth0UserId);
        //create the action anyway, but add registerIdType
        this.evt.createThngAction("_Activated", {
            customFields: {
                registeredUserIdType: 'auth0',
                registeredUserId: regAuth0UserId
            }
        }, true); //called against on anon user
        localStorage.regStarted = regAuth0UserId;
    };
    /**
     * Complete the registration process
     * - checks user_metadata from auth0
     * - checks that regid and local device are equivalent
     * - calls the _Activated action with evt user id w/ anon user
     *
     * @param userData
     *
     */
    AppProvider.prototype.completeReg = function (userData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var regEvtUserId;
            var regAuth0UserId;
            if (self.auth.isFB()) {
                regEvtUserId = userData[__WEBPACK_IMPORTED_MODULE_8__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'].evrythngUserData.evrythngUser;
                regAuth0UserId = 'facebook';
            }
            else {
                regEvtUserId = userData.user_metadata.evrythngUserData.evrythngUser;
                regAuth0UserId = userData.user_id.replace('auth0|', '');
            }
            if (typeof localStorage.regStarted != 'undefined' && regEvtUserId && regAuth0UserId) {
                console.log("reg start detected");
                if (localStorage.regStarted === regAuth0UserId) {
                    //valid registration to complete
                    console.log("valid registration to complete");
                    resolve(self.evt.createThngAction("_Activated", {
                        customFields: {
                            registeredUserIdType: 'evt',
                            registeredUserId: regEvtUserId
                        }
                    }, true).then(//called with anon user
                    function (//called with anon user
                        es) {
                        localStorage.removeItem("regStarted");
                    }));
                }
                else {
                    resolve(false);
                }
            }
            else {
                resolve(false);
            }
        });
    };
    /**
     * Common method to remove locally stored progress tracking data
     *
     */
    AppProvider.prototype.clearLocalHistory = function () {
        localStorage.removeItem('courseHistory');
        localStorage.removeItem('courses');
        localStorage.removeItem('progressArr');
        localStorage.removeItem('lessonCtr');
    };
    return AppProvider;
}());
AppProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_6__providers_evt_evt__["a" /* EvtProvider */],
        __WEBPACK_IMPORTED_MODULE_9__providers_auth_auth_service__["a" /* AuthService */]])
], AppProvider);

//# sourceMappingURL=app.js.map

/***/ }),

/***/ 203:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 203;

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_auth0_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// src/app/auth/auth.service.ts




var AuthService = (function () {
    function AuthService() {
        this.clientDefId = "ZQzpUoZgrpMC4pKn3ipIfgSudQ9J_uE1";
        this.clientDefSecret = "1omoA1OU8WmxdLpiCXvaTcsgLDRXsOUCbrmQ1U3BTtLg_P0MinVMqDRoYmQFcJxG";
        /* main auth0 variable. */
        this.webAuth = new __WEBPACK_IMPORTED_MODULE_2_auth0_js__["WebAuth"]({
            clientID: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.clientID,
            domain: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.domain,
            responseType: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.responseType,
            audience: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.audience,
            redirectUri: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.redirectUri,
            scope: 'openid'
        });
        this.lock = new Auth0Lock(__WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.clientID, __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.domain);
        this.projectId = __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].projectId;
    }
    /* Check if a user is logged in. */
    AuthService.prototype.loggedIn = function () {
        if (localStorage.getItem('access_token') && localStorage.getItem('access_token') != "") {
            return true;
        }
        else {
            return false;
        }
    };
    /* Sign up for email-based account. First name *
     * and last name is included in the            *
     * user_metadata so that we can track it       *
     * Not needed for FB based signup              */
    AuthService.prototype.signup = function (usr, fName, lName) {
        var _this = this;
        if (fName === void 0) { fName = ''; }
        if (lName === void 0) { lName = ''; }
        return new Promise(function (resolve, reject) {
            _this.webAuth.signup({
                connection: 'Username-Password-Authentication',
                email: usr.email,
                password: usr.pass,
                user_metadata: {
                    firstName: fName,
                    lastName: lName
                }
            }, function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ msg: "Signup successfull", data: response });
                }
            });
        });
    };
    /* Login/Signup for fb-based account */
    AuthService.prototype.fbAuth = function () {
        this.webAuth.authorize({
            connection: 'facebook',
            scope: 'openid profile email phone user_metadata'
        });
    };
    /* login for email-based account */
    AuthService.prototype.login = function (usr) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.webAuth.redirect.loginWithCredentials({
                connection: 'Username-Password-Authentication',
                username: usr.email,
                password: usr.pass,
                scope: 'openid'
            }, function (err, authResult) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(authResult);
                }
                // Auth tokens in the result or an error
            });
        });
    };
    // Parse the authentication result
    AuthService.prototype.result = function (authResult) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) {
            /* The user did not allow auth0 to access his/her data */
            if (authResult.error) {
                console.log(authResult.error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('id_token');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('evrythngInfo');
                reject(authResult.error);
            }
            else if (typeof authResult.access_token != 'undefined') {
                _this.webAuth.client.userInfo(authResult.access_token, function (err, user) {
                    /* Successful auth */
                    var umd = self._parseUserMetadata(user);
                    if (user && typeof umd.deleted == 'undefined') {
                        localStorage.setItem('access_token', authResult.access_token);
                        localStorage.setItem('id_token', authResult.id_token);
                        console.log("auth result is ", authResult);
                        console.log(user);
                        localStorage.setItem('userInfo', JSON.stringify(user));
                        self.userInfo = user;
                        resolve(user);
                        /* Failure at auth */
                    }
                    else if (err) {
                        // Handle errors
                        console.log(user, err);
                        self._removeLocalUserData();
                        reject(err);
                    }
                    else {
                        resolve("deleted_user");
                        // self._removeLocalUserData();
                        // try {
                        //   // console.log("user is ", user);
                        //   // reject(umd.deleted ? "deleted user" : "");
                        // } catch (err) {
                        //   reject(err);
                        // }
                    }
                });
            }
        });
    };
    /***
     * Private fn for parsing user_metadata or various namespaces - email, FB
     *
     * @param user
     * @returns {any}
     * @private
     */
    AuthService.prototype._parseUserMetadata = function (user) {
        if (typeof user.sub != 'undefined' && user.sub.indexOf('facebook') > -1) {
            //facebook
            return user[__WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'];
        }
        else if (typeof user.user_metadata != 'undefined') {
            return user.user_metadata;
        }
        else {
            return {};
        }
    };
    AuthService.prototype._removeLocalUserData = function () {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('evrythngInfo');
        localStorage.removeItem('courseHistory');
    };
    /* store EVT info in the localstorage */
    AuthService.prototype.setEVTInfo = function () {
        if ((localStorage.access_token && localStorage.id_token) && (!localStorage.evrythngInfo || localStorage.evrythngInfo === "undefined")) {
            var user = this.getUserDetailsFromStorage();
            var res = Object.keys(user).filter(function (a) { return (a.indexOf("user_metadata") > -1); });
            console.log('setEVTInfo');
            console.log(res);
            if (typeof res != 'undefined' && typeof user[res[0]].evrythngUserData != 'undefined') {
                var evrythngUserData = user[res[0]].evrythngUserData;
                localStorage.setItem('evrythngInfo', JSON.stringify(evrythngUserData));
            }
        }
    };
    /* get the user details from the auth0 platform using access_token */
    AuthService.prototype.getUserDetails = function () {
        this.lock.getUserInfo(localStorage.getItem('access_token'), function (error, profile) {
            if (!error) {
                console.log(profile);
            }
        });
    };
    /* Get the user details from local storage */
    AuthService.prototype.getUserDetailsFromStorage = function () {
        return JSON.parse(localStorage.getItem('userInfo'));
    };
    /* Get the user details from local storage */
    AuthService.prototype.setUserMetadata = function (meta) {
        var usr = this.getUserDetailsFromStorage();
        usr.user_metadata = meta;
        if (this.isFB()) {
            //decorate the namespaced user_metadata field of FB users as well
            usr[__WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'] = meta;
        }
        console.log(usr);
        localStorage.setItem('userInfo', JSON.stringify(usr));
    };
    /* Get the user metadata from local storage */
    AuthService.prototype.getUserMetadataFromStorage = function () {
        if (this.isFB()) {
            return JSON.parse(localStorage.getItem('userInfo'))[__WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'];
        }
        return JSON.parse(localStorage.getItem('userInfo'))['user_metadata'];
    };
    /* trigger logout. User should redirect to the returnTo field specified below */
    AuthService.prototype.logout = function () {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('evrythngInfo');
        localStorage.removeItem('myThng');
        localStorage.removeItem('isAnon');
        localStorage.removeItem('anonUserInfo');
        localStorage.removeItem('anonEvrythngInfo');
        localStorage.removeItem('regStarted');
        localStorage.removeItem('myProduct');
        localStorage.removeItem('alive');
        localStorage.removeItem('courseHistory');
        localStorage.removeItem('lessonCtr');
        this.webAuth.logout({
            returnTo: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.redirectUri,
            clientID: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.clientID
        });
    };
    /* Update user metadata via auth0 manage */
    AuthService.prototype.updateUser = function (usrMetaData) {
        var umd = this.getUserMetadataFromStorage();
        if (typeof umd == 'undefined') {
            umd = {};
        }
        umd["firstName"] = usrMetaData.firstName;
        umd["lastName"] = usrMetaData.lastName;
        if (typeof usrMetaData.deleted != 'undefined') {
            umd["deleted"] = usrMetaData.deleted;
        }
        if (typeof usrMetaData.dob != 'undefined') {
            umd["dob"] = usrMetaData.dob;
        }
        var auth0Manage = new __WEBPACK_IMPORTED_MODULE_2_auth0_js__["Management"]({
            domain: __WEBPACK_IMPORTED_MODULE_0__config_environment__["a" /* Config */].auth0.domain,
            token: localStorage.getItem('id_token')
        });
        var usrInfo = this.getUserDetailsFromStorage();
        var uid;
        if (this.isFB()) {
            uid = usrInfo['sub'];
        }
        else {
            uid = usrInfo['user_id'];
        }
        //console.log(usrInfo);
        return new Promise(function (resolve, reject) {
            auth0Manage.patchUserMetadata(uid, umd, function (err, resp) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(resp);
                }
            });
        });
    };
    /* check if FB based account or email-based  *
     * FB accounts have the 'sub' variable. This *
     * is what we check                          */
    AuthService.prototype.isFB = function () {
        try {
            return this.getUserDetailsFromStorage()['sub'] && this.getUserDetailsFromStorage()['sub'].indexOf("facebook") > -1;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    };
    /*
    * Delete the user account via user management client
    * User management should not be used. by Rex 11/17/2017
    *
    * */
    AuthService.prototype.deleteUser = function () {
        return new Promise(function (resolve, reject) { return resolve(false); });
    };
    /*
    * User management should not be used. by Rex 11/17/2017
    *
    * */
    AuthService.prototype.updatePassword = function (newPass) {
        return new Promise(function (resolve, reject) { return resolve(false); });
    };
    /**
     *
     * Check user
     * User management should not be used. by Rex 11/17/2017
     *
     * @param mail
     * @returns {Promise<T>}
     */
    AuthService.prototype.searchUser = function (mail) {
        return new Promise(function (resolve, reject) { return resolve(false); });
    };
    /* Update password */
    AuthService.prototype.changePassword = function (mail) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.webAuth.changePassword({
                connection: 'Username-Password-Authentication',
                email: mail
            }, function (err, resp) {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(resp);
                }
            });
        });
    };
    AuthService.prototype.parseErrCode = function (err) {
        if (typeof err.code != 'undefined') {
            return err.code;
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return aura; });
var aura = [
    {
        "Day": 1,
        "Course": "Mindfulness",
        "Title": "How to Sit",
        "Description": "This meditation was designed with the beginner in mind. It will guide you through the basics of how to sit in meditation and help you to start developing your practice.",
        "Author": "Happiness Insight",
        "ID": "hi1",
        "path": "How to Sit.html"
    },
    {
        "Day": 2,
        "Course": "Mindfulness",
        "Title": "Beginner's Mind",
        "Description": "There's a Chinese saying which states \"Renew yourself, completely each day. Do it again, and forever again.\" In this session we view our whole body as though it's brand new, no previous stories attached. Discover a new, curious relationship with your body, your mind and your life today.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e136",
        "path": "Beginner_s Mind.html"
    },
    {
        "Day": 3,
        "Course": "Mindfulness",
        "Title": "Body Scan",
        "Description": "Give your mind and body the gift of compassionate presence through this core mindfulness practice.",
        "Author": "Ryan James Kenny",
        "ID": "r6",
        "path": "Body Scan - Ryan James.html"
    },
    {
        "Day": 4,
        "Course": "Mindfulness",
        "Title": "Breath Sensing",
        "Description": "This guided meditation will help quiet your mind and settle your nervous system by paying attention to your breath. Breath sensing is an effective way to calm down and refocus, and can be used anytime, anywhere to return to your center.",
        "Author": "Cassandra Carlopio",
        "ID": "-Kr3D9jPCHwW31EQ2lxK",
        "path": "Breath Sensing.html"
    },
    {
        "Day": 5,
        "Course": "Mindfulness",
        "Title": "Body Sweep Part by Part",
        "Description": "Practice giving your full attention to your body, part by part.",
        "Author": "Lisa Pollard",
        "ID": "lp4",
        "path": "Body Sweep Part by Part.html"
    },
    {
        "Day": 6,
        "Course": "Mindfulness",
        "Title": "Naming Thoughts",
        "Description": "There is a common misconception about meditation that it is all about \"stopping thoughts.\" But that can be an exercise in frustration, since our minds are accustomed to thinking. Rather, mindfulness is about bringing our full awareness to whatever is present for us, including our thoughts. In this meditation, you will practice naming the kinds of thoughts coming up for you. You will learn how to be the observer of your own thinking, which ultimately will allow you to respond to events in your life with wisdom, rather than being a reaction to them.",
        "Author": "Christina McMahon (Aura)",
        "ID": "b47",
        "path": "Naming Thoughts.html"
    },
    {
        "Day": 7,
        "Course": "Mindfulness",
        "Title": "Sounds",
        "Description": "When you meditate, it is always helpful to have something to anchor your attention to. Usually, that is your breathing. In this meditation, however, you will use the sounds in your environment as your attention anchor. This will train you to be more in tune with your senses and can create a deeper sense of awareness in your everyday life.",
        "Author": "Christina McMahon (Aura)",
        "ID": "b38",
        "path": "Sounds.html"
    },
    {
        "Day": 8,
        "Course": "Mindfulness",
        "Title": "Everyday Mindfulness",
        "Description": "A natural byproduct of mindfulness is becoming aware of what is in the moment and what's possible. It's not to change us but to help us hold presence. This ancient technique of gazing is a potent mindfulness practice in order to grow consciousness and to cultivate fierce focus. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "b31",
        "path": "Everyday Mindfulness.html"
    },
    {
        "Day": 9,
        "Course": "Mindfulness",
        "Title": "Muscle Relaxation",
        "Description": "Feeling stressed or tight? This practice will help you identify and release muscular tension.",
        "Author": "Lyndi Smith",
        "ID": "l3",
        "path": "Muscle Relaxation.html"
    },
    {
        "Day": 10,
        "Course": "Mindfulness",
        "Title": "Lovingkindness for Ourself and Others",
        "Description": "Loving yourself and others around you is one of the simplest yet most powerful way to bring happiness to yourself.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e72",
        "path": "Lovingkindness for Ourself and Others.html"
    },
    {
        "Day": 1,
        "Course": "Refreshing ",
        "Title": "Awakening Factor of Joy",
        "Description": "By returning to our practice, time after time, we can realise a peaceful and heart-fufilling life. A permanent and deep joy naturally bubbles up and we feel that spread all over our bodies. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e22",
        "path": "Awakening Factor of Joy.html"
    },
    {
        "Day": 4,
        "Course": "Refreshing ",
        "Title": "Breath Mindfulness",
        "Description": "Focus on your breathing as you breath gently. There is nothing else to do except notice that you are breathing. Allowing your experience to be simple and nourishing. ",
        "Author": "Kristy Arbon (Aura) ",
        "ID": "b20",
        "path": "Breath Mindfulness.html"
    },
    {
        "Day": 2,
        "Course": "Refreshing ",
        "Title": "Be with Open Awareness",
        "Description": "A broad awareness practice, to help us be with the whole of our present moment experience. ",
        "Author": "Mark Quirk",
        "ID": "-KqE-alcVOt93b8JYqvb",
        "path": "Be with Open Awareness.html"
    },
    {
        "Day": 3,
        "Course": "Refreshing ",
        "Title": "Becoming ",
        "Description": "This session is about becoming something that you know you can be. Whether it's having more patience, being more compassionate - whatever it is - climb into the moment with a little more attention and a little more care. In this session a internal body scan technique is used to release resistence and soften into what you are and what you're becoming. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e107",
        "path": "Becoming.html"
    },
    {
        "Day": 5,
        "Course": "Refreshing ",
        "Title": "Daily Refresh ",
        "Description": "Give yourself a time to refresh your perspective taking in the stillness of the moment, when we can feel deeply comfortable, relaxed and at ease. ",
        "Author": "Happiness Insight",
        "ID": "hi6",
        "path": "Good Morning.html"
    },
    {
        "Day": 6,
        "Course": "Refreshing ",
        "Title": "Gratitude For The People In Your Life",
        "Description": "Learn to offer gratitude to someone who has been good to you, cultivate and savour feelings of kindness and appreciation as a way to support your own wellbeing.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e81",
        "path": "Gratitude For The People In Your Life.html"
    },
    {
        "Day": 7,
        "Course": "Refreshing ",
        "Title": "Light",
        "Description": "Cultivate peace from within and share the light with everyone around you through this powerful visualisation practice. ",
        "Author": "Ryan James Kenny",
        "ID": "r4",
        "path": "Light.html"
    },
    {
        "Day": 8,
        "Course": "Refreshing ",
        "Title": "Sink into Stillness",
        "Description": "Underneath the busyness of our lives and our minds, there is a calm pool of stillness that we can always dip into. In this meditation you will connect with that stillness and return recharged and rejuvenated after this session. ",
        "Author": "Christina McMahon",
        "ID": "cd10",
        "path": "Sink Into Stillness.html"
    },
    {
        "Day": 9,
        "Course": "Refreshing ",
        "Title": "Spaciousness",
        "Description": "Space is everywhere. It's open, accepting, infinite, and indestructible. Tap into these freeing qualities as you open up to the spaciousness within you and around you.",
        "Author": "Ryan James Kenny",
        "ID": "-KpXhQlgYf2CwfkwIbwl",
        "path": "Spaciousness.html"
    },
    {
        "Day": 10,
        "Course": "Refreshing ",
        "Title": "Thank You",
        "Description": "In this session we find an easy, natural breathing pattern and attach an affirmation of gratitude, \"thank you\". It's a general thank you, and a full on inquiry into what it is you can be thankful for. Gratitude is the understanding that so many things have come together for us to just take one more breath, and that we're a part of something that is a privilege.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e41",
        "path": "Thank You.html"
    },
    {
        "Day": 1,
        "Course": "Focus",
        "Title": "21-Breaths Meditation ",
        "Description": "This short meditation practice can be helpful at times when the mind is really active, agitated or restless. By engaging the mind in focusing on a breathing routine and counting each breath up to twenty-one, the mind is encouraged to become calmer and more focussed. However, our intention is merely to encourage the mind, not to force it. We are approaching the practice with a sense of non-striving, allowing the mind to be as it is; if it is willing to settle, that’s fine, if not, that’s fine too – we simply notice it’s activity. If you become distracted and lose track of counting at any point, or if you reach twenty-one, simply begin again at one, and any time you wish to, simply let go of counting and observe the breath.",
        "Author": "William James Davies, DCMT",
        "ID": "-Kr7nvf3aTlO2-BB2K_4",
        "path": "21-Breaths Meditation.html"
    },
    {
        "Day": 2,
        "Course": "Focus",
        "Title": "Awareness of Sounds",
        "Description": "When we are beginning a meditation practice, we tend to have the idea that sounds are a distraction and we desire a perfectly tranquil, or soundproofed setting, for our spiritual endeavors. We should overcome that and learn how to be present in the moment, exactly as it is. If sounds are part of that present moment, use them as an object of focus to help turn your attention inward.",
        "Author": "Hilary Jackendoff",
        "ID": "-Krsk6E8H2wm2bJEID6t",
        "path": "Awareness of Sounds.html"
    },
    {
        "Day": 3,
        "Course": "Focus",
        "Title": "Body Scan",
        "Description": "Want to relax or refresh? The body scan is a relaxing way to become present by noticing bodily sensations.",
        "Author": "Lyndi Smith",
        "ID": "l10",
        "path": "Body Scan - Lyndi.html"
    },
    {
        "Day": 4,
        "Course": "Focus",
        "Title": "Breath & Sounds",
        "Description": "Pay attention to your breath and the sounds around you to increase focus.",
        "Author": "Lisa Pollard",
        "ID": "lp6",
        "path": "Breath _ Sounds.html"
    },
    {
        "Day": 5,
        "Course": "Focus",
        "Title": "Calm Inward Focus",
        "Description": "Gather yourself inward and for a few precious moments, stop focusing on the external environment and what's going on there. This session will give you intentional inward focus. We use a classical and effective yogic breathing technique to hone our focus and calm the mind. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e124",
        "path": "Calm Inward Focus.html"
    },
    {
        "Day": 6,
        "Course": "Focus",
        "Title": "Mindful Listening Meditation",
        "Description": "This meditation helps you to cultivate your present moment awareness. ",
        "Author": "Carla-Jo Geraghty",
        "ID": "-KpqM6NnPOWMiPfazwBO",
        "path": "Mindful Listening Meditation.html"
    },
    {
        "Day": 7,
        "Course": "Focus",
        "Title": "The Art of Stillness",
        "Description": "Experience the art and beauty of stillness in your mind and body so that you may experience a deeper calm that exists within you. ",
        "Author": "Dorothy Ratusny",
        "ID": "-KsWjlnpMIaScf3xkTxe",
        "path": "The Art of Stillness.html"
    },
    {
        "Day": 8,
        "Course": "Focus",
        "Title": "Three-Step Being Space",
        "Description": "Feeling a little overwhelmed or stuck? Use these 3 steps of awareness to create just enough space to make a decision about your next life steps.",
        "Author": "Mark Quirk",
        "ID": "-KqE8XxbYQuWS9e2yjHf",
        "path": "Three-Step Being Space.html"
    },
    {
        "Day": 9,
        "Course": "Focus",
        "Title": "Visualize Your Goals",
        "Description": "Do you have a cherished goal you're working toward? Visualisation is a powerful tool to get you focused and clear about achieving your goals. In order to \"be it,\" you have to be able to \"see it.\" Step into your best life with this powerful visualisation technique.",
        "Author": "C + D (Christina + Darrin)",
        "ID": "-KsOJxY1rZyyLWXAYTDK",
        "path": "Visualize Your Goals.html"
    },
    {
        "Day": 10,
        "Course": "Focus",
        "Title": "Waves of Breath",
        "Description": "Pause for a few minutes to let the breath wash away stress and bring you back to the present.",
        "Author": "Ryan James Kenny",
        "ID": "-Kpmuh_YqL9tYvY1Jb3O",
        "path": "Waves of Breath.html"
    },
    {
        "Day": 1,
        "Course": "Happiness",
        "Title": "Heart Light",
        "Description": "Find your true heart light",
        "Author": "C + D (Christina + Darrin)",
        "ID": "cd9(3)",
        "path": "Heart Light.html"
    },
    {
        "Day": 2,
        "Course": "Happiness",
        "Title": "Appreciative Joy",
        "Description": "In our world today we are subtly taught to focus on the flaws in others. But when we start re-training our brains to notice their goodness instead, we are actually investing in our own happiness. When we are able to notice others' virtues, we are better able to appreciate it in ourselves as well. That appreciation for goodness is what we will be practicing in this meditation.",
        "Author": "Christina McMahon (Aura)",
        "ID": "b40",
        "path": "Appreciative Joy.html"
    },
    {
        "Day": 3,
        "Course": "Happiness",
        "Title": "Attention to Happiness",
        "Description": "In this session we feel the sense of an inner smile radiating throughout the entire body, mind and more. We imagine pulsating cells brimming with joy and bliss. We will use breath and watch thoughts and sensations as they change, bringing a deep sense of enlivenment. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e4",
        "path": "Attention to Happiness.html"
    },
    {
        "Day": 4,
        "Course": "Happiness",
        "Title": "Comfortable Here",
        "Description": "Negative thoughts? This practice helps us direct attention away from thinking and enjoy comfortable sensations we may not be noticing.",
        "Author": "Lyndi Smith",
        "ID": "l6",
        "path": "Comfortable Here.html"
    },
    {
        "Day": 5,
        "Course": "Happiness",
        "Title": "Cultivating Joy",
        "Description": "Want to increase your happiness quota today? It may be as simple as tapping into the joy that others are experiencing. When you can do this with an open heart, it is an important corrective to feelings of envy. When you can feel genuine happiness for another person's win, you are communicating a new belief in abundance that there's more than enough happiness to go around.",
        "Author": "Christina McMahon (Aura)",
        "ID": "b35",
        "path": "Cultivating Joy.html"
    },
    {
        "Day": 6,
        "Course": "Happiness",
        "Title": "Gratitude",
        "Description": "Practice gratitude to cultivate happiness in your life.",
        "Author": "Heather Prete",
        "ID": "hp2",
        "path": "Gratitude.html"
    },
    {
        "Day": 7,
        "Course": "Happiness",
        "Title": "Gratitude Meditation",
        "Description": "It's so easy to wish that our lives were different - that we had a different job, lived in a different place or had a different partner. This is so often our pattern - break free of that pattern by acknowledging it when it arises and consciously cultivating gratitude. ",
        "Author": "Hilary Jackendoff",
        "ID": "-KrsjDZENifwb40CH-EL",
        "path": "Gratitude Meditation.html"
    },
    {
        "Day": 8,
        "Course": "Happiness",
        "Title": "Light of Lovingkindness",
        "Description": "Lovingkindness is the essence of a happy life. By generating boundless heart energy for ourselves and others, we open a gateway for more love to flow to us.",
        "Author": "Christina McMahon",
        "ID": "cd5",
        "path": "Light of Lovingkindness.html"
    },
    {
        "Day": 9,
        "Course": "Happiness",
        "Title": "Lovingkindness for a Friend",
        "Description": "Open the heart and mind and deepen your sense of connection with this lovingkindness practice directed towards a dear friend.  ",
        "Author": "Pause Meditation",
        "ID": "-Kq4taDGjhykrzvCgCEB",
        "path": "Loving-Kindness for a Friend.html"
    },
    {
        "Day": 10,
        "Course": "Happiness",
        "Title": "Offering Out Compassion and Lovingkindness",
        "Description": "When we're feeling great, when our own cup is full of feelings of well-being, we can make ourselves even happier by offering those feelings of kindness and well-being out to other people.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e68",
        "path": "Offering Out Compassion and Lovingkindness.html"
    },
    {
        "Day": 1,
        "Course": "Selflove",
        "Title": "A Moment of Self-Appreciation to Use Later",
        "Description": "Allowing yourself to feel some appreciation for yourself. Things that you've done in your life have lead to you feeling this way. Allow yourself to delight in yourself and all of your good work, and then save this feeling for a time when you'll need it in the future.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e84",
        "path": "A Moment of Self-Appreciation to Use Later.html"
    },
    {
        "Day": 2,
        "Course": "Selflove",
        "Title": "May You Have Everything You Need",
        "Description": "Sit with yourself, be with yourself for a few minutes and offer yourself words of support and encouragement. May you thrive, may you feel peaceful, may you remember that you are a precious human being, may you feel at ease.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e80",
        "path": "May You Have Everything You Need.html"
    },
    {
        "Day": 3,
        "Course": "Selflove",
        "Title": "Compassionate Self-talk",
        "Description": "We're so hard on ourselves. True healing takes place when we're able to show up to a given condition honestly and fully, the highs and the lows. In this session, create a hospitable space that includes kindness towards yourself.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e7",
        "path": "Compassionate Self-talk.html"
    },
    {
        "Day": 4,
        "Course": "Selflove",
        "Title": "I Am Enough",
        "Description": "This session uses slow, measured breaths to set it up so that you may do some self-inquiry. Look into the feeling of being overwhelmed and what other feelings come with it. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e131",
        "path": "I Am Enough.html"
    },
    {
        "Day": 5,
        "Course": "Selflove",
        "Title": "Just As It Is",
        "Description": "Bit by bit, tune into your inner world and notice what it's like to be you right now in your life. No need to figure anything out or fix anything, just noticing and letting it be. In this session we will use a body scan technique, allowing each part of our body to be just as it is.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e104",
        "path": "Just As It Is.html"
    },
    {
        "Day": 6,
        "Course": "Selflove",
        "Title": "Kindness to Self - Using Phrases",
        "Description": "In this kindness to self meditation we will gently cultivate a sense of warmth and kindness to ourselves. ",
        "Author": "Carla-Jo Geraghty",
        "ID": "-KsIu5LljrPj0tLf3qjj",
        "path": "Kindness to Self - Using Phrases.html"
    },
    {
        "Day": 7,
        "Course": "Selflove",
        "Title": "Manifestation and Empathetic Joy",
        "Description": "Empathetic Joy is delight in others' good fortune. When we view the world through the eyes of abundance, there's not much we can fail to attract into our own lives.",
        "Author": "Christina McMahon",
        "ID": "cd7",
        "path": "Manifestation and Empathetic Joy.html"
    },
    {
        "Day": 8,
        "Course": "Selflove",
        "Title": "Meditation for Inner Peace",
        "Description": "Experience inner peace deliberately as you choose a point of focus within your body and hold attention and awareness here. As you allow your breath to be directed into this area, feel the sensations of peacefulness throughout your body.",
        "Author": "Dorothy Ratusny",
        "ID": "-Krxk-O0zpOZ9MCZf-Xo",
        "path": "Meditation for Inner Peace.html"
    },
    {
        "Day": 9,
        "Course": "Selflove",
        "Title": "Self-Appreciation: 3 Things I Like About Myself",
        "Description": "Deep down, in the core of your being, there are some really good things about yourself that you really like - allow yourself to savour these good feelings.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e90",
        "path": "Self-Appreciation- 3 Things I Like About Myself.html"
    },
    {
        "Day": 10,
        "Course": "Selflove",
        "Title": "Worthiness",
        "Description": "This is a visualisation session. We imagine a golden spark that grows and grows, which is the energy that helps you see your self-worth and your higher self shining.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e43",
        "path": "Worthiness.html"
    },
    {
        "Day": 1,
        "Course": "Healing",
        "Title": "Boulders",
        "Description": "This is a motivating session for working through the thing that's holding you back. We use the metaphor of boulder in the center of your room that you keep ignoring. Choose what you're going to do to clear the way once and for all. Decide to change your life for the good. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e36",
        "path": "Boulders.html"
    },
    {
        "Day": 2,
        "Course": "Healing",
        "Title": "Breathing Kindness In, Releasing Difficulty Out",
        "Description": "Intentionally breathing in kindness. You especially need kindness right now and you can breathe this in for yourself. Breathing out whatever you don't need right now - intentionally letting go of any difficulty.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e56",
        "path": "Breathing Kindness In_ Releasing Difficulty Out.html"
    },
    {
        "Day": 3,
        "Course": "Healing",
        "Title": "Building Resilience",
        "Description": "Sometimes it can feel like we're going through life pushing a boulder uphill that's three times the size of us. There are so many things all at once and we can get overwhelmed. This session isn't about fixing it all, because we'll never really stop pushing that boulder. However this session will teach you how to become so much more resilient and stronger, so that the uphill game of life is less burdensome.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e37",
        "path": "Building Resilience.html"
    },
    {
        "Day": 4,
        "Course": "Healing",
        "Title": "Filled",
        "Description": "In this session, we close our eyes and go through the whole body piece by piece, filling it with light. We bring relaxed and vibrant attention into the body, and we settle the mind. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e99",
        "path": "Filled.html"
    },
    {
        "Day": 5,
        "Course": "Healing",
        "Title": "Freakout Formula",
        "Description": "This session will offer you a simple and profound freakout formula. See through your reactivity and ease your sufferring. These are steps to use mindfulness to help get out in front of the freaking out. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e20",
        "path": "Freakout Formula.html"
    },
    {
        "Day": 6,
        "Course": "Healing",
        "Title": "Letting Go of Resistance ",
        "Description": "When we fight our reality or struggle against change, we can inadvertently create more suffering for ourselves. By allowing ourselves to let go and accept things as they are, we suffer less. This meditation is designed to help you let go of the things that you can't control through the use of your body and mind. ",
        "Author": "Happiness Insight",
        "ID": "-Ksdh0wWxnyxA7vaXU8n",
        "path": "Letting Go of Resistance.html"
    },
    {
        "Day": 7,
        "Course": "Healing",
        "Title": "Reinforcements",
        "Description": "In this session, we bring in all the reinforcements. Bring in your special memories, places, and people that give you a sense of peace and well-being and evoke feelings of comfort and rest. As the sense of ease and security remains, you'll discover that you have these inner resources with you all of the time. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e12",
        "path": "Reinforcements.html"
    },
    {
        "Day": 8,
        "Course": "Healing",
        "Title": "Self Compassion Break",
        "Description": "Learn to take a self-compassion break in your day. You deserve it! ",
        "Author": "Dea Rivera",
        "ID": "-Kqhcwmo7WUXVz8cmrwc",
        "path": "Self Compassion Break.html"
    },
    {
        "Day": 9,
        "Course": "Healing",
        "Title": "Soften and Let Go Again",
        "Description": "This session begins with deep breathing to make it easier to soften and loosen the grip physically, mentally, emotionally, and spiritually.",
        "Author": "Lauren Ziegler",
        "ID": "-KsP1iYUGYIV9VrUQZdf",
        "path": "Soften and Let Go Again.html"
    },
    {
        "Day": 10,
        "Course": "Healing",
        "Title": "This Emotion is not Me or Mine",
        "Description": "We don't choose to have difficult emotions. They are not ours to claim. We didn't create them, we can release them, and they don't define us. We can find a little relief in the moment by choosing to not hang on to difficult emotions.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e67",
        "path": "This Emotion is not Me or Mine.html"
    },
    {
        "Day": 1,
        "Course": "Relaxation",
        "Title": "Being Rocked by the Breath",
        "Description": "Noticing the gentle rhythm of your breathing, the way your body is sweetly rocked by the breath like a child being rocked in their parent's arms, allowing your body to be caressed by the breath.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e64",
        "path": "Being Rocked by the Breath.html"
    },
    {
        "Day": 2,
        "Course": "Relaxation",
        "Title": "Belly Breathing",
        "Description": "This session is focused on physically expanding your breathing. Breathing this way into the low abdomen will help calm emotions and the mind.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e96",
        "path": "Belly Breathing.html"
    },
    {
        "Day": 3,
        "Course": "Relaxation",
        "Title": "Body Scan",
        "Description": "This body scan trains awareness and opens capacity for feeling more subtly. It trains the ability to hone in and feel more concentrated and then widen to allow your awareness to include a broader span. It can have the side effect of relieving pain and anxiety. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "b2",
        "path": "Body Scan.html"
    },
    {
        "Day": 4,
        "Course": "Relaxation",
        "Title": "Letting Go of the Work Day",
        "Description": "When we transition from our work day to home, we can sometimes take home the work frustrations and stress from our day, and let it impact our home life. This meditation helps you to enter the \"third space\", a transitionary space that allows us to let go of work and our busy day, and enter into a new and replenished headspace. ",
        "Author": "Happiness Insight",
        "ID": "-Kqta0rtBcIYBpN3D5_P",
        "path": "Letting Go of the Work Day.html"
    },
    {
        "Day": 5,
        "Course": "Relaxation",
        "Title": "Letting Go Waterfall ",
        "Description": "This session uses a breathing practice to create the effect of a longer exhale. This has a soothing effect on the nervous system, calming the body and mind. It's a specific yoga technique to connect you with yourself in a safe way. It's especially helpful for those times we want to go to sleep, let go more, be clearer, or speak when needed.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e125",
        "path": "Letting Go Waterfall.html"
    },
    {
        "Day": 6,
        "Course": "Relaxation",
        "Title": "One Breath At A Time",
        "Description": "Distracted? Restless? This practice helps us become present by taking things one breath at a time.",
        "Author": "Lyndi Smith",
        "ID": "l9",
        "path": "One Breath At A Time.html"
    },
    {
        "Day": 7,
        "Course": "Relaxation",
        "Title": "Release",
        "Description": "This session uses a yogic breathing technique that is cooling to the body and has a deep effect of calming the nervous system, difficult emotions, and even soothes inflamation and pain in the body. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e94",
        "path": "Release.html"
    },
    {
        "Day": 8,
        "Course": "Relaxation",
        "Title": "Relaxation",
        "Description": "Relaxation is an art and a science. By relaxation, we mean a release of tension in both the mind and the body for a period of time to allow complete rest and revitalisation. Like sleep, only these days we tend to go to bed with so much tension that we wake up feeling exhausted. It's a life changing thing to get to relax.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e9",
        "path": "Relaxation.html"
    },
    {
        "Day": 9,
        "Course": "Relaxation",
        "Title": "Releasing Tension from the Body",
        "Description": "This practice involves letting tension go from each part of the body sequentially.",
        "Author": "Suzie Brown",
        "ID": "-KqmVgS6yx2vqT6FXbI0",
        "path": "Releasing Tension from the Body.html"
    },
    {
        "Day": 10,
        "Course": "Relaxation",
        "Title": "Soothing Breath",
        "Description": "Feeling tense? This practice helps us let go of tension and relax our mind and body.",
        "Author": "Lyndi Smith",
        "ID": "-KpprCahe4rGNmbmQncQ",
        "path": "Soothing Breath.html"
    },
    {
        "Day": 1,
        "Course": "Stress",
        "Title": "Be a Tree",
        "Description": "Imagine placing your back up against a large tree, feeling supported and steady. We use all the senses to imagine this tree and the warmth of the sun nourishing down into the trunk, to the roots. Relax into the tree and feel the sunlight nourishing you from the top of your head down into your feet. This is a meditation for becoming sturdy and grounded for when you're feeling under the weather or need some inspiration.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e93",
        "path": "Be a Tree.html"
    },
    {
        "Day": 2,
        "Course": "Stress",
        "Title": "Calmness in Mind and Body",
        "Description": "Calm your mind and body during stressful times. ",
        "Author": "Dorothy Ratusny",
        "ID": "d9",
        "path": "Calmness in Mind and Body.html"
    },
    {
        "Day": 3,
        "Course": "Stress",
        "Title": "Equanimity in You",
        "Description": "The only thing constant in life is change. So even when you are going through something difficult, you can take comfort in the fact that your life is always changing, and even difficult emotions eventually transform. We are all in a constant state of flux. When you can approach life from this perspective, you start living on an even keel, and even the most challenging of emotions don't seem so overwhelming.",
        "Author": "Christina McMahon (Aura)",
        "ID": "e53",
        "path": "Equanimity in You.html"
    },
    {
        "Day": 4,
        "Course": "Stress",
        "Title": "I Need to Take a Breather",
        "Description": "There are certain times in the day when we just need to take a breath and reconnect with ourselves. This meditaiton helps you to step out of the busyness of your day and gain back some clarity. ",
        "Author": "Happiness Insight",
        "ID": "hi2",
        "path": "I Need to Take a Breather.html"
    },
    {
        "Day": 5,
        "Course": "Stress",
        "Title": "Shifting from \"Doing\" to \"Being\"",
        "Description": "Are you firmly in \"doing\" mode today? Find some stress relief by giving yourself three minutes to sink into \"being.\" After you rejuvenate yourself, the action that you take today will be much more effective.",
        "Author": "C + D (Christina + Darrin)",
        "ID": "-KrNEFJ4vZygme71d56Z",
        "path": "Shifting from _Doing_ to _Being_.html"
    },
    {
        "Day": 6,
        "Course": "Stress",
        "Title": "Slowing Down in a Busy Day",
        "Description": "Our lives are busy. We tend to spend a lot of our day rushing from one thing to the next. This meditation allows you to slow down, find peace and serenity, and is particularly helpful if you have been feeling stressed or overwhelmed. ",
        "Author": "Happiness Insight",
        "ID": "-KsAEVTtVKqEx-8dqj8Q",
        "path": "Slowing Down in a Busy Day.html"
    },
    {
        "Day": 7,
        "Course": "Stress",
        "Title": "Taking Off the Shield",
        "Description": "Imagine being in a place where you just let the stressful things drip off you. Imagine letting some of the rigidity lift up off you so your breathing flows in and out with no hindrance. In this session we take off the shield and focus on ease of breathing. ",
        "Author": "Lauren Ziegler",
        "ID": "-KrECP1Nz_TtlY7D2N5L",
        "path": "Taking Off the Shield.html"
    },
    {
        "Day": 8,
        "Course": "Stress",
        "Title": "Thoughts on a Leaf",
        "Description": "Quiet your mind with this practice as you visualize a lovely stream alongside you.  It may be helpful when your mind feels busy or emotions feel strong",
        "Author": "Dea Rivera",
        "ID": "-KsHBNpfqyvomcc98SH7",
        "path": "Thoughts on a Leaf.html"
    },
    {
        "Day": 9,
        "Course": "Stress",
        "Title": "Time Alone in Nature ",
        "Description": "This is a visualisation session. We bring to mind a special place in nature and access the feelings this place provides. This is about cultivating an \"inner resource\" by recalling the feeling of time alone in nature. ",
        "Author": "Lauren Ziegler",
        "ID": "-KrEE4frzzd3ZZcHV-4P",
        "path": "Time Alone in Nature .html"
    },
    {
        "Day": 10,
        "Course": "Stress",
        "Title": "Systematic Body Relaxation",
        "Description": "A stressed mind automatically implies a stressed body. In this session we work to relax the mind and body,  to help relieve stress and give you that much needed break. Recieve expert guidance in cycling your attention through your body systematically, a technique for feeling and releasing the tension that you don't need to be carrying. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e13",
        "path": "Systematic Body Relaxation.html"
    },
    {
        "Day": 1,
        "Course": "Anxiety",
        "Title": "10 Mindful Breaths",
        "Description": "Challenge yourself with this practice of breathing and counting, focusing solely on the breath. It's a simple practice, but not easy. ",
        "Author": "Dea Rivera",
        "ID": "-Kr8WOMm_AOnOrxj2YFl",
        "path": "10 Mindful Breaths.html"
    },
    {
        "Day": 2,
        "Course": "Anxiety",
        "Title": "Slowing Down",
        "Description": "When you're feeling stressed or anxious, everything seems to be moving quickly: thoughts race through your mind, and your heart may feel like it is going to explode in your chest. In this meditation, you'll intentionally slow down the breath, and then check in with your thoughts and your heart rate to see if they have also slowed.",
        "Author": "C + D (Christina + Darrin)",
        "ID": "-KqoTTpIs4i6PHKsTaIF",
        "path": "Slowing Down.html"
    },
    {
        "Day": 3,
        "Course": "Anxiety",
        "Title": "Befriending Difficulty",
        "Description": "Overwhelmed with emotions? This practice helps us accept and let go of our struggling.",
        "Author": "Lyndi Smith",
        "ID": "l11",
        "path": "Befriending Difficulty.html"
    },
    {
        "Day": 4,
        "Course": "Anxiety",
        "Title": "Calm",
        "Description": "Calm the mind with this simple yet powerful breath meditation. ",
        "Author": "Ryan James Kenny",
        "ID": "r2",
        "path": "Calm.html"
    },
    {
        "Day": 5,
        "Course": "Anxiety",
        "Title": "Where to Park Your Mind",
        "Description": "This session is about thought management and mature perspective and will give you the gift of looking at your situation in a new way, so that you can park your mind there and move forward with hope and strength. ",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e44",
        "path": "Where to Park Your Mind.html"
    },
    {
        "Day": 6,
        "Course": "Anxiety",
        "Title": "Gentleness",
        "Description": "We use a gently expanded breathing technique to bring relaxation into parts of the body, mind and more. This yogic technique of breathing into the back body (the lungs in the back) brings a sense of tenderness and ease, while leaving your feeling energised and poised for moving softly through your day with more flexibility.",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e112",
        "path": "Gentleness.html"
    },
    {
        "Day": 7,
        "Course": "Anxiety",
        "Title": "Letting Go of Anxiety ",
        "Description": "In our daily lives, if we stop and tune in, we can often sense a background hum of anxiety or stress. This meditation has been designed to help you let go of this constant feeling of stress and anxiety, and to inside find equanimity and peace. ",
        "Author": "Happiness Insight",
        "ID": "-KsM12wH81JsVHs7jblW",
        "path": "Letting Go of Anxiety.html"
    },
    {
        "Day": 8,
        "Course": "Anxiety",
        "Title": "S T O P Meditation",
        "Description": "The STOP meditation is a simple way to reconnect to yourself physically, mentally, and emotionally. You can do this practice throughout your day whenever you feel disconnected from yourself.",
        "Author": "Bill Scheinman",
        "ID": "-KqjDZXtyL2_G3QE53E4",
        "path": "S T O P Meditation.html"
    },
    {
        "Day": 9,
        "Course": "Anxiety",
        "Title": "Relief from Anxiety",
        "Description": "Experience a simple and effective way to regulate your breath that instantly slows your breathing rate, blood pressure and heart rate - allowing you relief from anxiety.",
        "Author": "Dorothy Ratusny",
        "ID": "-KrxqdWyodGUPsx506wa",
        "path": "Relief from Anxiety.html"
    },
    {
        "Day": 10,
        "Course": "Anxiety",
        "Title": "You Are A Deeply Caring Person",
        "Description": "We need to take care of ourselves so that we can take care of the people and tasks in our life. Take a few moments to connect with yourself and to remind yourself that you are worthy of your own care and concern, and the reason you feel stressed is because you are a deeply caring person.",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e62",
        "path": "You Are A Deeply Caring Person.html"
    }
];
//# sourceMappingURL=aura.config.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_aura_config_aura_config__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_progress_modal_progress_modal__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the AuraContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AuraContentPage = (function () {
    function AuraContentPage(navCtrl, navParams, app, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.sanitizer = sanitizer;
        this.auraLoc = __WEBPACK_IMPORTED_MODULE_3__assets_aura_config_aura_config__["a" /* aura */];
        this.module = {
            title: "Morning Meditations",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut blandit mi. Proin condimentum dolor vitae porttitor imperdiet. Cras erat ipsum, cursus feugiat ligula ac, posuere placerat elit. Nunc volutpat sollicitudin imperdiet. Maecenas lobortis quis sapien vel porta. Aenean cursus felis et tortor volutpat consectetur. Duis in condimentum ante, id viverra justo.ips",
            id: 'h1',
            link: this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/10%20Mindful%20Breaths.html"),
            author: 'AURA'
        };
        var data = this.navParams.get('data');
        /* If there are no data in navparams *
     * redirect to main page			 */
        if (typeof data == "undefined") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */]);
        }
        else {
            /* set the content details */
            console.log(data);
            this.module.title = data.title;
            this.module.description = data.desc;
            this.module.id = data.id;
            this.module.course = data.course;
            this.module.day = data.day;
            this.module.author = data.author;
            this.module.link = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/" + encodeURIComponent(data.path));
        }
    }
    AuraContentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AuraContentPage');
        this.app.startCourse(this.module);
    };
    AuraContentPage.prototype.loadScript = function (url, contentId) {
        console.log('preparing to load...');
        var node = document.createElement('script');
        node.setAttribute('id', 'aura-widget');
        node.setAttribute('data-content-id', contentId);
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('page-aura-content')[0].appendChild(node);
    };
    AuraContentPage.prototype.isframeLoaded = function () {
        console.log("isframeLoaded");
    };
    //ngAfterViewInit(){
    AuraContentPage.prototype.ionViewWillEnter = function () {
        var self = this;
        self.pmc.toggleView(false, this.module);
        // this.loadScript('../assets/scripts/widget.js',this.module.id);
        /* check if iframe has loaded */
        document.getElementById("aura-widget-div").onload = function (e) {
            var fp = e.srcElement;
            var frm = fp.contentWindow.document.getElementsByTagName('body')[0];
            frm.style.maxHeight = "100%"; // assign max height
            frm.style.margin = "0px"; // and margin css details
            var auraWidget = fp.contentWindow.document.getElementById('aura-widget-div');
            auraWidget.style.maxHeight = "100%";
            auraWidget.style.height = "100%";
            // fp.contentWindow.document.getElementById('aura-widget-div')
            /* TO DO: Add listener to aura player to track	*
             * play, pause, and audio completion			*/
            var handler = function (e) {
                var playBtn = fp.contentWindow.document.querySelector('div.audio.play');
                if (typeof self.listener == 'undefined') {
                    console.log('playBtn', playBtn);
                    self.listener = e;
                    playBtn.addEventListener('click', function (e) {
                        var ifStartPlay = fp.contentWindow.document.getElementById('play-btn').classList.contains('fa-play');
                        var ifStartPlayClassList = fp.contentWindow.document.getElementById('play-btn').classList;
                        console.log('ifStartPlay', ifStartPlay);
                        self.controlButtons(ifStartPlayClassList);
                    });
                }
                auraWidget.removeEventListener('DOMSubtreeModified', this, true);
            };
            auraWidget.addEventListener('DOMSubtreeModified', handler, true);
        };
    };
    AuraContentPage.prototype.ionViewWillLeave = function () {
        //remove timer on lost focus
        this.listener = null;
        this.app.stopLessonTimer(this.module);
    };
    AuraContentPage.prototype.controlButtons = function (ifStartPlayClassList) {
        this.app.playLesson(this.module, this.pmc, ifStartPlayClassList);
    };
    AuraContentPage.prototype.RemoveJsCss = function (filename, filetype) {
        var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none"; //determine element type to create nodelist from
        var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none"; //determine corresponding attribute to test for
        var allsuspects = document.getElementsByTagName(targetelement);
        for (var i = allsuspects.length; i >= 0; i--) {
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
                allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
        }
    };
    return AuraContentPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('aura'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], AuraContentPage.prototype, "auraComponent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], AuraContentPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_6__components_progress_modal_progress_modal__["a" /* ProgressModalComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__components_progress_modal_progress_modal__["a" /* ProgressModalComponent */])
], AuraContentPage.prototype, "pmc", void 0);
AuraContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-aura-content',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/aura-content/aura-content.html"*/'<aura-head></aura-head>\n<reorder-modal #reorder></reorder-modal>\n<progress-modal [day]="module?.day" [course]="module?.course"></progress-modal>\n<ion-content >\n    <!-- <div id="aura-widget-div" #aura></div> -->\n    <iframe id="aura-widget-div" [src]="module?.link" (load)="isframeLoaded()"></iframe>\n\n    <section class="description">\n    	<p class="title">\n    		Description\n    	</p>\n    	<p class="body">\n    		{{module?.description}}\n    	</p>\n\n      <p class="author">\n        by {{module?.author}}\n      </p>\n    </section>\n\n    <footer></footer>\n</ion-content>\n<aura-foot [reorder]="reorder"></aura-foot>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/aura-content/aura-content.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_app__["a" /* AppProvider */],
        __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
], AuraContentPage);

//# sourceMappingURL=aura-content.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ProgressModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProgressModalComponent = (function () {
    function ProgressModalComponent(nav, render, elem, app) {
        this.nav = nav;
        this.render = render;
        this.elem = elem;
        this.app = app;
        this.length = 10;
        this.show = false;
    }
    ProgressModalComponent.prototype.ngOnInit = function () {
        this.length = this.app.getCourseDuration(this.course);
        console.log("progress set", this.day, this.length);
    };
    ProgressModalComponent.prototype.toHome = function (course) {
        this.app.clearLocalHistory();
        //this.app.setActiveCourse(course);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__["a" /* AuraMainPage */], { reload: true, lastplayed: course });
    };
    /* toggle visibility of this component */
    ProgressModalComponent.prototype.toggleView = function (stat, course) {
        if (stat === void 0) { stat = !this.show; }
        this.show = stat;
        //this.course = course.course;
        //let progCnt = this.app.getCourseProgress(this.course);
        //this.day = progCnt > 0 && progCnt == this.day ? progCnt+1 : this.day;
        if (!this.show) {
            this.render.setStyle(this.elem.nativeElement, "display", "none");
        }
        else {
            this.render.setStyle(this.elem.nativeElement, "display", "block");
        }
    };
    return ProgressModalComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('day'),
    __metadata("design:type", Number)
], ProgressModalComponent.prototype, "day", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('course'),
    __metadata("design:type", String)
], ProgressModalComponent.prototype, "course", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('length'),
    __metadata("design:type", Number)
], ProgressModalComponent.prototype, "length", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('show'),
    __metadata("design:type", Boolean)
], ProgressModalComponent.prototype, "show", void 0);
ProgressModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'progress-modal',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/progress-modal/progress-modal.html"*/'<!-- Generated template for the ProgressModalComponent component -->\n<div class="container">\n  <h3 class="congrats">\n  Congratulations\n  </h3>\n  <h4 class="completion">\n  	DAY {{day}} COMPLETE\n  </h4>\n  <p>\n  	You\'ve completed<br/>\n  	<a class="rng">{{day}}</a> out of <a class="rng">{{length}}</a> sessions.\n  </p>\n  <button ion-button class="done" (tap)="toHome(course)">\n  	Done\n  </button>\n</div>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/progress-modal/progress-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */]])
], ProgressModalComponent);

//# sourceMappingURL=progress-modal.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sign_up_sign_up__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotPasswordPage = (function () {
    function ForgotPasswordPage(navCtrl, navParams, auth0, formBuilder, render) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.render = render;
        this.invalidEmail = false;
        this.emailSent = false;
        this.formGroup = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
        });
    }
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotPasswordPage');
    };
    ForgotPasswordPage.prototype.focused = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        this.render.addClass(node, "focused");
        //this.render.setStyle(node,"box-shadow","2px 2px 3px 1px rgb(240,119,33)");
    };
    ForgotPasswordPage.prototype.blurred = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        this.render.removeClass(node, "focused");
        //this.render.removeStyle(node,"box-shadow");
    };
    ForgotPasswordPage.prototype.toSignup = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    ForgotPasswordPage.prototype.reset_pass = function () {
        var self = this;
        self.auth0.changePassword(self.formGroup.value.email)
            .then(function (res) {
            self.invalidEmail = false;
            self.emailSent = true;
        })
            .catch(function (err) {
            self.invalidEmail = true;
            console.log(err);
        });
    };
    ForgotPasswordPage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        console.log("dismiss");
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }
    };
    return ForgotPasswordPage;
}());
ForgotPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-forgot-password',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/forgot-password/forgot-password.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Forgot Your Password</p>\n	<p class="form-desc">Verify your email and we will send you instructions on how to reset your password.</p>\n	<form [formGroup]="formGroup" id="forgotpw-form" #forgotPw>\n		<ion-row>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [ngClass]="{\'error\':invalidEmail,\'mailed\':emailSent}"></ion-input>\n		</ion-row>\n		<button ion-button id="reset" class="go-back" (tap)="reset_pass()" [disabled]="!formGroup.valid || emailSent">Reset Password</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="signup_btn" class="fbLogin" (tap)="toSignup()">Sign up</button>\n	</form>\n	\n</section>\n\n<footer></footer>\n\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/forgot-password/forgot-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */]])
], ForgotPasswordPage);

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_age_gate_age_gate__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Native QR scan handler / redirector
 *
 */
var ScanPage = (function () {
    function ScanPage(navCtrl, navParams, evt, app, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.evt = evt;
        this.app = app;
        this.loader = loader;
    }
    ScanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ScanPage');
    };
    ScanPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("ngOnInit ScanPage");
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: false
        });
        load.present();
        var thng = this.navParams.get("thng");
        this.evt.createAppUser(!this.app.hasLoggedIn()).then(function (usr) {
            _this.evt.getThngContextById(thng, !_this.app.hasLoggedIn()).then(function (thng) {
                _this.app.saveThngContext(thng);
                load.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_age_gate_age_gate__["a" /* AgeGatePage */]);
            }).catch(function (err) {
                load.dismiss();
                console.log("no thng like that", err);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
            });
        });
    };
    return ScanPage;
}());
ScanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-scan',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/scan/scan.html"*/'<ion-content padding id="homeMobile">\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/scan/scan.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__["a" /* EvtProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], ScanPage);

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forgot_password_forgot_password__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__aura_main_aura_main__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, render, auth0, formBuilder, loader, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.app = app;
        this.invalidLogin = false;
        this.invalidPass = false;
        this.isUserDeleted = false;
        this.formGroup = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        if (this.navParams.get('isUserDeleted'))
            this.isUserDeleted = true;
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        if (this.app.hasLoggedIn()) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__aura_main_aura_main__["a" /* AuraMainPage */]);
        }
    };
    LoginPage.prototype.focused = function (event) {
        var node = event._elementRef.nativeElement;
        this.render.addClass(node, "focused");
    };
    LoginPage.prototype.blurred = function (event) {
        var node = event._elementRef.nativeElement;
        this.render.removeClass(node, "focused");
    };
    LoginPage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        console.log("dismiss");
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.popTo(__WEBPACK_IMPORTED_MODULE_8__aura_main_aura_main__["a" /* AuraMainPage */]);
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        }
    };
    LoginPage.prototype.toSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    /**
     *
     * This is the email / password login CTA. Called when email+password and submit button is pressed
     */
    LoginPage.prototype.login = function () {
        var _this = this;
        var self = this;
        var usr = this.formGroup.value;
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        //console.log(usr);
        this.app.startLogin();
        this.auth0.login({ email: usr.email, pass: usr.password }).then(function (res) {
            //won't be reachable due to redirect to auth0. Next landing is home or auth0 callback
        })
            .catch(function (err) {
            console.log(err);
            //there is only 1 error state: invalid_user_password
            //
            if (_this.auth0.parseErrCode(err) == 'invalid_user_password') {
                self.isUserDeleted = false;
                self.invalidLogin = true;
                self.invalidPass = true;
            }
            load.dismiss();
        });
    };
    /**
     * This is the FB login CTA. Called when FB login button is pressed.
     *
     * @constructor
     */
    LoginPage.prototype.FBauth = function () {
        if (typeof localStorage.myThng != "undefined") {
            this.auth0.fbAuth();
            this.app.startReg('facebook');
        }
        else {
            this.app.startLogin();
            this.auth0.fbAuth();
        }
    };
    LoginPage.prototype.passwordReset = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/login/login.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Log In</p>\n	<p class="form-desc">Let\'s get started with your free mindulness sessions. Sign up <a class="linker" (tap)="toSignup()">here</a></p>\n	<form [formGroup]="formGroup" id="login-form" #loginForm>\n		<ion-row>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [ngClass]="{\'error\':invalidLogin, \'deleted-user\':isUserDeleted}"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)" [ngClass]="{\'error\':invalidPass}"></ion-input>\n		</ion-row>\n		<ion-row class="extra-top">\n			<a class="linker" (tap)="passwordReset()">Forgot your password?</a>\n		</ion-row>\n		<button ion-button id="login" class="getStarted" (tap)="login()" [disabled]="!formGroup.valid">Log In</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="loginFB" class="fbLogin" (tap)="FBauth()">Log in with Facebook</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_account_my_account__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DeleteAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DeleteAccountPage = (function () {
    function DeleteAccountPage(navCtrl, navParams, auth0, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth0 = auth0;
        this.loader = loader;
    }
    DeleteAccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DeleteAccountPage');
    };
    DeleteAccountPage.prototype.cancel = function () {
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__my_account_my_account__["a" /* MyAccountPage */]);
        }
    };
    DeleteAccountPage.prototype.safeDelete = function () {
        var _this = this;
        /**
         * Mark as deleted and log-out user
         *
         * @type {any}
         */
        var self = this;
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        this.auth0.updateUser({ deleted: true }).then(function (res) {
            console.log(res);
            self.auth0.setUserMetadata(res['user_metadata']);
            _this.auth0.logout();
        }).catch(function (err) {
            console.log(err);
            load.dismiss();
        });
    };
    DeleteAccountPage.prototype.delete = function () {
        //auth0 here,
        // update: Unused, removed by Rex 11/17/2017
        this.auth0.logout();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    return DeleteAccountPage;
}());
DeleteAccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-delete-account',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/delete-account/delete-account.html"*/'<ion-content>\n\n<section class="main">\n	<p class="form-title">Are you sure you want to delete your account?</p>\n	<p class="form-desc">This will erase your information and progress.</p>\n\n	<button ion-button id="cancel" class="go-back" (tap)="cancel()">No, go back</button>\n	<a (tap)="safeDelete()" id="delete" class="go-ahead">Yes, delete my account please.</a>\n\n</section>\n\n<footer></footer>\n\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/delete-account/delete-account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], DeleteAccountPage);

//# sourceMappingURL=delete-account.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReorderModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_evt_evt__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_environment__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { NavController } from 'ionic-angular';



//import { NoticeComponent } from "../notice/notice";
/**
 * Generated class for the ReorderModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ReorderModalComponent = (function () {
    function ReorderModalComponent(render, elem, evt, app) {
        this.render = render;
        this.elem = elem;
        this.evt = evt;
        this.app = app;
        this.reorder_links = __WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].reorder_links;
        this.show = true;
    }
    ReorderModalComponent.prototype.ngAfterViewInit = function () {
        this.app.reorderViewManager = this;
    };
    ReorderModalComponent.prototype.reorder = function (r) {
        this.toggleView();
        this.evt.createThngAction('_Reorder', {
            "customFields": {
                "retailer": r.name,
                "link": r.link
            }
        });
        window.open(r.link, '_blank');
    };
    ReorderModalComponent.prototype.toggleView = function (stat) {
        console.log('toggleView:' + this.show);
        if (typeof stat != 'undefined') {
            this.show = stat;
        }
        if (!this.show || typeof this.show == 'undefined') {
            this.show = true;
            this.render.setStyle(this.elem.nativeElement, "display", "none");
        }
        else {
            this.show = false;
            this.render.setStyle(this.elem.nativeElement, "display", "inline-block");
        }
        if (typeof this.app.noticeViewManager != 'undefined') {
            this.app.noticeViewManager.toggleView(false);
        }
    };
    return ReorderModalComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('show'),
    __metadata("design:type", Boolean)
], ReorderModalComponent.prototype, "show", void 0);
ReorderModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'reorder-modal',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/reorder-modal/reorder-modal.html"*/'<!-- Generated template for the ReorderModalComponent component -->\n<div class="container">\n  <h1 class="completion">\n    REORDER OPTIONS\n  </h1>\n\n  <div class="notes"><span>Select the retailer you would like to purchase from</span></div>\n  <span *ngFor="let r of reorder_links; let i=index">\n\n\n      <!--<a [href]="r?.link" [target]="r?.target" [title]="r?.name" (tap)="reorder(r)">{{r?.name}}</a>-->\n      <!--<a [href]="r?.link" [target]="r?.target" [title]="r?.name" onclick="alert(1)">-->\n        <button ion-button (tap)="reorder(r)">\n          {{r?.name}}\n        </button>\n      <!--</a>-->\n  </span>\n</div>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/reorder-modal/reorder-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1__providers_evt_evt__["a" /* EvtProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_app_app__["a" /* AppProvider */]])
], ReorderModalComponent);

//# sourceMappingURL=reorder-modal.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(297);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_21" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_auth_auth__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_my_account_my_account__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_delete_account_delete_account__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_forgot_password_forgot_password__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_reset_password_reset_password__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_age_gate_age_gate__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_aura_content_aura_content__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_aura_main_aura_main__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_scan_scan__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_evt_evt__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_app_script_service__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_components_module__ = __webpack_require__(650);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







/* Pages */












/* Providers */




/* Custom Modules */

var pages = [
    __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
    __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__["a" /* SignUpPage */],
    __WEBPACK_IMPORTED_MODULE_9__pages_auth_auth__["a" /* AuthPage */],
    __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_11__pages_my_account_my_account__["a" /* MyAccountPage */],
    __WEBPACK_IMPORTED_MODULE_12__pages_delete_account_delete_account__["a" /* DeleteAccountPage */],
    __WEBPACK_IMPORTED_MODULE_13__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
    __WEBPACK_IMPORTED_MODULE_15__pages_age_gate_age_gate__["a" /* AgeGatePage */],
    __WEBPACK_IMPORTED_MODULE_14__pages_reset_password_reset_password__["a" /* ResetPasswordPage */],
    __WEBPACK_IMPORTED_MODULE_16__pages_aura_content_aura_content__["a" /* AuraContentPage */],
    __WEBPACK_IMPORTED_MODULE_17__pages_aura_main_aura_main__["a" /* AuraMainPage */],
    __WEBPACK_IMPORTED_MODULE_18__pages_scan_scan__["a" /* ScanPage */]
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: pages,
        imports: [
            __WEBPACK_IMPORTED_MODULE_23__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */], name: 'Home', segment: 'home' },
                    { component: __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__["a" /* SignUpPage */], name: 'SignUpPage', segment: 'sign-up' },
                    { component: __WEBPACK_IMPORTED_MODULE_9__pages_auth_auth__["a" /* AuthPage */], name: 'Auth0Page', segment: ':data' },
                    { component: __WEBPACK_IMPORTED_MODULE_18__pages_scan_scan__["a" /* ScanPage */], name: 'NativeScanPage', segment: 'scan' },
                    { component: __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */], name: 'LoginPage', segment: 'login' },
                    { component: __WEBPACK_IMPORTED_MODULE_11__pages_my_account_my_account__["a" /* MyAccountPage */], name: 'MyAccountPage', segment: 'my-account' },
                    { component: __WEBPACK_IMPORTED_MODULE_12__pages_delete_account_delete_account__["a" /* DeleteAccountPage */], name: 'DeleteAccountPage', segment: 'delete-account' },
                    { component: __WEBPACK_IMPORTED_MODULE_13__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */], name: 'ForgotPasswordPage', segment: 'forgot-password' },
                    { component: __WEBPACK_IMPORTED_MODULE_15__pages_age_gate_age_gate__["a" /* AgeGatePage */], name: 'AgeGatePage', segment: 'age-gate' },
                    { component: __WEBPACK_IMPORTED_MODULE_14__pages_reset_password_reset_password__["a" /* ResetPasswordPage */], name: 'ResetPasswordPage', segment: 'reset-password' },
                    { component: __WEBPACK_IMPORTED_MODULE_16__pages_aura_content_aura_content__["a" /* AuraContentPage */], name: 'AuraContentPage', segment: 'aura-content' },
                    { component: __WEBPACK_IMPORTED_MODULE_17__pages_aura_main_aura_main__["a" /* AuraMainPage */], name: 'AuraMainPage', segment: 'aura' },
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
        entryComponents: pages,
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_19__providers_evt_evt__["a" /* EvtProvider */],
            __WEBPACK_IMPORTED_MODULE_20__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_21__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_22__providers_app_script_service__["a" /* ScriptService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var Config = {
    production: false,
    evt_app: "rGenOhFlJnk80ELN0xUzuNJtik5nYaxmZcF6fpE0OKwZdLkTS7yEF6zxvbrQtOxnVg3MvBgo2gWXcx2F",
    evt_base_url: "https://api-eu.evrythng.com",
    projectId: "UnSptk5ne6s7QNRawgMDtDge",
    appId: "UHbKt2qUe6s7QrwaRgMg9gkd",
    auth0: {
        clientID: '67JAI87YgeGyMWDBKZHedJ9LccRcjBC7',
        domain: 'evtjandj.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://evtjandj.eu.auth0.com/userinfo',
        redirectUri: window.location.origin,
        scope: 'openid'
    },
    ext_links: {
        privacyPolicy: "//www.neutrogena.co.uk/privacypolicy",
        cookiePolicy: "//www.neutrogena.co.uk/cookie-policy",
        legalNotice: "//www.neutrogena.co.uk/legal-statement",
        slaveryAct: "//www.neutrogena.co.uk/sites/neutrogena.co.uk/files/modern_slavery_act_statement.pdf",
        reorder: "//www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator"
    },
    reorder_links: [
        {
            link: "https://www.amazon.co.uk/Neutrogena-Visibly-Clear-Therapy-Activator/dp/B01MU9ML3G/ref=sr_1_2_s_it?s=beauty&ie=UTF8&qid=1509712796&sr=1-2&keywords=neutrogena+light+therapy+acne+mask",
            name: "Amazon",
            target: "_blank"
        }, {
            link: "http://www.boots.com/neutrogena-light-acne-therapy-mask-applicator-10229139",
            name: "Boots",
            target: "_blank"
        }, {
            link: "https://www.superdrug.com/Skin/Face/Face-Masks/Neutrogena-Visibly-Clear-Acne-Mask-Activator/p/737374",
            name: "Superdrug",
            target: "_blank"
        }, {
            link: "https://www.lookfantastic.com/neutrogena-visibly-clear-light-therapy-mask-activator/11433855.html",
            name: "Lookfantastic",
            target: "_blank"
        }, {
            link: "https://www.ocado.com/webshop/product/Neutrogena-Light-Therapy-Acne-Mask-Activator/357890011?from=search&tags=%7C20000&param=neutrogena+activator&parentContainer=SEARCHneutrogena+acti",
            name: "Ocado",
            target: "_blank"
        },
    ],
    aura_url: {
        link: "https://www.aurahealth.io/",
        name: "AURA health",
        target: "_blank"
    },
    desktop_scan_url: {
        link: "scan.neutrogena.co.uk",
        name: "scan.neutrogena.co.uk",
        target: "_blank"
    },
    neutrogena_url: {
        link: "www.neutrogena.co.uk",
        name: "www.neutrogena.co.uk",
        target: "_blank"
    },
    neutrogena_reorder_url: {
        link: "http://www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator",
        name: "VISIBLY CLEAR® Light Therapy Acne Mask Activator",
        target: "_blank"
    },
    age_gate_expiry: 30,
    lessonCompletionTimeLimit: 10 * 60,
    totalDailyLessonLimit: 10,
    courseDailyLessonLimit: 1,
    anonUserLessonLimit: 1,
    anonUserDaysToSignInNotice: 2,
    thngDaysLifeSpan: 30,
    dayToReorderNotice: 23,
    fbUserMetadataNS: 'http://evt-neutrogena-test.netlify.com/',
    scanRevertExpiry: 24 // hours until the app sets the scan as homepage instead of the aura content page
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_evt_evt__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_app_app__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { NoticeComponent } from "../components/notice/notice";
//import { ReorderModalComponent } from "../components/reorder-modal/reorder-modal";


var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, app, evt, menu) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.app = app;
        this.evt = evt;
        this.menu = menu;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.text = "";
        this.show = false;
        this.noLink = true;
        this.checkThngExpiry();
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] }
        ];
    }
    MyApp.prototype.ngOnInit = function () {
        if (!this.platform.is('mobile')) {
            //redirect to context switcher for mobile vs desktop
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]);
        }
        this.app.initCourses();
    };
    MyApp.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    };
    MyApp.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.nav.viewDidEnter.subscribe(function (data) {
            if ((data.component.name == 'AuraMainPage') || (data.component.name == 'AuraContentPage')) {
                _this.noticePopUp();
            }
        });
    };
    MyApp.prototype.menuOpened = function () {
        try {
            this.menu.swipeEnable(false);
        }
        catch (error) {
            this.menu.swipeEnable(false);
        }
    };
    MyApp.prototype.menuClosed = function () {
        try {
            this.menu.swipeEnable(true);
        }
        catch (error) {
            this.menu.swipeEnable(true);
        }
    };
    MyApp.prototype.noticePopUp = function () {
        if (this.app.hasSignInNotice()) {
            this.show = true;
            this.text = 'Sign in to track your progress.';
            this.noLink = false;
        }
        else if (this.app.hasReorderNotice()) {
            this.show = true;
            this.text = 'Re-order your NEUTROGENA© Visibility Clear® Light Therapy Acne Mask';
            this.noLink = false;
            this.ext_url = {
                name: __WEBPACK_IMPORTED_MODULE_4__config_environment__["a" /* Config */].neutrogena_reorder_url.name,
                link: __WEBPACK_IMPORTED_MODULE_4__config_environment__["a" /* Config */].neutrogena_reorder_url.link
            };
        }
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        var self = this;
        self.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            //self.evt.init();
            _this.app.setBeginTS();
            console.log("EVT");
        });
    };
    MyApp.prototype.checkThngExpiry = function () {
        /* remove myThng if it has expired already */
        var curDate = new Date();
        var expDate = new Date(localStorage.localExpire);
        console.log(curDate >= expDate);
        if (curDate >= expDate) {
            localStorage.removeItem('myThng');
            localStorage.removeItem('myProduct');
            localStorage.removeItem('localExpire');
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/app/app.html"*/'<ion-menu [content]="content"  type="overlay" side="right" (ionOpen)="menuOpened()" (ionClose)="menuClosed()">\n  <button ion-button id="btnClose" menuClose><ion-icon name="close"></ion-icon></button>\n  <side-menu></side-menu>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<notice [title]="text" [class]="\'pink\'" [noLink]="noLink" [ext_url]="ext_url"  *ngIf="show" #notice>\n</notice>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_7__providers_app_app__["a" /* AppProvider */],
        __WEBPACK_IMPORTED_MODULE_6__providers_evt_evt__["a" /* EvtProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cookies__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__aura_main_aura_main__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__age_gate_age_gate__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app_app__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*
 *  This is the scan page. Where scanning happens.
 *
 */
var HomePage = (function () {
    function HomePage(platform, navCtrl, evt, app, auth0, loader) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.evt = evt;
        this.app = app;
        this.auth0 = auth0;
        this.loader = loader;
        this.links = [];
        this.scanFailed = false;
        this.isNotLoggedIn = true;
        this.config = __WEBPACK_IMPORTED_MODULE_5__config_environment__["a" /* Config */];
        this.isNotLoggedIn = !this.auth0.loggedIn();
    }
    HomePage.prototype.ngOnInit = function () {
        console.log("from home");
        // if noticeViewed is true, the cookie policy notification will no longer be displayed
        if (__WEBPACK_IMPORTED_MODULE_4_ng2_cookies__["Cookie"].get('cookie_notice') && __WEBPACK_IMPORTED_MODULE_4_ng2_cookies__["Cookie"].get('cookie_notice') == '1') {
            this.noticeViewed = true;
        }
        else {
            __WEBPACK_IMPORTED_MODULE_4_ng2_cookies__["Cookie"].set('cookie_notice', '1');
            this.noticeViewed = false;
        }
        console.log(this.platform.is('mobile'));
        this.mobileVersion = this.platform.is('mobile');
        if (this.platform.is('mobile')) {
            if (this.evt.hasUserContext()
                && (this.evt.hasLocalThng() || this.evt.hasLocalProduct() || typeof localStorage.loginStarted != 'undefined')
                && this.app.isValidAge()) {
                //everything checks out goes to aura content
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__aura_main_aura_main__["a" /* AuraMainPage */]);
            }
            else if (this.evt.hasUserContext()
                && (this.evt.hasLocalThng() || this.evt.hasLocalProduct() || typeof localStorage.loginStarted != 'undefined')
                && !this.app.isValidAge()) {
                //has evt user and thng (or product) but no valid age, take it age gate
                if (this.navCtrl.last().component.name != 'AgeGatePage') {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__age_gate_age_gate__["a" /* AgeGatePage */]);
                }
            }
        }
    };
    HomePage.prototype.scan = function () {
        var _this = this;
        var self = this;
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        if (localStorage.getItem('access_token') && localStorage.getItem('id_token')) {
            this.isNotLoggedIn = false;
        }
        this.evt.scan({
            createAnonymousUser: this.isNotLoggedIn
        }).then(function (res) {
            console.log(res);
            /* set user context for anonymous user */
            var user = typeof res[0] != 'undefined' ? res[0].user : null;
            _this.evt.setAnonUserContext(user, _this.isNotLoggedIn);
            load.data.enableBackdropDismiss = false;
            if (typeof res === 'undefined' || res.length === 0) {
                /* Scan failed. we should create a 'not recognized' action */
                console.log("not Found");
                self.scanFailed = true;
                self.evt.getUserContext().then(function (usr) {
                    usr.action("_NotRecognised").create().catch(function (err) { return console.error(err); });
                    load.dismiss();
                })
                    .catch(function (err) {
                    console.log(err);
                    load.dismiss();
                });
            }
            else if (typeof res[0].results[0].thng !== "undefined" && _this.isNotLoggedIn) {
                console.log("anonymous user");
                /* Scanned QR code. It is a thng and anonymous user */
                var item = res[0].results[0].thng;
                var usr = res[0].user;
                usr.thng(item.id).read().then(function (thng) {
                    self.scanFailed = false;
                    // scan action, then update, _Activated action after scan have been moved to anon->reg user transition
                    self.evt.createThngAction("scans", {}, true); //anon user context
                    self.evt.updateMyThng(thng, true).then(function () {
                        self.gotoNexPage();
                    }).catch(function (err) {
                        console.log(err);
                        self.gotoNexPage();
                    });
                })
                    .catch(function (err) {
                    self.scanFailed = true;
                    console.log(err, 'thng error');
                    load.dismiss();
                });
            }
            else if (typeof res[0].results[0].thng !== "undefined" && !_this.isNotLoggedIn) {
                /* Scanned QR code. It is a thng */
                console.log("thing activated by logged in user");
                var thng = res[0].results[0].thng;
                self.scanFailed = false;
                // scan action, then update, _Activated action after scan have been moved to anon->reg user transition
                self.evt.createThngAction("scans"); //reg user context
                self.evt.updateMyThng(thng).then(function () {
                    load.dismiss();
                    self.gotoNexPage();
                }).catch(function (err) {
                    console.log('scanthng error', err);
                    load.dismiss();
                    self.gotoNexPage();
                });
            }
            else if (typeof res[0].results[0].product !== "undefined") {
                console.log("image recognition");
                //Scanned via image recognition. it is a product
                //IF anon or registered user
                //register a scan to product
                //IF NOT THNG for user exist
                //THEN create a THNG, ELSE ignore
                //save the context to local storage
                //safe user context resolution
                var usrC = self.evt.getUserContext();
                if (_this.isNotLoggedIn) {
                    usrC = self.evt.getAnonUserContext();
                }
                var item_1 = res[0].results[0].product;
                usrC.then(function (usr) {
                    usr.product(item_1.id).read().then(function (prod) {
                        self.scanFailed = false;
                        prod.action("scans").create().catch(function (err) { return console.error(err); });
                        self.evt.getUserCustomFields().then(function (cf) {
                            if (cf && typeof cf.myThng != 'undefined') {
                                // Already has a THNG
                                console.log('You already have a thng!');
                                self.gotoNexPage();
                            }
                            else {
                                // Create a THNG
                                var thng = {
                                    name: "User Thng - " + usr.id,
                                    tags: ["Image Recognition"],
                                    product: item_1.id
                                };
                                _this.evt.createThng(thng).then(function () {
                                    self.gotoNexPage();
                                }).catch(function (err) {
                                    console.log("Failed to create a thng", err);
                                });
                            }
                        }).catch(function (err) {
                            console.log("custom fields context error", err);
                        });
                    })
                        .catch(function (err) {
                        self.scanFailed = true;
                        console.log(err, 'prod error');
                        load.dismiss();
                    });
                })
                    .catch(function (err) {
                    console.log(err);
                    load.dismiss();
                });
            } // END OF SCAN PROCESS
            //save the thng or product to localStorage for later use
            _this.app.saveThngContext(res);
        }).catch(function (err) {
            self.scanFailed = true;
            self.evt.createUserAction("_NotRecognised", {}, true).then(function () { });
            console.log('scan failed', err);
            load.dismiss();
        });
    };
    HomePage.prototype.gotoNexPage = function () {
        /*check if age gate*/
        if (this.app.isValidAge())
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__aura_main_aura_main__["a" /* AuraMainPage */]);
        else
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__age_gate_age_gate__["a" /* AgeGatePage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/home/home.html"*/'\n<!--ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header-->\n\n<!-- No headers. We\'ll create\n  a component for this instead -->\n\n<notice [title]="\'Cookie Notice\'" [class]="\'black\'" *ngIf="!noticeViewed">\n\n  This site uses cookies as described in our <a>Cookie Policy</a>. Please continue to use our website if you agree to our use of cookies.\n</notice>\n<ion-content id="homeMobile" *ngIf="mobileVersion">\n  <!--button ion-button secondary menuToggle>Toggle Menu</button-->\n  <section id="client-logo" [ngClass] = "{ \'hidden\':scanFailed,\'client-logo\':true }">\n    <!--<span id="neutrogena-logo" class="placeholder" #neuLogo>\n    </span>-->\n    <ion-img src="../assets/images/logo_neutrogena.png" id="neutrogena-logo" #neuLogo></ion-img>\n    <p>in partnership with </p>\n    <!--<span id="aura-logo" class="placeholder" #auraLogo>\n    </span>-->\n    <ion-img src="../assets/images/logo_aura.png" id="aura-logo" #auraLogo></ion-img>\n  </section>\n  <section class="scan_failed" *ngIf="scanFailed">\n    <h2>It looks like that didn\'t work</h2>\n    <h3>Please try again to enter site</h3>\n  </section>\n\n  <section id="guide-scan-container" class="">\n\n    <span class="guide-images">\n\n      <div id="qr-image" class="placeholder">\n        <img src="../assets/images/qrcode.png"/>\n      </div>\n\n      <div id="logo-image" class="placeholder">\n        <img src="../assets/images/activator.png"/>\n      </div>\n\n    </span>\n\n    <span class="guide-text-instructions">\n      <p>Scan the QR code</p>\n      <p><b>OR</b></p>\n      <p>Scan the NEUTROGENA&reg; logo on your</p>\n      <p>NEUTROGENA&reg; Visibly Clear&reg; Light Therapy</p>\n      <p>Acne Mask Activator</p>\n    </span>\n\n  </section>\n\n  <section id="scan-button-container" #scanContainer>\n\n    <button ion-button id="scan-button" #scanButton (tap)="scan()">\n\n    </button>\n\n  </section>\n\n\n  <footer></footer>\n\n</ion-content>\n\n\n\n<ion-content id="homeDesktop" padding *ngIf="!mobileVersion">\n\n  <section id="client-logo" class="client-logo">\n\n    <ion-img src="../assets/images/logo_neutrogena.png" id="neutrogena-logo" #neuLogo></ion-img>\n    <span></span>\n    <ion-img src="../assets/images/logo_aura_blue@3x.png" id="aura-logo" #auraLogo></ion-img>\n  </section>\n\n  <section  id="client-content" class="client-content">\n      <div class="content-after">\n        <p class="prominent">\n            Visit\n            <a href="//{{config.desktop_scan_url.link}}"\n                [title]="config.desktop_scan_url.name"\n                [target]="config.desktop_scan_url.target">{{config.desktop_scan_url.name}}</a> on your \n          </p>\n          <p class="prominent">\n            mobile browser to continue with the experience.\n          </p>\n\n          <p>\n            Alternatively visit\n            <a href="//{{config.neutrogena_url.link}}"\n              [title]="config.neutrogena_url.name"\n              [target]="config.neutrogena_url.target">{{config.neutrogena_url.name}}</a> on \n          </p>\n          <p>\n            any device to learn more about NEUTROGENA®.\n          </p>\n      </div>\n\n      <footer></footer>\n\n  </section>\n\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__["a" /* EvtProvider */],
        __WEBPACK_IMPORTED_MODULE_8__providers_app_app__["a" /* AppProvider */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 381:
/***/ (function(module, exports) {

/**
 * Created by rexmupas on 12/11/2017.
 * TEP, common libraries and primitive overrides
 *
 */
/**
 * @ref: https://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
 * @param n
 * @param useWordBoundary
 * @returns {any}
 *
 * Note: add trunc method to JS String primitive so it is easier to use across
 * the app
 *
 */
String.prototype.trunc = function (n, useWordBoundary) {
    if (this.length <= n) {
        return this;
    }
    var subString = this.substr(0, n - 1);
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + "...";
};
/**
 * @ref: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 * Quick, non-secure hashing algorithm to get a cleaner string digest
 * @returns {String}
 */
String.prototype.tephash = function () {
    var hash = 0;
    var char = 0;
    if (this.length == 0)
        return "";
    for (var i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36).substring(2, 10);
};
/**
 * Extend Array to sort the numbers easily
 * @ref: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
 *
 * @param a
 * @param b
 * @returns {Array}
 */
Array.prototype.sortNum = function () {
    this.sort(function (a, b) { return (a - b); });
    return this;
};
//# sourceMappingURL=tep.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EvtProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EvtProvider = (function () {
    function EvtProvider(http, auth) {
        this.http = http;
        this.auth = auth;
        console.log('Hello EvtProvider Provider', __WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].evt_app);
        this.init();
    }
    EvtProvider.prototype.createAppAction = function (actionType, action) {
        if (actionType === void 0) { actionType = ''; }
        if (action === void 0) { action = {}; }
        this.evtapp.$init.then(function (res) {
            res.action(actionType).create(action).then(console.log);
        }).catch(function (err) {
            console.log(err);
        });
    };
    EvtProvider.prototype.createUserAction = function (actionType, action, anonUser) {
        if (actionType === void 0) { actionType = ''; }
        if (action === void 0) { action = {}; }
        if (anonUser === void 0) { anonUser = false; }
        var userC;
        if (anonUser) {
            userC = this.getAnonUserContext();
        }
        else {
            userC = this.getUserContext();
        }
        return userC.then(function (usr) {
            usr.action(actionType).create(action).then(console.log(actionType)).catch(function (err) { return console.error(err); });
        });
    };
    EvtProvider.prototype.getAction = function (actionType, anonUser) {
        if (actionType === void 0) { actionType = ''; }
        if (anonUser === void 0) { anonUser = false; }
        var usr;
        if (anonUser) {
            usr = this.getAnonUser();
        }
        else {
            usr = this.getUser();
        }
        if (usr) {
            return usr.action(actionType).read();
        }
    };
    /**
     *
     * Create a THNG action for a given user mode - anon or registered
     *
     * @param actionType
     * @param action
     * @param anonUser
     * @returns {any}
     */
    EvtProvider.prototype.createThngAction = function (actionType, action, anonUser) {
        if (actionType === void 0) { actionType = ''; }
        if (action === void 0) { action = {}; }
        if (anonUser === void 0) { anonUser = false; }
        return this.getThngContext(anonUser).then(function (thng) {
            if (typeof thng != 'undefined') {
                thng.action(actionType).create(action).then(console.log).catch(function (err) { return console.error(err); });
            }
        });
    };
    EvtProvider.prototype.init = function () {
        EVT.use(EVT.Scan);
        EVT.setup({
            apiUrl: __WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].evt_base_url,
            geolocation: true
        });
        EVT.Scan.setup({
            filter: {
                method: ["ir", "2d"]
            }
        });
        this.evtapp = new EVT.App(__WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].evt_app);
    };
    EvtProvider.prototype.hasUserContext = function () {
        return (this.getUserContextKeys() ? true : false);
    };
    EvtProvider.prototype.getUserContextKeys = function (forceAnon) {
        if (forceAnon === void 0) { forceAnon = false; }
        var lsApiKey = "";
        var lsId = "";
        if (forceAnon == true) {
            //force grab the anon user info
            console.log('user context is anon');
            if (typeof localStorage.anonEvrythngInfo != 'undefined') {
                var userContext = JSON.parse(localStorage.anonEvrythngInfo);
                lsId = userContext.evrythngUser;
                lsApiKey = userContext.evrythngApiKey;
            }
            else {
                this.createAppUser(forceAnon).then(function (usr) {
                    lsId = usr.evrythngUser;
                    lsApiKey = usr.evrythngApiKey;
                });
            }
        }
        else {
            if (this.auth.loggedIn()) {
                console.log('user context is registered');
                var userContext = this.auth.getUserDetailsFromStorage();
                if (typeof userContext.sub != 'undefined' && userContext.sub.indexOf("facebook") != -1) {
                    lsApiKey = userContext[__WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'].evrythngUserData.evrythngApiKey;
                    lsId = userContext[__WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].fbUserMetadataNS + 'user_metadata'].evrythngUserData.evrythngUser;
                }
                else {
                    lsApiKey = userContext.user_metadata.evrythngUserData.evrythngApiKey;
                    lsId = userContext.user_metadata.evrythngUserData.evrythngUser;
                }
            }
            else {
                console.log('user context is ambigous');
                //possibly an anon user or just userContext was not set / reset
                if (typeof localStorage.evrythngInfo != 'undefined') {
                    var userContext = JSON.parse(localStorage.evrythngInfo);
                    lsId = userContext.evrythngUser;
                    lsApiKey = userContext.evrythngApiKey;
                }
                if (!lsId || !lsApiKey) {
                    return this.getUserContextKeys(true);
                }
            }
        }
        if (lsApiKey !== "" && lsId !== "") {
            return [lsApiKey, lsId];
        }
    };
    /**
     * helper to resolve context keys automatically
     *
     * @returns {any}
     * @private
     */
    EvtProvider.prototype._getUserContextKeys = function () {
        var ls;
        if (this.auth.loggedIn()) {
            ls = this.getUserContextKeys(false);
            if (typeof ls == 'undefined') {
                console.log('Did not find registered keys. Fall back to anon');
                ls = this.getUserContextKeys(true);
            }
        }
        else {
            //anon
            ls = this.getUserContextKeys(true);
        }
        return ls;
    };
    /* return evt user context as a promise */
    EvtProvider.prototype.getUserContext = function () {
        var _this = this;
        if (typeof this.userC != 'undefined') {
            return this.userC;
        }
        var ls = this._getUserContextKeys();
        var lsId = typeof ls != 'undefined' ? ls[1] : '';
        var lsApiKey = typeof ls != 'undefined' ? ls[0] : '';
        if (lsApiKey == '' || lsId == '') {
            return new Promise(function () { return false; });
        }
        else {
            return (new Promise(function (resolve, reject) {
                resolve(new EVT.User({
                    id: lsId,
                    apiKey: lsApiKey
                }, _this.evtapp));
            }));
        }
    };
    EvtProvider.prototype.getUser = function () {
        /**
         * Return EVT user instance object (Not a promise)
         * @type {any}
         */
        if (typeof this.evtUser != 'undefined') {
            return this.evtUser;
        }
        var ls = this._getUserContextKeys();
        if (typeof ls != 'undefined') {
            var lsId = ls[1];
            var lsApiKey = ls[0];
            return new EVT.User({
                id: lsId,
                apiKey: lsApiKey
            }, this.evtapp);
        }
        else {
            return false;
        }
    };
    /* return evt user context as a promise */
    EvtProvider.prototype.getAnonUserContext = function () {
        var _this = this;
        if (typeof this.anonUserC != 'undefined') {
            return this.anonUserC;
        }
        var ls = this.getUserContextKeys(true);
        var lsId = ls[1];
        var lsApiKey = ls[0];
        return (new Promise(function (resolve, reject) {
            resolve(new EVT.User({
                id: lsId,
                apiKey: lsApiKey
            }, _this.evtapp));
        }));
    };
    EvtProvider.prototype.getAnonUser = function () {
        /**
         * Return EVT user instance object (Not a promise)
         * @type {any}
         */
        if (typeof this.anonEvtUser != 'undefined') {
            return this.anonEvtUser;
        }
        var ls = this.getUserContextKeys(true);
        var lsId = ls[1];
        var lsApiKey = ls[0];
        if (typeof ls != 'undefined') {
            return new EVT.User({
                id: lsId,
                apiKey: lsApiKey
            }, this.evtapp);
        }
    };
    /**
     *
     * Return Thng context as promise
     * Save to local storage if it's available in EVT
     *
     * @returns {any}
     */
    EvtProvider.prototype.getThngContext = function (anonUser) {
        if (anonUser === void 0) { anonUser = false; }
        /**
         * assign `this` local function context
         * @type {any}
         */
        var self = this;
        var userC = this.getUser();
        var userCF = this.getUserCustomFields();
        if (anonUser) {
            userC = this.getAnonUser();
            userCF = self.getAnonUserCustomFields();
        }
        if (typeof localStorage.myThng !== 'undefined') {
            var myThng = JSON.parse(localStorage.myThng);
            console.log('has thng', myThng);
            return userC.thng(myThng.id).read(function (th) { });
        }
        else {
            console.log('no local thng');
            return userCF.then(function (cf) {
                if (typeof cf != 'undefined' && cf.hasOwnProperty('myThng')) {
                    //has myThng customField
                    return userC.thng(cf.myThng).read(function (th) {
                        localStorage.myThng = JSON.stringify(th);
                        self.setLocalStorageTimeout();
                    });
                }
                else if (typeof localStorage.myProduct != 'undefined') {
                    console.log('no thng - product');
                    var thngData = {
                        name: 'User Thng - ' + userC.id,
                        tags: ["Image Recognition"],
                        product: localStorage.myProduct.id
                    };
                    return self.createThng(thngData, anonUser);
                }
                else {
                    console.log('no thng');
                }
            });
        }
    };
    EvtProvider.prototype.hasLocalThng = function () {
        if (typeof localStorage.myThng == 'undefined') {
            return false;
        }
        else {
            return true;
        }
    };
    EvtProvider.prototype.hasLocalProduct = function () {
        if (typeof localStorage.myProduct == 'undefined') {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Get a THNG context by giving it an ADI or THNG id
     *
     * @param thngId
     * @param anonUser
     * @returns {Promise<R>|any|Function}
     */
    EvtProvider.prototype.getThngContextById = function (thngId, anonUser) {
        if (anonUser === void 0) { anonUser = false; }
        var userC = this.getUser();
        if (anonUser) {
            userC = this.getAnonUser();
        }
        return userC.thng(thngId).read().catch(function (err) {
            userC.action("_NotRecognised").create().catch(function (err) { return console.error(err); });
            console.log('err fetch thng by id', err);
        });
    };
    /**
     * Get a product context by giving it a product Id
     *
     * @param productId
     * @param anonUser
     * @returns {Promise<R>|any|Function}
     */
    EvtProvider.prototype.getProductContextById = function (productId, anonUser) {
        if (anonUser === void 0) { anonUser = false; }
        var userC = this.getUser();
        if (anonUser) {
            userC = this.getAnonUser();
        }
        return userC.thng(productId).read().catch(function (err) {
            console.log('err fetch product by id', err);
        });
    };
    /* EVT Scan */
    EvtProvider.prototype.scan = function (opt) {
        return this.evtapp.scan(opt);
    };
    /* Get EVT user's custom fields */
    EvtProvider.prototype.getUserCustomFields = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getUserContext().then(function (usr) {
                usr.$init.then(function (user) {
                    console.log(user);
                    if (typeof user.customFields !== "undefined" && user.customFields.hasOwnProperty('myThng')) {
                        resolve(user.customFields);
                    }
                    else {
                        resolve(false);
                    }
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /* Get EVT anon user's custom fields */
    EvtProvider.prototype.getAnonUserCustomFields = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getAnonUserContext().then(function (usr) {
                usr.$init.then(function (user) {
                    if (typeof user.customFields !== "undefined" && user.customFields.hasOwnProperty('myThng')) {
                        resolve(user.customFields);
                    }
                    else {
                        reject(false);
                    }
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Common helper to create a thing from data given
     * {
     *    name: `User Thng - ${usr.id}`,
     *    tags: ["Image Recognition"],
     *    product: item.id
     *  }
     *
     * @param thngData
     * @param anonUser {boolean}
     * @returns {any}
     */
    EvtProvider.prototype.createThng = function (thngData, anonUser) {
        if (anonUser === void 0) { anonUser = false; }
        var slf = this;
        var usr = this.getUser();
        if (anonUser) {
            usr = this.getAnonUser();
        }
        return usr.thng().create(thngData).then(function (th) {
            // Assign the newly created thng to the user immediately, then return the promise
            return usr.update({
                customFields: {
                    myThng: th.id
                }
            }).then(function () {
                localStorage.myThng = JSON.stringify(th);
                slf.setLocalStorageTimeout();
            });
        })
            .catch(function (err) {
            console.log(err);
            console.log("Failed to create a thng");
        });
    };
    /**
     * Update the myThng custom field of chosen user context.
     *
     * @param thngData
     * @param anonUser
     * @param allowUpdateIfExists
     * @returns {any}
     */
    EvtProvider.prototype.updateMyThng = function (thngData, anonUser, allowUpdateIfExists) {
        var _this = this;
        if (anonUser === void 0) { anonUser = false; }
        if (allowUpdateIfExists === void 0) { allowUpdateIfExists = false; }
        if (typeof thngData != 'undefined') {
            return new Promise(function (resolve) {
                resolve(false);
            });
        }
        var usr = this.getUser();
        var usrCF = this.getUserCustomFields();
        if (anonUser) {
            usr = this.getAnonUser();
            usrCF = this.getAnonUserCustomFields();
        }
        if (!allowUpdateIfExists) {
            usrCF.then(function (cf) {
                if (typeof cf != 'undefined' && cf) {
                    if (typeof cf.myThng == 'undefined') {
                        return _this._updateMyThng(usr, thngData);
                    }
                }
            });
        }
        else {
            return this._updateMyThng(usr, thngData);
        }
    };
    /***
     * private method for raw update to user custom fields
     *
     * @param usr
     * @param thngData
     * @returns {Function|any|Thenable<undefined>|SyncAsync<R>|Promise<R>}
     * @private
     */
    EvtProvider.prototype._updateMyThng = function (usr, thngData) {
        var slf = this;
        return usr.update({
            customFields: {
                myThng: thngData.id
            }
        }).then(function () {
            localStorage.myThng = JSON.stringify(thngData);
            slf.setLocalStorageTimeout();
            console.log('myTHng updated');
        }).catch(function (err) {
            console.log('update myTHng err', err);
        });
    };
    EvtProvider.prototype.anonymousDataModel = function (data) {
        var obj = {
            "sub": "anonymous",
            "given_name": "Demo",
            "family_name": "Engmntprty",
            "nickname": "demo",
            "name": "Demo Engmntprty",
            "picture": "https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=24b240ba2dc60ad31b4319fbab9bb9e2&oe=5A9CD62F",
            "gender": "male",
            "locale": "en-US",
            "updated_at": "2017-11-10T08:52:57.635Z",
            "email": "demo@engmntprty.com",
            "email_verified": false,
            "user_metadata": {
                "evrythngUserData": {
                    "evrythngUser": data.id,
                    "status": "anonymous",
                    "email": data.email,
                    "evrythngApiKey": data.apiKey,
                    "socialNetwork": "evrythng"
                }
            }
        };
        return obj;
    };
    EvtProvider.prototype.setAnonUserContext = function (user, anonUser) {
        if (typeof anonUser == 'undefined' || anonUser) {
            localStorage.isAnon = true;
            localStorage.anonUserInfo = JSON.stringify(this.anonymousDataModel(user));
            var evtInfo = {
                anonymousUser: true,
                evrythngUser: user.id,
                evrythngApiKey: user.apiKey
            };
            localStorage.anonEvrythngInfo = JSON.stringify(evtInfo);
        }
        else {
            localStorage.isAnon = false;
        }
    };
    /**
     * Abstraction to get an anon user instance and save state to local store
     *
     * @param anonUser
     * @returns {Thenable<undefined>|Function|any|SyncAsync<R>|Promise<R>}
     */
    EvtProvider.prototype.createAppUser = function (anonUser) {
        var _this = this;
        return this.evtapp.appUser().create({
            anonymous: anonUser
        }).then(function (usr) {
            console.log(typeof usr, usr);
            _this.setAnonUserContext(usr, anonUser);
            return usr;
        }).catch(function (err) {
            console.log(err);
        });
    };
    EvtProvider.prototype.clearCache = function () {
        this.anonUserC = null;
        this.userC = null;
        this.anonEvtUser = null;
        this.evtUser = null;
    };
    EvtProvider.prototype.setLocalStorageTimeout = function () {
        var dt_now = new Date();
        localStorage.localExpire = new Date(dt_now.getTime() + __WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].scanRevertExpiry * 3600000); // add 1 day's worth of milliseconds
    };
    return EvtProvider;
}());
EvtProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */]])
], EvtProvider);

//# sourceMappingURL=evt.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraMainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_aura_content_aura_content__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';

//import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';



//import { AuthService } from '../../providers/auth/auth.service';




/**
 * Generated class for the AuraMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AuraMainPage = (function () {
    function AuraMainPage(app, navCtrl, navParams, loading) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.expanded = false;
        this.def = "down";
        this.day = 1;
        this.dur = 10;
        this.arrDay = [];
        this.noticeClass = 'pink';
        this.alive = true;
        this.activeCourse = [
            { desc: "", id: "", path: "", title: "", course: "", author: "" }
        ];
        this.courseTitle = "Mindfulness";
        this.addLesson = 0;
        this.labelIntro = "Start this course";
        this.aura_url = __WEBPACK_IMPORTED_MODULE_2__config_environment__["a" /* Config */].aura_url;
        this.progressArr = {};
        localStorage.alive = true;
    }
    AuraMainPage.prototype.ionViewWillEnter = function () {
    };
    AuraMainPage.prototype.ionViewWillLeave = function () {
        localStorage.removeItem("alive");
    };
    AuraMainPage.prototype.ionViewDidLoad = function () {
        var _this = this;
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
                var self_1 = this;
                var loading_1 = self_1.loading.create({
                    spinner: 'crescent',
                    content: "Please wait...",
                    enableBackdropDismiss: false,
                    dismissOnPageChange: true,
                    showBackdrop: true
                });
                loading_1.present();
                this.app.initProgArr().then(function (res) {
                    console.log("Last played:" + _this.navParams.get('lastplayed'), _this.app.progressArr);
                    var lastActiveCourse = _this.navParams.get('lastplayed') ? _this.navParams.get('lastplayed') : _this.app.getLastActiveCourse();
                    _this.app.setActiveCourse(lastActiveCourse);
                    _this.initActiveCourse();
                    _this.courseTitle = lastActiveCourse;
                    loading_1.dismiss();
                });
            }
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]);
        }
    };
    AuraMainPage.prototype.initActiveCourse = function () {
        this.initProgressState();
        this.courseTitle = this.app.getCurrentCourse();
        this.initLabelIntro();
        this.popDays();
    };
    AuraMainPage.prototype.initProgressState = function () {
        var _this = this;
        if (typeof this.progressKeys == 'undefined') {
            this.progressKeys = Object.keys(this.app.getCourses());
        }
        var pk = {};
        this.progressKeys.forEach(function (val) {
            pk[val] = typeof _this.app.progressArr[val] == 'undefined' ? 0
                : _this.app.progressArr[val].length;
        });
        this.progressArr = pk;
    };
    /* Add buttons depending on number of days *
     * Animate for effect to the current day 	 */
    AuraMainPage.prototype.popDays = function () {
        this.arrDay = this.app.getArrDay(this.courseTitle);
        this.slideDayButtons();
    };
    AuraMainPage.prototype.slideDayButtons = function () {
        var _this = this;
        setTimeout(function () {
            try {
                _this.btnSlide.slideTo(_this.app.nextLesson());
            }
            catch (e) {
                //console.log(e);
            }
        }, 300);
    };
    /* Expand description */
    AuraMainPage.prototype.expand = function () {
        this.expanded = !this.expanded;
        if (this.expanded)
            this.def = "up";
        else
            this.def = "down";
    };
    AuraMainPage.prototype.ngAfterViewInit = function () {
        //this.popDays();
    };
    AuraMainPage.prototype.ngOnInit = function () {
        this.initUpdateProgTimer();
        this.app.initProgArr();
    };
    AuraMainPage.prototype.initUpdateProgTimer = function () {
        var _this = this;
        if (typeof this.updateTimer != 'undefined') {
            this.updateTimer.unsubscribe();
        }
        this.updateTimer = __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].timer(1000, 1000);
        var self = this;
        //console.log('poll filter: ', filter);
        this.updateTimer
            .takeWhile(function () { return localStorage.alive === "true"; })
            .subscribe(function () {
            self.app.getLessonCompletedFromEVT().then(function (res) {
                if (typeof res != 'undefined' && typeof res[0] != 'undefined') {
                    var updateLessonCompletedTs = res[0].timestamp;
                    if (typeof localStorage.lessonCompleteTime != 'undefined') {
                        if ((updateLessonCompletedTs > localStorage.lessonCompleteTime)) {
                            console.log('new lesson completed', updateLessonCompletedTs);
                            localStorage.setItem('lessonCompleteTime', updateLessonCompletedTs);
                            _this.app.clearLocalHistory();
                            _this.app.initProgArr().then(function (res) {
                                //setActive ensure that
                                _this.app.setActiveCourse(_this.courseTitle);
                                _this.initActiveCourse();
                            });
                        }
                    }
                    else {
                        localStorage.setItem('lessonCompleteTime', updateLessonCompletedTs);
                    }
                }
                else {
                    localStorage.setItem('lessonCompleteTime', '0');
                }
            }).catch(function (err) { return console.log(err); });
        });
    };
    AuraMainPage.prototype.sliderChanged = function (event) {
        if (event === void 0) { event = null; }
        if (this.slider.isBeginning()) {
            this.slider.lockSwipeToPrev(true);
            this.slider.lockSwipeToNext(false);
        }
        else if (this.slider.isEnd()) {
            this.slider.lockSwipeToNext(true);
            this.slider.lockSwipeToPrev(false);
        }
        else {
            this.slider.lockSwipeToPrev(false);
            this.slider.lockSwipeToNext(false);
        }
    };
    AuraMainPage.prototype.btnChanged = function (event) {
        if (event === void 0) { event = null; }
        if (this.btnSlide.isBeginning()) {
            this.btnSlide.lockSwipeToPrev(true);
            this.btnSlide.lockSwipeToNext(false);
        }
        else if (this.btnSlide.isEnd()) {
            this.btnSlide.lockSwipeToNext(true);
            this.btnSlide.lockSwipeToPrev(false);
        }
        else {
            this.btnSlide.lockSwipeToPrev(false);
            this.btnSlide.lockSwipeToNext(false);
        }
    };
    /* This is triggered by the sub-course component *
    * when it is tapped (begin / continue) and 	  *
    * transfers the data from the sub-course to 	  *
    * the top area (slider of buttons).     	 	  */
    AuraMainPage.prototype.tryMe = function ($event) {
        //console.log(JSON.stringify($event));
        var courseTitle = $event.title;
        delete $event['title'];
        delete $event['progress'];
        this.app.setActiveCourse(courseTitle);
        this.courseTitle = courseTitle;
        this.initLabelIntro();
        //this.dur = this.app.progressKeys.length;
        this.btnSlide.lockSwipeToNext(false);
        this.btnSlide.lockSwipeToPrev(false);
        this.popDays();
    };
    /* Go to the aura content */
    AuraMainPage.prototype.intoTheContent = function (stat, ind) {
        if (ind === void 0) { ind = 1; }
        console.log(this.app.nextLesson(this.courseTitle));
        if (ind >= this.app.nextLesson(this.courseTitle)
            && this.app.isNextLessonLocked(this.courseTitle)) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
        }
        else {
            //console.log(this.activeCourse[ind]);
            var courseData = this.app.activeCourse[ind];
            courseData["day"] = ind;
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_aura_content_aura_content__["a" /* AuraContentPage */], { data: courseData });
        }
    };
    AuraMainPage.prototype.initLabelIntro = function () {
        if (this.app.hasLoggedIn()) {
            if (this.app.hasStartedCourse(this.courseTitle)) {
                if (this.app.hasCompletedCourse(this.courseTitle)) {
                    this.labelIntro = "Completed";
                }
                else {
                    this.labelIntro = "Continue";
                }
            }
            else {
                this.labelIntro = "Start this course";
            }
        }
        else {
            if (this.app.hasStartedCourse(this.courseTitle)) {
                this.labelIntro = "Sign in to access content";
            }
            else {
                this.labelIntro = "Start this course";
            }
        }
    };
    AuraMainPage.prototype.toSignUp = function () {
        if (this.labelIntro == "Sign in to access content") {
            this.navCtrl.push("SignUpPage");
        }
    };
    AuraMainPage.prototype.getDayBtnIcon = function () {
        if (this.app.isNextLessonLocked(this.courseTitle)) {
            return "lock";
        }
        else {
            return "play";
        }
    };
    return AuraMainPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('Slides'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
], AuraMainPage.prototype, "slider", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('btns'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Slides */])
], AuraMainPage.prototype, "btnSlide", void 0);
AuraMainPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-aura-main',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/aura-main/aura-main.html"*/'<aura-head></aura-head>\n<reorder-modal #reorder></reorder-modal>\n<ion-content >\n\n	<section class="track-preview {{courseTitle}}">\n		<a class="progress-days">\n			Day {{app?.nextLesson(courseTitle)}} of {{app?.getCourseDuration(courseTitle)}}\n			<!--Day {{day < app?.activeDur ? (day+addLesson):day}} of {{app?.activeDur}}-->\n		</a>\n		<p class="section-title">\n			{{courseTitle}}\n		</p>\n\n		<!--div class="day-tracker container" (scroll)="evtScroll($event)"-->\n		<ion-slides slidesPerView="auto" spaceBetween="27" zoom="false" #btns class="btns" (ionSlideDidChange)="btnChanged($event)">\n			<ion-slide *ngFor="let dy of arrDay">\n				<div [ngClass]="{\'play\': true, \'end\': !app?.hasNextLesson(courseTitle) && (dy?.day >= arrDay.length)}">\n					<ion-col [ngClass]="{\'rng\': true}" (tap)="intoTheContent(!dy?.status,dy?.day)">\n						Day {{dy?.day}}\n						<img src="../assets/images/tick.png"/>\n					</ion-col>\n				</div>\n			</ion-slide>\n			<ion-slide *ngIf="app?.nextLesson(courseTitle) <= app?.courseDuration(courseTitle) && app?.lastLesson(courseTitle) < app?.nextLesson(courseTitle)">\n				<div class="play">\n					<ion-col [ngClass]="{\'rng\': dy?.status}" (tap)="intoTheContent(true, app?.nextLesson(courseTitle))">\n						<ion-icon name="{{getDayBtnIcon()}}"></ion-icon>\n						Day {{app?.nextLesson(courseTitle)}}\n					</ion-col>\n				</div>\n			</ion-slide>\n			<ion-slide>\n				&nbsp;\n			</ion-slide>\n			<ion-slide>\n				&nbsp;\n			</ion-slide>\n		</ion-slides>\n		<!--/div-->\n		<p class="label-intro" (tap)="toSignUp()">\n      {{labelIntro}}\n    </p>\n\n		<div class="expandable">\n			<a class="desc-trigger" (tap)="expand()">Description <ion-icon name="ios-arrow-{{def}}"></ion-icon></a>\n			<!--<p class="content" [ngClass]="{\'show\':expanded}" *ngIf="app?.hasActiveCourse()">-->\n			<p class="content" [ngClass]="{\'show\':expanded}" *ngIf="app?.hasActiveCourse() || courseTitle">\n				{{app?.getLessonData(courseTitle, app?.nextLesson(courseTitle))?.desc?.trunc(300)}}\n			</p>\n      <br>\n      <div>\n        <a class="link" [href]="aura_url.link" [title]="aura_url.name" [target]="aura_url.target">About AURA</a>\n      </div>\n		</div>\n\n\n	</section>\n	<p class="more-courses">Additional Courses</p>\n\n	<section class="sliders">\n		<ion-slides slidesPerView="auto" spaceBetween="20" zoom="false" (ionSlideDidChange)="sliderChanged($event)" #Slides>\n			<ion-slide *ngFor = "let crs of progressKeys; let i=index">\n				<sub-course [title]="crs" [hero]="courseTitle" [progress]="progressArr[crs]" [enabled]="true" (begin)="tryMe($event)" [activeCourse]="app.getCourseData(crs)"></sub-course>\n			</ion-slide>\n			<!--ion-slide>\n				<sub-course [title]="\'Mindfulness\'" [progress]="0" [enabled]="false" (begin)="tryMe($event)"></sub-course>\n			</ion-slide>\n			<ion-slide>\n				<sub-course [title]="\'Focus\'" [progress]="0" [enabled]="false" (begin)="tryMe($event)"></sub-course>\n			</ion-slide-->\n\n		</ion-slides>\n	</section>\n\n    <footer></footer>\n</ion-content>\n\n<aura-foot [reorder]="reorder"></aura-foot>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/aura-main/aura-main.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], AuraMainPage);

//# sourceMappingURL=aura-main.js.map

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scan_scan__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__age_gate_age_gate__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_evt_evt__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * This is the catch-all page. All paths are checked here first.
 * The access_token and id_token variables are stored in localstorage
 * for processing.
 *
 */
var AuthPage = (function () {
    function AuthPage(navCtrl, navParams, app, auth0, loader, platform, evt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.auth0 = auth0;
        this.loader = loader;
        this.platform = platform;
        this.evt = evt;
        this.isNotLoggedIn = true;
    }
    AuthPage.prototype.ionViewDidLoad = function () { };
    AuthPage.prototype.ngOnInit = function () {
        var _this = this;
        var data = this.navParams.get('data');
        console.log(data);
        if (data === "" || !this.platform.is('mobile')) {
            //experience starts with SCAN page (HomePage)
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        }
        else if (this.URLToArray(data).hasOwnProperty('thng')) {
            var pData = this.URLToArray(data);
            //there's a THNG
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__scan_scan__["a" /* ScanPage */], {
                thng: pData["thng"]
            });
        }
        else {
            var load = this.loader.create({
                spinner: 'crescent',
                dismissOnPageChange: true,
                showBackdrop: true,
                content: "Please wait...",
                enableBackdropDismiss: false
            });
            load.present();
            var authData = this.URLToArray(data);
            this.auth0.result(authData).then(function (res) {
                console.log(res);
                if (res == "deleted_user") {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], { isUserDeleted: true });
                }
                else {
                    _this.app.completeReg(res).then(function (reg) {
                        if (reg === false) {
                            //try logging in
                            _this.app.completeLogin(res).then(function (login) {
                                if (login !== false) {
                                    _this.navCtrl.setRoot('AuraMainPage');
                                }
                                else {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                                }
                            });
                        }
                        else {
                            _this.navCtrl.setRoot('AuraMainPage');
                        }
                    });
                }
            }).catch(function (err) {
                console.log(err);
                //GO TO ERROR PAGE
            });
        }
    };
    AuthPage.prototype.URLToArray = function (url) {
        var request = {};
        var pairs = url.split('&');
        for (var i = 0; i < pairs.length; i++) {
            if (!pairs[i])
                continue;
            var pair = pairs[i].split('=');
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return request;
    };
    AuthPage.prototype.gotoNexPage = function () {
        /*check if age gate*/
        if (this.app.isValidAge())
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */]);
        else
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__age_gate_age_gate__["a" /* AgeGatePage */]);
    };
    return AuthPage;
}());
AuthPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-auth',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/auth/auth.html"*/'<!--\n  Generated template for the AuthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/auth/auth.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_8__providers_app_app__["a" /* AppProvider */],
        __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_9__providers_evt_evt__["a" /* EvtProvider */]])
], AuthPage);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ResetPasswordPage = (function () {
    function ResetPasswordPage(navCtrl, render, auth0, formBuilder) {
        this.navCtrl = navCtrl;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.invalidLogin = false;
        this.successfulReset = true;
        this.formGroup = this.formBuilder.group({
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern(/.*([A-Z+]|[0-9+]).*$/)])],
            confirm: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern(/.*([A-Z+]|[0-9+]).*$/)])],
        });
    }
    ResetPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
    };
    ResetPasswordPage.prototype.focused = function (event) {
        var node = event._elementRef.nativeElement;
        this.render.addClass(node, "focused");
    };
    ResetPasswordPage.prototype.blurred = function (event) {
        var node = event._elementRef.nativeElement;
        this.render.removeClass(node, "focused");
    };
    ResetPasswordPage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        console.log("dismiss");
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
        }
    };
    /* check if new passwords match */
    ResetPasswordPage.prototype.checkMatch = function () {
        var formVal = this.formGroup.value;
        return formVal.password == formVal.confirm;
    };
    /* check if form has been tampered with */
    ResetPasswordPage.prototype.checkDirty = function () {
        return this.formGroup.get('password').dirty && this.formGroup.get('confirm').dirty;
    };
    ResetPasswordPage.prototype.resetPw = function () {
        var self = this;
        var usr = this.formGroup.value;
        this.auth0.updatePassword(usr.password)
            .then(function (res) {
            self.successfulReset = true;
        })
            .catch(function (err) {
            self.successfulReset = false;
        });
    };
    ResetPasswordPage.prototype.toLoginPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    return ResetPasswordPage;
}());
ResetPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reset-password',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/reset-password/reset-password.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Reset your Password</p>\n	<p class="form-desc">Enter a new password</p>\n	<p [ngClass]="{\'reset\':successfulReset, \'instructions\':true}">Password must be 8+ characters and include 1 or more uppercase letter or number.</p>\n	<form [formGroup]="formGroup" id="login-form" #loginForm>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password (8+ characters)" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)" [ngClass]="{\'error\':(checkDirty() && !checkMatch())}"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="confirm" placeholder="Confirm Password (8+ characters)" (ionFocus)="focused($event)" [(ngModel)]="confirm" (ionBlur)="blurred($event)" [ngClass]="{\'error\':(checkDirty() && !checkMatch())}"></ion-input>\n		</ion-row>\n		<button ion-button id="resetPass" class="getStarted" (tap)="resetPw()" [disabled]="!formGroup.valid || !checkDirty() || !checkMatch() || successfulReset">Reset Password</button>\n	</form>\n	<p class="reset-successful" *ngIf="successfulReset">\n		<b>Password reset.</b>\n		Log in <a (tap)="toLoginPage()">here</a>.\n	</p>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/reset-password/reset-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], ResetPasswordPage);

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScriptService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScriptService = (function () {
    /*
     * AS of now, this not used.
     * This dynamically updates/creates the aura script js
     */
    function ScriptService() {
        var _this = this;
        this.scripts = {};
        [{ name: "aura", src: "http://app.aurahealth.io/static/widget.js" }].forEach(function (script) {
            _this.scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }
    /*load(...scripts: string[]) {
        var promises: any[] = [];
        scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }*/
    ScriptService.prototype.loadScript = function (name, cid) {
        var _this = this;
        document.getElementById('ext_scripts').innerHTML = "";
        return new Promise(function (resolve, reject) {
            //resolve if already loaded
            //load script
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = _this.scripts[name].src;
            script.id = "aura-widget";
            script.setAttribute("data-content-id", cid);
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        _this.scripts[name].loaded = true;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    }
                };
            }
            else {
                script.onload = function () {
                    _this.scripts[name].loaded = true;
                    resolve({ script: name, loaded: true, status: 'Loaded' });
                };
            }
            script.onerror = function (error) { return resolve({ script: name, loaded: false, status: 'Loaded' }); };
            document.getElementById('ext_scripts').appendChild(script);
        });
    };
    return ScriptService;
}());
ScriptService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ScriptService);

//# sourceMappingURL=script.service.js.map

/***/ }),

/***/ 650:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_scan__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__side_menu_side_menu_module__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notice_notice_module__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__footer_footer_module__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sub_course_sub_course_module__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__aura_head_aura_head_module__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__aura_foot_aura_foot_module__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__progress_modal_progress_modal_module__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reorder_modal_reorder_modal_module__ = __webpack_require__(665);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__scan_scan__["a" /* ScanComponent */],],
        imports: [__WEBPACK_IMPORTED_MODULE_2__side_menu_side_menu_module__["a" /* SideMenuComponentModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__scan_scan__["a" /* ScanComponent */],
            __WEBPACK_IMPORTED_MODULE_2__side_menu_side_menu_module__["a" /* SideMenuComponentModule */],
            __WEBPACK_IMPORTED_MODULE_3__notice_notice_module__["a" /* NoticeComponentModule */],
            __WEBPACK_IMPORTED_MODULE_4__footer_footer_module__["a" /* FooterComponentModule */],
            __WEBPACK_IMPORTED_MODULE_5__sub_course_sub_course_module__["a" /* SubCourseComponentModule */],
            __WEBPACK_IMPORTED_MODULE_6__aura_head_aura_head_module__["a" /* AuraHeadComponentModule */],
            __WEBPACK_IMPORTED_MODULE_7__aura_foot_aura_foot_module__["a" /* AuraFootComponentModule */],
            __WEBPACK_IMPORTED_MODULE_8__progress_modal_progress_modal_module__["a" /* ProgressModalComponentModule */],
            __WEBPACK_IMPORTED_MODULE_9__reorder_modal_reorder_modal_module__["a" /* ReorderModalComponentModule */],
        ]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 651:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ScanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ScanComponent = (function () {
    function ScanComponent() {
        console.log('Hello ScanComponent Component');
        this.text = 'Hello World';
    }
    return ScanComponent;
}());
ScanComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'scan',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/scan/scan.html"*/'<!-- Generated template for the ScanComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/scan/scan.html"*/
    }),
    __metadata("design:paramtypes", [])
], ScanComponent);

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__side_menu__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SideMenuComponentModule = (function () {
    function SideMenuComponentModule() {
    }
    return SideMenuComponentModule;
}());
SideMenuComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__side_menu__["a" /* SideMenuComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__side_menu__["a" /* SideMenuComponent */]
        ]
    })
], SideMenuComponentModule);

//# sourceMappingURL=side-menu.module.js.map

/***/ }),

/***/ 653:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_my_account_my_account__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_evt_evt__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the SideMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SideMenuComponent = (function () {
    function SideMenuComponent(auth0, app, dom, evt) {
        this.auth0 = auth0;
        this.app = app;
        this.dom = dom;
        this.evt = evt;
        this.links = [];
        this.ext = __WEBPACK_IMPORTED_MODULE_3__config_environment__["a" /* Config */].ext_links;
    }
    SideMenuComponent.prototype.ngOnInit = function () {
        this.links = [
            {
                title: "Privacy Policy",
                link: this.dom.bypassSecurityTrustResourceUrl(this.ext.privacyPolicy)
            },
            {
                title: "Cookie Policy",
                link: this.dom.bypassSecurityTrustResourceUrl(this.ext.cookiePolicy)
            },
            {
                title: "Modern Slavery Act Statement",
                link: this.dom.bypassSecurityTrustResourceUrl(this.ext.slaveryAct)
            },
            {
                title: "Legal Notice",
                link: this.dom.bypassSecurityTrustResourceUrl(this.ext.legalNotice)
            },
            {
                title: "About AURA",
                link: ""
            }
        ];
    };
    SideMenuComponent.prototype.ngAfterViewInit = function () {
    };
    SideMenuComponent.prototype.login = function () {
        var nav = this.app.getRootNav();
        nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
    };
    SideMenuComponent.prototype.logout = function () {
        this.evt.clearCache();
        this.auth0.logout();
    };
    SideMenuComponent.prototype.loggedIn = function () {
        return this.auth0.loggedIn();
    };
    SideMenuComponent.prototype.myAccount = function () {
        var nav = this.app.getRootNav();
        nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_my_account_my_account__["a" /* MyAccountPage */]);
    };
    return SideMenuComponent;
}());
SideMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'side-menu',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/side-menu/side-menu.html"*/'<!-- Generated template for the SideMenuComponent component -->\n<ion-content>\n  <ion-list>\n  	<!-- unused <button menuClose class="main" ion-item >My Account</button> -->\n  	<button menuClose class="main" ion-item *ngIf="!loggedIn()" (tap)="login()">Log In</button>\n  	<button menuClose class="main dbl" ion-item *ngIf="loggedIn()" (tap)="myAccount()">My Account</button>\n  	<button menuClose class="main" ion-item *ngIf="loggedIn()" (tap)="logout()">Log Out</button>\n    <a target="_blank" *ngFor="let p of links" [href]="p?.link">\n    	<button menuClose ion-item>\n    		{{p?.title}}\n    	</button>\n    </a>\n  </ion-list>\n\n  <section class="footer">\n  	<ion-row class="container">\n  		<ion-col class="neutrogena">\n  			<img src="../assets/images/logo_neutrogena.png"/>\n  		</ion-col>\n  		<ion-col class="aura">\n  			<img src="../assets/images/logo_aura_blue.png"/>\n  		</ion-col>\n  	</ion-row>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/side-menu/side-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_7__providers_evt_evt__["a" /* EvtProvider */]])
], SideMenuComponent);

//# sourceMappingURL=side-menu.js.map

/***/ }),

/***/ 654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notice__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NoticeComponentModule = (function () {
    function NoticeComponentModule() {
    }
    return NoticeComponentModule;
}());
NoticeComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__notice__["a" /* NoticeComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__notice__["a" /* NoticeComponent */]
        ]
    })
], NoticeComponentModule);

//# sourceMappingURL=notice.module.js.map

/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the NoticeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var NoticeComponent = (function () {
    //@ViewChild(this) content ?: NoticeComponent;
    function NoticeComponent(app, appState, render, elem) {
        this.app = app;
        this.appState = appState;
        this.render = render;
        this.elem = elem;
        this.title = "";
        this.show = false;
        this.noLink = true;
    }
    NoticeComponent.prototype.ngOnInit = function () {
        if (this.class == "pink") {
            this.style = { 'color': '#fff', 'font-size': '15px', 'line-height': '20px', 'background-color': 'rgb(240,115,172)', 'text-align': 'center' };
        }
        else {
            this.style = { 'color': '#fff', 'font-size': '13px', 'line-height': '20px', 'background-color': 'rgb(69,69,69)' };
        }
    };
    NoticeComponent.prototype.ngAfterViewInit = function () {
        this.appState.noticeViewManager = this;
    };
    NoticeComponent.prototype.goToPage = function (ext_url) {
        console.log(this.ext_url);
        if (typeof ext_url == 'undefined') {
            var nav = this.app.getRootNav();
            this.toggleView(false);
            nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */]);
        }
        else {
            if (typeof this.appState.reorderViewManager != 'undefined') {
                this.appState.reorderViewManager.toggleView(true);
                this.toggleView(false);
            }
        }
    };
    NoticeComponent.prototype.toggleView = function (stat) {
        if (stat === void 0) { stat = !this.show; }
        this.show = stat;
        if (!this.show) {
            this.render.setStyle(this.elem.nativeElement, "display", "none");
        }
        else {
            this.render.setStyle(this.elem.nativeElement, "display", "block");
        }
    };
    NoticeComponent.prototype.destroy = function () {
        console.log(this.elem.nativeElement);
        this.render.setStyle(this.elem.nativeElement, "display", "none");
        //this.content.setElementStyle("display","none");
    };
    return NoticeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("title"),
    __metadata("design:type", String)
], NoticeComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("class"),
    __metadata("design:type", Object)
], NoticeComponent.prototype, "class", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('show'),
    __metadata("design:type", Boolean)
], NoticeComponent.prototype, "show", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('noLink'),
    __metadata("design:type", Boolean)
], NoticeComponent.prototype, "noLink", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('ext_url'),
    __metadata("design:type", Object)
], NoticeComponent.prototype, "ext_url", void 0);
NoticeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'notice',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/notice/notice.html"*/'<!-- Generated template for the NoticeComponent component -->\n<section class="body" [ngStyle]="style">\n	<button ion-button id="btnClose" ><ion-icon (click)="destroy()" name="close"></ion-icon></button>\n	<span class="title" *ngIf="noLink">\n		{{title}}\n	</span>\n  <span class="title" *ngIf="!noLink" (tap)="goToPage(ext_url)">\n    <a class="title" [href]="ext_url?.link" [target]="ext_url?.target" [title]="ext_url?.name">\n		{{title}}\n    </a>\n	</span>\n	<div class="body">\n		<ng-content>\n\n		</ng-content>\n	</div>\n</section>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/notice/notice.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], NoticeComponent);

//# sourceMappingURL=notice.js.map

/***/ }),

/***/ 656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__footer__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FooterComponentModule = (function () {
    function FooterComponentModule() {
    }
    return FooterComponentModule;
}());
FooterComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__footer__["a" /* FooterComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__footer__["a" /* FooterComponent */]
        ]
    })
], FooterComponentModule);

//# sourceMappingURL=footer.module.js.map

/***/ }),

/***/ 657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_environment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FooterComponent = (function () {
    function FooterComponent(dom, app, platform) {
        this.dom = dom;
        this.app = app;
        this.platform = platform;
        this.links = [];
        console.log(this);
        this.mobileVersion = this.platform.is('mobile');
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.links = [
            {
                text: "Privacy Policy",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment__["a" /* Config */].ext_links.privacyPolicy)
            },
            {
                text: "Cookie Policy",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment__["a" /* Config */].ext_links.cookiePolicy)
            },
            {
                text: "Legal Notice",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment__["a" /* Config */].ext_links.legalNotice)
            },
            {
                text: "Modern Slavery Act Statement",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment__["a" /* Config */].ext_links.slaveryAct)
            },
        ];
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'footer',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/footer/footer.html"*/'\n<section id="footer-desktop" #footerDesktop *ngIf="!mobileVersion;else footerTemplate">\n\n	<nav id="footer-links" class="footer-links">\n		<a *ngFor="let a of links" target="_blank" [href]="a?.href">{{a?.text}}\n		</a>\n	</nav>\n\n	<p class="disclaimer" id="disclaimer"> \n		This site is best viewed on mobile. &copy; Johnson & Johnson Limited 2017. This site is published by Johnson & Johnson Ltd, which is solely responsible for its contents. It is intended for a UK audience. Site last updated on: 21 September 2017.\n	</p>\n\n</section>\n<ng-template #footerTemplate>\n    <section id="footer" #footer>\n    \n			<nav id="footer-links" class="footer-links">\n				<a *ngFor="let a of links" target="_blank" [href]="a?.href">{{a?.text}}\n				</a>\n			</nav>\n\n\n			<p class="disclaimer" id="disclaimer"> \n				This site is best viewed on mobile. &copy; Johnson & Johnson Limited 2017. This site is published by Johnson & Johnson Ltd, which is solely responsible for its contents. It is intended for a UK audience. Site last updated on: 21 September 2017. \n			</p>\n		</section>\n</ng-template>\n\n\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/footer/footer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* Platform */]])
], FooterComponent);

//# sourceMappingURL=footer.js.map

/***/ }),

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubCourseComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sub_course__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SubCourseComponentModule = (function () {
    function SubCourseComponentModule() {
    }
    return SubCourseComponentModule;
}());
SubCourseComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__sub_course__["a" /* SubCourseComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__sub_course__["a" /* SubCourseComponent */]
        ]
    })
], SubCourseComponentModule);

//# sourceMappingURL=sub-course.module.js.map

/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubCourseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SubCourseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SubCourseComponent = (function () {
    //daysLength ?: number = 0;
    function SubCourseComponent(auth0, appService, render, nav) {
        this.auth0 = auth0;
        this.appService = appService;
        this.render = render;
        this.nav = nav;
        this.bgImg = "../assets/images/courseImage.png";
        this.title = "Sleep well";
        this.duration = 30;
        this.enabled = false;
        this.bgn = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */];
    }
    SubCourseComponent.prototype.begin = function (tes) {
        tes['progress'] = this.progress;
        tes['title'] = this.title;
        /* this assigns the progress and title 	*
         * to the top element */
        var courseElem = this.courseElem.nativeElement.parentElement.parentElement.parentElement;
        this.hideCourse(courseElem);
        this.bgn.emit(tes);
    };
    SubCourseComponent.prototype.hideCourse = function (elem) {
        this.render.setStyle(elem, "display", "none");
        if (typeof this.appService.hiddenPar != 'undefined') {
            //only one hidden at a given time.
            this.render.setStyle(this.appService.hiddenPar, "display", "block");
        }
        this.appService.hiddenPar = elem;
    };
    SubCourseComponent.prototype.ngOnInit = function () {
        this.duration = Object.keys(this.crs).length;
        this.bgImg = "../assets/aura/images/hero/" + this.title + ".jpg";
        if (this.auth0.loggedIn()) {
            if (typeof this.progress == 'undefined') {
                //fallback only, progress data is already bound on the component selector see aura-main.html
                this.progress = Math.round(Math.random() * this.duration);
            }
        }
    };
    SubCourseComponent.prototype.ngAfterViewInit = function () {
        //let self = this;
        //this.render.setStyle(this.prog.nativeElement,"width",this.getProg()+"%");
        if (typeof this.appService.activeCourse != 'undefined'
            && typeof this.prog != 'undefined'
            && this.appService.activeCourse[1].course == this.title) {
            var courseElem = this.courseElem.nativeElement.parentElement.parentElement.parentElement;
            this.hideCourse(courseElem);
        }
        else {
            if (this.title === 'Mindfulness' || this.hero === this.title) {
                var courseElem = this.courseElem.nativeElement.parentElement.parentElement.parentElement;
                this.hideCourse(courseElem);
            }
        }
    };
    SubCourseComponent.prototype.loggedIn = function () {
        return this.auth0.loggedIn();
    };
    SubCourseComponent.prototype.getProg = function () {
        return Math.round((this.progress * 100) / this.duration);
    };
    SubCourseComponent.prototype.getProgPct = function () {
        return this.getProg() + '%';
    };
    SubCourseComponent.prototype.toSignUp = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
    };
    SubCourseComponent.prototype.getProgLabel = function () {
        if (this.getProg() == 0) {
            return "Begin";
        }
        else {
            if (this.progress != this.duration) {
                return "Continue";
            }
            else {
                return "Complete";
            }
        }
    };
    return SubCourseComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('bgImg'),
    __metadata("design:type", String)
], SubCourseComponent.prototype, "bgImg", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('title'),
    __metadata("design:type", String)
], SubCourseComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('hero'),
    __metadata("design:type", String)
], SubCourseComponent.prototype, "hero", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('duration'),
    __metadata("design:type", Number)
], SubCourseComponent.prototype, "duration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('enabled'),
    __metadata("design:type", Boolean)
], SubCourseComponent.prototype, "enabled", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('progress'),
    __metadata("design:type", Number)
], SubCourseComponent.prototype, "progress", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('prog'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], SubCourseComponent.prototype, "prog", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('courseElem'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], SubCourseComponent.prototype, "courseElem", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])('begin'),
    __metadata("design:type", Object)
], SubCourseComponent.prototype, "bgn", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('activeCourse'),
    __metadata("design:type", Object)
], SubCourseComponent.prototype, "crs", void 0);
SubCourseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'sub-course',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/sub-course/sub-course.html"*/'<!-- Generated template for the SubCourseComponent component -->\n<div class="container" #courseElem>\n	<span class="image-container" [ngStyle]="{\'background-image\':\'url(\'+bgImg+\')\'}">\n		<p class="title">{{title}}</p>\n		<p class="duration">{{duration}} days</p>\n		<p class="sign-in" *ngIf="!loggedIn()" (tap)="toSignUp()">Sign in to track progress</p>\n		<span class="progress" *ngIf="loggedIn()" [ngClass]="{\'no-prog\':(getProg() == 0)}">\n			<div class="main-bar">\n				<div class="progress-bar" #prog [ngStyle]="{\'width\': getProgPct()}"></div>\n			</div>\n			<p class="completion">{{getProg()}}% Complete</p>\n		</span>\n	</span>\n	<!--<button ion-button class="begin" (tap)="begin(crs)" [disabled]="!loggedIn() || !enabled">{{getProgLabel()}}</button>-->\n	<button ion-button class="begin" (tap)="begin(crs)">{{getProgLabel()}}</button>\n</div>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/sub-course/sub-course.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], SubCourseComponent);

//# sourceMappingURL=sub-course.js.map

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraHeadComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aura_head__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AuraHeadComponentModule = (function () {
    function AuraHeadComponentModule() {
    }
    return AuraHeadComponentModule;
}());
AuraHeadComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__aura_head__["a" /* AuraHeadComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__aura_head__["a" /* AuraHeadComponent */]
        ]
    })
], AuraHeadComponentModule);

//# sourceMappingURL=aura-head.module.js.map

/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraHeadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_my_account_my_account__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { SignUpPage } from "../../pages/sign-up/sign-up";


/**
 * Generated class for the AuraHeadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AuraHeadComponent = (function () {
    function AuraHeadComponent(auth0, navCtrl) {
        this.auth0 = auth0;
        this.navCtrl = navCtrl;
        this.logged = false;
        this.name = "";
    }
    AuraHeadComponent.prototype.toLogin = function () {
        /*let nav = this.app.getRootNav();
        nav.setRoot(LoginPage);*/
        //added this odd code because UX indicates "Sign-in" to go to Sign-Up
        //but EVT and TEP have agreed to map it LoginPage due to JnJs bugs
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
        //this.navCtrl.push(SignUpPage);
    };
    AuraHeadComponent.prototype.myAccount = function () {
        if (this.auth0.loggedIn()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_my_account_my_account__["a" /* MyAccountPage */]);
        }
        else {
            this.toLogin();
        }
    };
    AuraHeadComponent.prototype.ngOnInit = function () {
        /* If logged in, populate user data with details from storage */
        if (this.auth0.loggedIn()) {
            this.userData = this.auth0.getUserDetailsFromStorage();
            this.logged = true;
            if (this.auth0.isFB()) {
                this.name = this.userData.given_name;
            }
            else {
                this.name = this.userData.user_metadata.firstName;
            }
        }
    };
    return AuraHeadComponent;
}());
AuraHeadComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'aura-head',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/aura-head/aura-head.html"*/'<!-- Generated template for the AuraHeadComponent component -->\n<div class="body">\n\n	<ion-row>\n\n		<ion-col col-7>\n			<span><img src="../assets/images/neutrogena_white.png"/></span>\n			<span><img src="../assets/images/auraLogo_white.png"/></span>\n		</ion-col>\n\n		<ion-col col-5 (tap)="myAccount()">\n\n      <a *ngIf = "!logged">Sign In</a>\n			<a *ngIf = "logged">Hi, {{name}}</a>\n			<span><img src="../assets/images/person.png"/></span>\n\n		</ion-col>\n\n	</ion-row>\n\n</div>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/aura-head/aura-head.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
], AuraHeadComponent);

//# sourceMappingURL=aura-head.js.map

/***/ }),

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraFootComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aura_foot__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AuraFootComponentModule = (function () {
    function AuraFootComponentModule() {
    }
    return AuraFootComponentModule;
}());
AuraFootComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__aura_foot__["a" /* AuraFootComponent */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__aura_foot__["a" /* AuraFootComponent */]
        ]
    })
], AuraFootComponentModule);

//# sourceMappingURL=aura-foot.module.js.map

/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraFootComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_reorder_modal_reorder_modal__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_environment__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the AuraFootComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AuraFootComponent = (function () {
    function AuraFootComponent(loader, nav, view, appState) {
        this.loader = loader;
        this.nav = nav;
        this.view = view;
        this.appState = appState;
        /* This is the reorder link */
        this.ext_url = "//www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator";
        this.neutrogena_reorder_url = __WEBPACK_IMPORTED_MODULE_5__config_environment__["a" /* Config */].neutrogena_reorder_url;
        console.log('Hello AuraFootComponent Component');
    }
    /***
     * home btn tap handler
     */
    AuraFootComponent.prototype.toHome = function () {
        var _this = this;
        if (typeof this.appState.noticeViewManager != 'undefined') {
            this.appState.noticeViewManager.toggleView(false);
        }
        var currentView = this.view.component.name;
        if (currentView == 'AuraContentPage') {
            var load_1 = this.loader.create({
                spinner: 'crescent',
                dismissOnPageChange: true,
                showBackdrop: true,
                content: "Please wait...",
                enableBackdropDismiss: true
            });
            load_1.present();
            this.ClearPlayerResources().then(function (result) {
                load_1.dismiss();
                if (result) {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__["a" /* AuraMainPage */]);
                }
                else {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__["a" /* AuraMainPage */]);
                }
            });
        }
        else {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__["a" /* AuraMainPage */]);
        }
    };
    AuraFootComponent.prototype.ClearPlayerResources = function () {
        return new Promise(function (resolve) {
            var playBtn = document.getElementById('play-btn');
            if (playBtn) {
                if (playBtn.classList.contains('fa-pause')) {
                    playBtn.click();
                }
            }
            var timer2 = setTimeout(function () {
                resolve('B');
                clearTimeout(timer2);
            }, 2000);
        });
    };
    /***
     * reorder btn tap handler
     */
    AuraFootComponent.prototype.reorderAction = function () {
        this.reorder.toggleView();
    };
    AuraFootComponent.prototype.logAction = function () {
        this.appState.evt.createUserAction('_Reorder', {}, !this.appState.hasLoggedIn());
    };
    return AuraFootComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('reorder'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__components_reorder_modal_reorder_modal__["a" /* ReorderModalComponent */])
], AuraFootComponent.prototype, "reorder", void 0);
AuraFootComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'aura-foot',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/aura-foot/aura-foot.html"*/'<div class="body">\n  <ion-row>\n  	<ion-col col-6>\n  		<div class="home" (tap)="toHome()">\n  			<img src="../assets/images/pink_house.png"/>\n  			<p>Home</p>\n  		</div>\n  	</ion-col>\n  	<ion-col col-6>\n  		<div class="reorder">\n  			<a (tap)="logAction()" [href]="neutrogena_reorder_url.link" [title]="neutrogena_reorder_url.name" [target]="" target="neutrogena_reorder_url.target">\n          <img src="../assets/images/reorder.png"/>\n  			</a>\n  			<p>Re-Order</p>\n  		</div>\n  	</ion-col>\n  </ion-row>\n</div>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/components/aura-foot/aura-foot.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */]])
], AuraFootComponent);

//# sourceMappingURL=aura-foot.js.map

/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressModalComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progress_modal__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProgressModalComponentModule = (function () {
    function ProgressModalComponentModule() {
    }
    return ProgressModalComponentModule;
}());
ProgressModalComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__progress_modal__["a" /* ProgressModalComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__progress_modal__["a" /* ProgressModalComponent */]
        ]
    })
], ProgressModalComponentModule);

//# sourceMappingURL=progress-modal.module.js.map

/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReorderModalComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reorder_modal__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReorderModalComponentModule = (function () {
    function ReorderModalComponentModule() {
    }
    return ReorderModalComponentModule;
}());
ReorderModalComponentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__reorder_modal__["a" /* ReorderModalComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__reorder_modal__["a" /* ReorderModalComponent */]
        ]
    })
], ReorderModalComponentModule);

//# sourceMappingURL=reorder-modal.module.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgeGatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { AuthService } from "../../providers/auth/auth.service";




var AgeGatePage = (function () {
    function AgeGatePage(navCtrl, navParams, alertCtrl, app, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.platform = platform;
        this.invalidAge = false;
        this.cookiesOn = false;
        this.selectedDate = {
            'day': '',
            'month': '',
            'year': ''
        };
        this.inputDate = '';
        if (__WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */].isAgeGated()) {
            this.invalidAge = !this.app.isValidAge();
        }
    }
    AgeGatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AgeGatePage');
    };
    AgeGatePage.prototype.ngOnInit = function () {
        // if noticeViewed is true, the cookie policy notification will no longer be displayed
        if (__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get('cookie_notice') && __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].get('cookie_notice') == '1') {
            this.noticeViewed = true;
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('cookie_notice', '1');
            this.noticeViewed = false;
        }
        if (this.platform.is('mobile')) {
            if (this.app.isValidAge()) {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */]);
            }
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        }
    };
    AgeGatePage.prototype.changedDate = function () {
        // console.log(this.inputDate);
        this.selectedDate.year = this.inputDate.split("-")[0];
        this.selectedDate.month = this.inputDate.split("-")[1];
        this.selectedDate.day = this.inputDate.split("-")[2];
        console.log(this.selectedDate);
    };
    AgeGatePage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    AgeGatePage.prototype.submitAge = function () {
        if (this.inputDate.length === 0) {
            this.showAlert('Please input your birth date.');
        }
        else {
            var currentDate = new Date().getFullYear();
            var ageGated = currentDate - this.selectedDate.year;
            if (ageGated > 18) {
                this.invalidAge = false;
                /* We're all good. Proceed to meditation home, save age gate info first */
                this.app.saveAgeGateData(ageGated, this.cookiesOn, this.selectedDate);
                // this.navCtrl.setRoot(SignUpPage,{age_gate:true});
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */], { age_gate: true });
            }
            else {
                this.app.saveAgeGateData(ageGated, this.cookiesOn, this.selectedDate);
                this.invalidAge = true;
            }
        }
    };
    AgeGatePage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            message: text,
            buttons: ['Ok']
        });
        alert.present();
    };
    AgeGatePage.prototype.checkAge = function (data) {
    };
    AgeGatePage.prototype.FBauth = function () {
        // this.auth0.fbAuth();
    };
    return AgeGatePage;
}());
AgeGatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-age-gate',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/age-gate/age-gate.html"*/'<notice [title]="\'Cookie Notice\'" [class]="\'black\'" *ngIf="!noticeViewed">\n\n  This site uses cookies as described in our <a>Cookie Policy</a>. Please continue to use our website if you agree to our use of cookies.\n</notice>\n<ion-header>\n        <ion-navbar>\n            <ion-buttons end>\n              <button ion-button class="xbtn" (tap)="dismissThis()"></button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n\n<ion-content class="has-header">\n\n<section padding class="main" >\n\n  <ion-img src="../assets/images/logo_neutrogena.png"></ion-img>\n<div *ngIf="!invalidAge">\n	<p class="content">Please enter your date of birth:</p>\n\n\n		<ion-row>\n\n<input type="text" maxlength="2" placeholder="MM" [(ngModel)]="selectedDate.month" [readonly]=\'true\'/>\n<input type="text" maxlength="2" placeholder="DD" [(ngModel)]="selectedDate.day" [readonly]=\'true\'/>\n<input type="text" maxlength="4" placeholder="YYYY" [(ngModel)]="selectedDate.year" [readonly]=\'true\'/>\n\n<ion-datetime displayFormat="MMM DD, YYYY" [(ngModel)]="inputDate" (ionChange)="changedDate()"></ion-datetime>\n			</ion-row>\n<p class="content small width-70">By submitting your data, you are accepting our Privacy Policy and Cookie Policy.</p>\n	<ion-row>\n    <ion-item >\n    <ion-label>\nPlease remember me on this site.</ion-label>\n    <ion-checkbox [(ngModel)]="cookiesOn"></ion-checkbox>\n  </ion-item>\n  </ion-row>\n  <button ion-button (click)="submitAge()">Enter</button>\n</div>\n<div class=\'invalid-age-container\' *ngIf="invalidAge">\n  <h3>Unfortunately,</h3>\n  <p class="content">only users </p>\n<p class="content color-orange">18 YEARS OR OLDER </p>\n<p class="content">can enter this site.</p>\n</div>\n</section>\n\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/age-gate/age-gate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
], AgeGatePage);

//# sourceMappingURL=age-gate.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__delete_account_delete_account__ = __webpack_require__(290);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyAccountPage = (function () {
    function MyAccountPage(navCtrl, auth0, formBuilder, loader) {
        this.navCtrl = navCtrl;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.FBreg = false;
    }
    MyAccountPage.prototype.ngOnInit = function () {
        this.FBreg = this.auth0.isFB();
        console.log(this.FBreg);
        var usr = this.auth0.getUserDetailsFromStorage();
        var usrFName = this.FBreg ? usr['given_name'] : usr['user_metadata'].firstName;
        var usrLName = this.FBreg ? usr['family_name'] : usr['user_metadata'].lastName;
        this.formGroup = this.formBuilder.group({
            firstName: [usrFName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required],
            lastName: [usrLName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required],
            email: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]({ value: usr['email'], disabled: !this.FBreg }, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required),
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required])]
        });
    };
    MyAccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
    };
    MyAccountPage.prototype.focused = function (event) {
        //let node = event._elementRef.nativeElement;
        console.log(event);
    };
    MyAccountPage.prototype.blurred = function (event) {
        //let node = event._elementRef.nativeElement;
        console.log(event);
    };
    MyAccountPage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        console.log("dismiss");
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        }
    };
    MyAccountPage.prototype.logout = function () {
        this.auth0.logout();
    };
    MyAccountPage.prototype.updateUser = function () {
        var usr = this.formGroup.value;
        var self = this;
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        this.auth0.updateUser({ firstName: usr.firstName, lastName: usr.lastName }).then(function (res) {
            self.auth0.setUserMetadata(res['user_metadata']);
            load.dismissAll();
        })
            .catch(function (err) {
            load.dismissAll();
            console.log(err);
        });
    };
    MyAccountPage.prototype.deleteAccount = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__delete_account_delete_account__["a" /* DeleteAccountPage */]);
    };
    MyAccountPage.prototype.toFB = function () {
        window.location.href = "//facebook.com";
    };
    return MyAccountPage;
}());
MyAccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-account',template:/*ion-inline-start:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/my-account/my-account.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">My Account</p>\n	<form [formGroup]="formGroup" id="my-account-form" #signUpForm [ngClass]="{\'fbreg\':FBreg}">\n		<ion-row>\n			<ion-label>First Name</ion-label>\n			<ion-input type="text" formControlName="firstName" placeholder="First Name" (ionFocus)="focused($event)" [(ngModel)]="firstName" (ionBlur)="blurred($event)" [readonly]="FBreg"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-label>Last Name</ion-label>\n			<ion-input type="text" formControlName="lastName" placeholder="Last Name" (ionFocus)="focused($event)" [(ngModel)]="lastName" (ionBlur)="blurred($event)" [readonly]="FBreg"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-label>Email Address</ion-label>\n			<ion-input type="email" formControlName="email" placeholder="neutrogena-user@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [readonly]="FBreg"></ion-input>\n		</ion-row>\n		<ion-row *ngIf="!FBreg">\n			<ion-label>Password</ion-label>\n			<ion-input type="text" formControlName="password" placeholder="********" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)" readonly></ion-input>\n		</ion-row>\n		<p class="fb-edit" *ngIf="FBreg">You can edit first name, last name, and email address on your Facebook <a (tap)="toFB()" class="linker">account page</a>.</p>\n		<button ion-button id="saveChanges" class="getStarted" (tap)="updateUser()" *ngIf="!FBreg">Save Changes</button>\n		<button ion-button id="logout" class="getStarted" (tap)="logout()">Log out</button>\n		<div class="space-40"><hr></div>\n		<button ion-button id="deleteAccount" class="fbReg" (tap)="deleteAccount()">Delete Account</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/rexmupas/Documents/EVT/Neutrogena/code/evt-neutrogena/src/pages/my-account/my-account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], MyAccountPage);

//# sourceMappingURL=my-account.js.map

/***/ })

},[292]);
//# sourceMappingURL=main.js.map