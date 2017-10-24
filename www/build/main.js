webpackJsonp([0],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, appProvider, evtProvider, navParams) {
        this.navCtrl = navCtrl;
        this.appProvider = appProvider;
        this.evtProvider = evtProvider;
        this.navParams = navParams;
        this.links = [];
        console.log(appProvider, evtProvider);
    }
    HomePage.prototype.ngOnInit = function () {
        console.log(this.navParams.data);
    };
    HomePage.prototype.scan = function () {
        this.evtProvider.scan().then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/home/home.html"*/'<!--ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header-->\n\n<!-- No headers. We\'ll create\n  a component for this instead -->\n<!-- <notice [title]="\'Cookie Notice\'" [style]="{\'color\':\'#fff\',\'font-size\':\'13px\',\'line-height\':\'20px\',\'background-color\':\'rgb(69,69,69)\'}">\n  This site uses cookies as described in our <a>Cookie Policy</a>. Please continue to use our website if you agree to our use of cookies.\n</notice> -->\n<ion-content id="homeMobile" *ngIf="mobileVersion">\n  <!--button ion-button secondary menuToggle>Toggle Menu</button-->\n  <section id="client-logo" class="client-logo">\n    <!--<span id="neutrogena-logo" class="placeholder" #neuLogo>\n    </span>-->\n    <ion-img src="../assets/images/logo_neutrogena.png" id="neutrogena-logo" #neuLogo></ion-img>\n    <p>in partnership with </p>\n    <!--<span id="aura-logo" class="placeholder" #auraLogo>\n    </span>-->\n    <ion-img src="../assets/images/logo_aura.png" id="aura-logo" #auraLogo></ion-img>\n  </section>\n\n  <section id="guide-scan-container" class="">\n\n    <span class="guide-images">\n\n      <div id="qr-image" class="placeholder">\n        <img src="../assets/images/qrcode.png"/>\n      </div>\n\n      <div id="logo-image" class="placeholder">\n        <img src="../assets/images/activator.png"/>\n      </div>\n\n    </span>\n\n    <span class="guide-text-instructions">\n      <p>Scan the QR code</p>\n      <p><b>OR</b></p>\n      <p>Scan the Neutrogena&reg; logo on your</p>\n      <p>Neutrogena&reg; Visibly Clear&reg; Light Therapy</p>\n      <p>Acne Mask Activator</p>\n    </span>\n\n  </section>\n\n  <section id="scan-button-container" #scanContainer>\n\n    <button ion-button id="scan-button" #scanButton (tap)="scan()">\n\n    </button>\n\n  </section>\n\n\n  <footer></footer>\n\n</ion-content>\n\n\n\n<ion-content id="homeDesktop" padding *ngIf="!mobileVersion">\n\n  <section id="client-logo" class="client-logo">\n\n    <ion-img src="../assets/images/logo_neutrogena.png" id="neutrogena-logo" #neuLogo></ion-img>\n    <span></span>\n    <ion-img src="../assets/images/logo_aura_blue@3x.png" id="aura-logo" #auraLogo></ion-img>\n  </section>\n\n  <section  id="client-content" class="client-content">\n      <h3 padding>This site is best viewed on mobile.</h3>\n\n      <ion-img src="../assets/images/activator_desktop.jpg"> </ion-img>\n      <p padding>To access on desktop, upload a photo of the Neutrogena&copy; logo on your\nVisibly Clear&copy; Light Therapy Acne Mask Activator</p>\n\n\n  </section>\n\n\n\n\n  <footer></footer>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* EvtProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EvtProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_environment_dev__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__ = __webpack_require__(26);
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
    function EvtProvider(http, auth0) {
        this.http = http;
        this.auth0 = auth0;
        console.log('Hello EvtProvider Provider', __WEBPACK_IMPORTED_MODULE_3__config_environment_dev__["a" /* Config */].evt_app);
    }
    EvtProvider.prototype.init = function () {
        EVT.use(EVT.Scan);
        EVT.setup({
            apiUrl: __WEBPACK_IMPORTED_MODULE_3__config_environment_dev__["a" /* Config */].evt_base_url,
            geolocation: false
        });
        EVT.Scan.setup({
            filter: {
                method: ["ir", "2d"]
            }
        });
        this.evtapp = new EVT.App(__WEBPACK_IMPORTED_MODULE_3__config_environment_dev__["a" /* Config */].evt_app);
        //console.log(this.getUserContext());
    };
    EvtProvider.prototype.getUserContext = function () {
        var usr = this.auth0.getUserDetailsFromStorage();
        var userContext = usr['user_metadata'].evrythngUserData;
        return (new EVT.User({
            id: userContext.evrythngUser,
            apiKey: userContext.evrythngApiKey
        }, this.evtapp));
    };
    EvtProvider.prototype.scan = function () {
        return this.evtapp.scan();
    };
    return EvtProvider;
}());
EvtProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__auth_auth_service__["a" /* AuthService */]])
], EvtProvider);

//# sourceMappingURL=evt.js.map

/***/ }),

/***/ 120:
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
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 162:
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
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
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
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AppProvider = (function () {
    function AppProvider(http) {
        this.http = http;
        console.log('Hello AppProvider Provider');
    }
    return AppProvider;
}());
AppProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AppProvider);

//# sourceMappingURL=app.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var Config = {
    production: false,
    evt_app: "UNFlt65VdIwXzmNbndPc7LBKTPoQ68ROhq0nTdvXieu66esipebEBNXdL3NpcsMfbon8xOfhppVS60IN",
    evt_base_url: "https://api-eu.evrythng.com",
    //evt_operator: "87NneGCimPPb5eZTr6nKPudKMhKzkGiqf8mvCF2N1hY2R3nOQA3sijF8KOkiZCdV9KTUpeZ3PkGacWQG",
    //evt_operator_apikey: "hohzaKH7VbVp659Pnr5m3xg2DpKBivg9rFh6PttT5AnBtEn3s17B8OPAOpBjNTWdoRlosLTxJmUrpjTi",
    projectId: "U3NNqQhUe6s7QraRakG4fpNc",
    appId: "UG7N6Q2yVMsrtNRaak34fprg"
};
//# sourceMappingURL=environment.dev.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
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
    function SignUpPage(navCtrl, navParams, render, auth0, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.invalidReg = false;
        this.formGroup = this.formBuilder.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])]
        });
    }
    SignUpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
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
    };
    SignUpPage.prototype.signup = function () {
        var _this = this;
        var usr = this.formGroup.value;
        this.auth0.signup({ email: usr.email, pass: usr.password }, usr.firstName, usr.lastName).then(function (res) {
            console.log(res);
        })
            .catch(function (err) {
            console.log(err);
            _this.invalidReg = true;
        });
    };
    SignUpPage.prototype.FBauth = function () {
        this.auth0.fbAuth();
    };
    return SignUpPage;
}());
SignUpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sign-up',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/sign-up/sign-up.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Sign Up</p>\n	<p class="form-desc">Let\'s get started with your free mindulness sessions.</p>\n	<form [formGroup]="formGroup" id="sign-up-form" #signUpForm>\n		<ion-row>\n			<ion-input type="text" formControlName="firstName" placeholder="First Name" (ionFocus)="focused($event)" [(ngModel)]="firstName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="text" formControlName="lastName" placeholder="Last Name" (ionFocus)="focused($event)" [(ngModel)]="lastName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<div class="space-40"></div>\n		<button ion-button id="signUp" class="getStarted" (tap)="signup()" [disabled]="!formGroup.valid">Get Started</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="signUpFB" class="fbReg" (tap)="FBauth()">Sign Up with Facebook</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/sign-up/sign-up.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], SignUpPage);

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sign_up_sign_up__ = __webpack_require__(222);
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
    function LoginPage(navCtrl, navParams, render, auth0, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.invalidLogin = false;
        this.formGroup = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
    };
    LoginPage.prototype.focused = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        this.render.addClass(node, "focused");
        //this.render.setStyle(node,"box-shadow","2px 2px 3px 1px rgb(240,119,33)");
    };
    LoginPage.prototype.blurred = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        this.render.removeClass(node, "focused");
        //this.render.removeStyle(node,"box-shadow");
    };
    LoginPage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        console.log("dismiss");
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
    };
    LoginPage.prototype.toSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var usr = this.formGroup.value;
        //console.log(usr);
        this.auth0.login({ email: usr.email, pass: usr.password }).then(function (res) {
            console.log(res);
        })
            .catch(function (err) {
            console.log(err);
            _this.invalidLogin = true;
        });
    };
    LoginPage.prototype.FBauth = function () {
        this.auth0.fbAuth();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/login/login.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Log In</p>\n	<p class="form-desc">Let\'s get started with your free mindulness sessions. Sign up <a class="linker" (tap)="toSignup()">here</a></p>\n	<form [formGroup]="formGroup" id="login-form" #loginForm>\n		<ion-row>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [ngClass]="{\'error\':invalidLogin}"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row class="extra-top">\n			<a class="linker" (tap)="passwordReset()">Forgot your password?</a>\n		</ion-row>\n		<button ion-button id="login" class="getStarted" (tap)="login()" [disabled]="!formGroup.valid">Log In</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="loginFB" class="fbLogin" (tap)="FBauth()">Log in with Facebook</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(243);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_auth_auth__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_evt_evt__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_app_app__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_auth_auth_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_components_module__ = __webpack_require__(334);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_auth_auth__["a" /* AuthPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* MyAccountPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_16__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */], name: 'Home', segment: 'home' },
                    { component: __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */], name: 'listPage', segment: 'list' },
                    { component: __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */], name: 'SignUpPage', segment: 'sign-up' },
                    { component: __WEBPACK_IMPORTED_MODULE_8__pages_auth_auth__["a" /* AuthPage */], name: 'Auth0Page', segment: ':data' },
                    { component: __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */], name: 'LoginPage', segment: 'login' },
                    { component: __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* MyAccountPage */], name: 'MyAccountPage', segment: 'my-account' },
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_auth_auth__["a" /* AuthPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* MyAccountPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_13__providers_evt_evt__["a" /* EvtProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_15__providers_auth_auth_service__["a" /* AuthService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_auth0_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
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
    function AuthService(http) {
        this.http = http;
        this.webAuth = new __WEBPACK_IMPORTED_MODULE_2_auth0_js__["WebAuth"]({
            clientID: 'NamR3nF2CPlOtgeF1Gsz1DXUZUYYe9JH',
            domain: 'evt-demo.eu.auth0.com',
            responseType: 'token id_token',
            audience: 'https://evt-demo.eu.auth0.com/userinfo',
            redirectUri: 'http://localhost:8100',
            scope: 'openid'
        });
        this.lock = new Auth0Lock('NamR3nF2CPlOtgeF1Gsz1DXUZUYYe9JH', 'evt-demo.eu.auth0.com');
        this.projectId = __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].projectId;
    }
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
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ msg: "Signup successfull" });
                }
            });
        });
    };
    AuthService.prototype.fbAuth = function () {
        this.webAuth.authorize({
            connection: 'facebook',
            scope: 'openid profile email phone'
        });
    };
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
        var self = this;
        if (authResult.error) {
            console.log(authResult.error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('userInfo');
            return false;
        }
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('id_token', authResult.id_token);
        this.webAuth.client.userInfo(authResult.access_token, function (err, user) {
            if (user) {
                console.log(user);
                localStorage.setItem('userInfo', JSON.stringify(user));
                self.userInfo = user;
                return true;
                // Save the tokens from the authResult in local storage or a cookie
            }
            else if (err) {
                // Handle errors
                console.log(err);
                localStorage.removeItem('access_token');
                localStorage.removeItem('id_token');
                localStorage.removeItem('userInfo');
                return false;
            }
        });
    };
    AuthService.prototype.getUserDetails = function () {
        this.lock.getUserInfo(localStorage.getItem('access_token'), function (error, profile) {
            if (!error) {
                console.log(profile);
            }
        });
    };
    AuthService.prototype.getUserDetailsFromStorage = function () {
        return JSON.parse(localStorage.getItem('userInfo'));
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        this.webAuth.logout();
    };
    AuthService.prototype.customSignup = function (usr) {
        var _this = this;
        var url = "https://evt-demo.eu.auth0.com/dbconnections/signup";
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append("Content-Type", "application/json");
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var data = {
            client_id: 'NamR3nF2CPlOtgeF1Gsz1DXUZUYYe9JH',
            email: usr.email,
            password: usr.pass
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(url, data, options).toPromise().then(function (res) {
                resolve(res);
                console.log(res);
            }).catch(function (err) {
                reject(err);
                console.log(err);
            });
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_evt_evt__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, evt) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.evt = evt;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
        //this.evt.init();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        var self = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            self.evt.init();
            console.log("EVT");
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/app/app.html"*/'<ion-menu [content]="content" side="right">\n  <button ion-button id="btnClose" menuClose><ion-icon name="close"></ion-icon></button>  \n  <side-menu></side-menu>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__providers_evt_evt__["a" /* EvtProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__evt_evt__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__evt_evt__["a"]; });
/* unused harmony reexport AuthService */




//# sourceMappingURL=providers.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__ = __webpack_require__(26);
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
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AuthPage = (function () {
    function AuthPage(navCtrl, navParams, auth0) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth0 = auth0;
    }
    AuthPage.prototype.ionViewDidLoad = function () {
        var data = this.navParams.get('data');
        if (data == "")
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        else {
            var authData = this.URLToArray(data);
            console.log(authData);
            if (this.auth0.result(authData)) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }
            else {
                //GO TO ERROR PAGE
            }
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
    return AuthPage;
}());
AuthPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-auth',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/auth/auth.html"*/'<!--\n  Generated template for the AuthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>auth</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/auth/auth.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__["a" /* AuthService */]])
], AuthPage);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
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
var MyAccountPage = (function () {
    function MyAccountPage(navCtrl, navParams, render, auth0, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.invalidReg = false;
        var usr = auth0.getUserDetailsFromStorage();
        this.formGroup = this.formBuilder.group({
            firstName: [usr['user_metadata'].firstName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            lastName: [usr['user_metadata'].lastName, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            email: [usr['email'], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])]
        });
    }
    MyAccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
    };
    MyAccountPage.prototype.focused = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        console.log(node);
        //this.render.addClass(node,"focused");
        //this.render.setStyle(node,"box-shadow","2px 2px 3px 1px rgb(240,119,33)");
    };
    MyAccountPage.prototype.blurred = function (event) {
        //console.log(event._elementRef.nativeElement);
        var node = event._elementRef.nativeElement;
        console.log(node);
        //this.render.removeClass(node,"focused");
        //this.render.removeStyle(node,"box-shadow");
    };
    MyAccountPage.prototype.dismissThis = function () {
        // should pop this page and then go to previous
        console.log("dismiss");
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
    };
    MyAccountPage.prototype.signup = function () {
        var _this = this;
        var usr = this.formGroup.value;
        this.auth0.signup({ email: usr.email, pass: usr.password }).then(function (res) {
            console.log(res);
        })
            .catch(function (err) {
            console.log(err);
            _this.invalidReg = true;
        });
    };
    MyAccountPage.prototype.FBauth = function () {
        this.auth0.fbAuth();
    };
    return MyAccountPage;
}());
MyAccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-my-account',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/my-account/my-account.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">My Account</p>\n	<form [formGroup]="formGroup" id="my-account-form" #signUpForm>\n		<ion-row>\n			<ion-label>First Name</ion-label>\n			<ion-input type="text" formControlName="firstName" placeholder="First Name" (ionFocus)="focused($event)" [(ngModel)]="firstName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-label>Last Name</ion-label>\n			<ion-input type="text" formControlName="lastName" placeholder="Last Name" (ionFocus)="focused($event)" [(ngModel)]="lastName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-label>Email Address</ion-label>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-label>Password</ion-label>\n			<ion-input type="text" formControlName="password" placeholder="Password" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<div class="space-40"></div>\n		<button ion-button id="saveChanges" class="getStarted" (tap)="updateUser()" >Save Changes</button>\n		<button ion-button id="logout" class="getStarted" (tap)="logout()">Log out</button>\n		<div class="space-40"><hr></div>\n		<button ion-button id="deleteAccount" class="fbReg" (tap)="deleteAccount()">Delete Account</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/pages/my-account/my-account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], MyAccountPage);

//# sourceMappingURL=my-account.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_scan__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__side_menu_side_menu_module__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notice_notice_module__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__footer_footer_module__ = __webpack_require__(340);
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
            __WEBPACK_IMPORTED_MODULE_4__footer_footer_module__["a" /* FooterComponentModule */],]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
        selector: 'scan',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/scan/scan.html"*/'<!-- Generated template for the ScanComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/scan/scan.html"*/
    }),
    __metadata("design:paramtypes", [])
], ScanComponent);

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__side_menu__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(13);
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
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["d" /* IonicModule */]
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

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(223);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { SignUpPage } from '../../pages/sign-up/sign-up';

/**
 * Generated class for the SideMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SideMenuComponent = (function () {
    function SideMenuComponent(auth0, app) {
        this.auth0 = auth0;
        this.app = app;
        this.links = [];
    }
    SideMenuComponent.prototype.ngOnInit = function () {
        this.links = [
            { title: "Privacy Policy", },
            { title: "Cookie Policy", },
            { title: "Modern Slavery Act Statement", },
            { title: "Legal Notice", },
            { title: "About AURA", }
        ];
    };
    SideMenuComponent.prototype.ngAfterViewInit = function () {
    };
    SideMenuComponent.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        var nav = this.app.getRootNav();
        nav.setRoot(page.component);
    };
    SideMenuComponent.prototype.login = function () {
        var nav = this.app.getRootNav();
        nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
    };
    SideMenuComponent.prototype.logout = function () {
        this.auth0.logout();
    };
    SideMenuComponent.prototype.loggedIn = function () {
        if (localStorage.getItem('access_token') && localStorage.getItem('access_token') != "") {
            return true;
        }
        else {
            return false;
        }
    };
    return SideMenuComponent;
}());
SideMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'side-menu',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/side-menu/side-menu.html"*/'<!-- Generated template for the SideMenuComponent component -->\n<ion-content>\n  <ion-list>\n  	<!-- unused <button menuClose class="main" ion-item >My Account</button> -->\n  	<button menuClose class="main" ion-item *ngIf="!loggedIn()" (tap)="login()">Log In</button>\n  	<button menuClose class="main" ion-item *ngIf="loggedIn()" (tap)="logout()">Log Out</button>\n    <button menuClose ion-item *ngFor="let p of links" (click)="openPage(p)">\n      {{p?.title}}\n    </button>\n  </ion-list>\n\n  <section class="footer">\n  	<ion-row class="container">\n  		<ion-col class="neutrogena">\n  			<img src="../assets/images/logo_neutrogena.png"/>\n  		</ion-col>\n  		<ion-col class="aura">\n  			<img src="../assets/images/logo_aura_blue.png"/>\n  		</ion-col>\n  	</ion-row>\n  </section>\n</ion-content>'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/side-menu/side-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]])
], SideMenuComponent);

//# sourceMappingURL=side-menu.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notice__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(13);
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
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["d" /* IonicModule */]
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

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function NoticeComponent(render, element) {
        this.render = render;
        this.element = element;
        this.title = "";
    }
    NoticeComponent.prototype.ngOnInit = function () {
    };
    NoticeComponent.prototype.destroy = function () {
        console.log(this.element.nativeElement);
        this.render.setStyle(this.element.nativeElement, "display", "none");
        //this.content.setElementStyle("display","none");
    };
    return NoticeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("title"),
    __metadata("design:type", String)
], NoticeComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("style"),
    __metadata("design:type", Object)
], NoticeComponent.prototype, "style", void 0);
NoticeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'notice',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/notice/notice.html"*/'<!-- Generated template for the NoticeComponent component -->\n<section class="body" [ngStyle]="style">\n	<button ion-button id="btnClose" (click)="destroy()"><ion-icon name="close"></ion-icon></button>  \n	<span class="title" *ngIf="title">\n		{{title}}\n	</span>\n	<div class="body">\n		<ng-content>\n		  \n		</ng-content>\n	</div>\n</section>\n'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/notice/notice.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], NoticeComponent);

//# sourceMappingURL=notice.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__footer__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(13);
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
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["d" /* IonicModule */]
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

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function FooterComponent() {
        this.links = [];
        console.log(this);
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.links = [
            { text: "Privacy Policy", href: "javascript:void()" },
            { text: "Cookie Policy", href: "javascript:void()" },
            { text: "Legal Notice", href: "javascript:void()" },
            { text: "Modern Slavery Act Statement", href: "javascript:void()" },
        ];
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'footer',template:/*ion-inline-start:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/footer/footer.html"*/'<section id="footer" #footer>\n    \n	<nav id="footer-links" class="footer-links">\n	  <a *ngFor="let a of links" [href]="a?.href">{{a?.text}}\n	  </a>\n	</nav>\n\n\n	<p class="disclaimer" id="disclaimer"> \n	  This site is best viewed with Internet Explorer 7.0 or higher. &copy; Johnson & Johnson Limited 2017. This site is published by Johnson & Johnson Ltd, which is solely responsible for its contents. It is intended for a UK audience. Site last updated on: 21 September 2017.\n	</p>\n</section>'/*ion-inline-end:"/Users/jeremiebeltran/Documents/EVT/evt-neutrogena/src/components/footer/footer.html"*/
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.js.map

/***/ })

},[224]);
//# sourceMappingURL=main.js.map