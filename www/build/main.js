webpackJsonp([0],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScriptService; });
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

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_aura_config_aura_config__ = __webpack_require__(227);
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
 *	Generated class for the AppProvider provider.
 *
 *	This is the main service for handling user progress
 *	This contains all the progress variables.
 *	The variables in the content page are here.
*/
var AppProvider = (function () {
    function AppProvider(http) {
        this.http = http;
        this.progressArr = [];
        this.progressKeys = [];
        this.courses = [];
        this.activeDur = 1;
        console.log(__WEBPACK_IMPORTED_MODULE_3__assets_aura_config_aura_config__["a" /* aura */]);
        this.initCourses();
    }
    /* GET the aura variable containing the content details, path..etc. */
    AppProvider.prototype.toGroup = function () {
        var _this = this;
        var mast = [];
        var promises = __WEBPACK_IMPORTED_MODULE_3__assets_aura_config_aura_config__["a" /* aura */].map(function (ar) {
            var crs = ar.Course.trim();
            if (mast.hasOwnProperty(crs)) {
                mast[crs][ar.Day] = { id: ar.ID, title: ar.Title, path: ar.path, desc: ar.Description };
            }
            else {
                mast[crs] = {};
                mast[crs][ar.Day] = { id: ar.ID, title: ar.Title, path: ar.path, desc: ar.Description };
            }
        });
        return Promise.all(promises).then(function () { _this.progressKeys = Object.keys(mast); return mast; });
    };
    /* set the active course for the top component in the main page */
    AppProvider.prototype.setActiveCourse = function (val) {
        var _this = this;
        this.activeCourse = val;
        var ll = Object.keys(this.activeCourse).map(function (a) { return _this.activeCourse[a]; });
        this.activeDur = ll.length; //subtract 2 because there are 2 extra fields: current progress and title
    };
    AppProvider.prototype.setDur = function (val) {
        this.activeDur = val;
    };
    AppProvider.prototype.initCourses = function () {
        var self = this;
        self.toGroup().then(function (res) {
            self.initProgArr();
            self.courses = res;
            self.activeCourse = res['Mindfulness'];
            self.activeDur = Object.keys(self.activeCourse).length;
        });
    };
    AppProvider.prototype.initProgArr = function () {
        var self = this;
        this.progressKeys.forEach(function (val, ind) {
            var init = { val: [] };
            self.progressArr.push(init);
        });
    };
    AppProvider.prototype.updateUserProgress = function () {
        //TODO: get user data first from EVT. probably from custom fields
        //TODO: assign user data to existing mapping.
    };
    return AppProvider;
}());
AppProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AppProvider);

//# sourceMappingURL=app.js.map

/***/ }),

/***/ 128:
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
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_auth0_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(338);
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



// import { HomePage } from '../../pages/home/home';


var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.clientDefId = "ZQzpUoZgrpMC4pKn3ipIfgSudQ9J_uE1";
        this.clientDefSecret = "1omoA1OU8WmxdLpiCXvaTcsgLDRXsOUCbrmQ1U3BTtLg_P0MinVMqDRoYmQFcJxG";
        /* main auth0 variable. */
        this.webAuth = new __WEBPACK_IMPORTED_MODULE_2_auth0_js__["WebAuth"]({
            clientID: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.clientID,
            domain: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.domain,
            responseType: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.responseType,
            audience: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.audience,
            redirectUri: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.redirectUri,
            scope: 'openid'
        });
        this.lock = new Auth0Lock(__WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.clientID, __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.domain);
        this.projectId = __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].projectId;
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
            else {
                localStorage.setItem('access_token', authResult.access_token);
                localStorage.setItem('id_token', authResult.id_token);
                _this.webAuth.client.userInfo(authResult.access_token, function (err, user) {
                    /* Successful auth */
                    if (user) {
                        console.log(user);
                        localStorage.setItem('userInfo', JSON.stringify(user));
                        self.userInfo = user;
                        resolve(user);
                        /* Failure at auth */
                    }
                    else if (err) {
                        // Handle errors
                        console.log(err);
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('id_token');
                        localStorage.removeItem('userInfo');
                        localStorage.removeItem('evrythngInfo');
                        reject(err);
                    }
                });
            }
        });
    };
    /* store EVT info in the localstorage */
    AuthService.prototype.setEVTInfo = function () {
        if ((localStorage.access_token && localStorage.id_token) && (!localStorage.evrythngInfo || localStorage.evrythngInfo === "undefined")) {
            var user = this.getUserDetailsFromStorage();
            var res = Object.keys(user).filter(function (a) { return (a.indexOf("user_metadata") > -1); });
            localStorage.setItem('evrythngInfo', JSON.stringify(user[res[0]].evrythngUserData));
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
        console.log(usr);
        localStorage.setItem('userInfo', JSON.stringify(usr));
    };
    /* Get the user metadata from local storage */
    AuthService.prototype.getUserMetadataFromStorage = function () {
        return JSON.parse(localStorage.getItem('userInfo'))['user_metadata'];
    };
    /* trigger logout. User should redirect to the returnTo field specified below */
    AuthService.prototype.logout = function () {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('evrythngInfo');
        this.webAuth.logout({
            returnTo: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.redirectUri,
            clientID: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.clientID
        });
    };
    /* Update user metadata via auth0 manage */
    AuthService.prototype.updateUser = function (usrMetaData) {
        var umd = this.getUserMetadataFromStorage();
        umd["firstName"] = usrMetaData.firstName;
        umd["lastName"] = usrMetaData.lastName;
        var auth0Manage = new __WEBPACK_IMPORTED_MODULE_2_auth0_js__["Management"]({
            domain: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.domain,
            token: localStorage.getItem('id_token')
        });
        var usrInfo = this.getUserDetailsFromStorage();
        //console.log(usrInfo);
        return new Promise(function (resolve, reject) {
            auth0Manage.patchUserMetadata(usrInfo['user_id'], umd, function (err, resp) {
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
        return this.getUserDetailsFromStorage()['sub'] && this.getUserDetailsFromStorage()['sub'].indexOf("facebook") > -1;
    };
    /* Delete the user account via user management client */
    AuthService.prototype.deleteUser = function () {
        var _this = this;
        var self = this;
        var id = (self.isFB() ? this.getUserDetailsFromStorage()['sub'] : self.getUserDetailsFromStorage()['user_id']);
        var hdr = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        hdr.append("Content-Type", "application/json");
        return new Promise(function (resolve, reject) {
            _this.requestMgmtToken().then(function (res) {
                hdr.append("Authorization", "Bearer " + res['access_token']);
                var opts = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: hdr });
                self.http.delete("https://" + __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.domain + "/api/v2/users/" + id, opts)
                    .toPromise()
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    /* Delete the user password via user management client */
    AuthService.prototype.updatePassword = function (newPass) {
        var _this = this;
        var self = this;
        var id = this.getUserDetailsFromStorage()['user_id'];
        var hdr = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        hdr.append("Content-Type", "application/json");
        var body = { "password": newPass };
        return new Promise(function (resolve, reject) {
            _this.requestMgmtToken().then(function (res) {
                hdr.append("Authorization", "Bearer " + res['access_token']);
                var opts = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: hdr });
                self.http.patch("https://" + __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.domain + "/api/v2/users/" + id, body, opts)
                    .toPromise()
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    /* request oauth token via auth0 management client *
     * this will be used for management api requests   */
    AuthService.prototype.requestMgmtToken = function () {
        var _this = this;
        var hdr = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        hdr.append("Content-Type", "application/json");
        var body = {
            grant_type: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0Mgmt.grant_type,
            client_id: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0Mgmt.client_id,
            client_secret: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0Mgmt.client_secret,
            audience: __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0Mgmt.audience
        };
        var opts = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: hdr });
        return new Promise(function (resolve, reject) {
            _this.http.post('https://' + __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.domain + '/oauth/token', body, opts)
                .toPromise()
                .then(function (res) {
                localStorage.setItem('managementToken', JSON.stringify(res.json()));
                resolve(res.json());
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /* Search user by email via auth0 management client */
    AuthService.prototype.searchUser = function (mail) {
        var _this = this;
        var self = this;
        var hdr = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        hdr.append("Content-Type", "application/json");
        var body = "q=email%3A%22" + encodeURIComponent(mail) + "%22&search_engine=v2";
        return new Promise(function (resolve, reject) {
            _this.requestMgmtToken().then(function (res) {
                hdr.append("Authorization", "Bearer " + res['access_token']);
                var opts = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: hdr });
                self.http.get("https://" + __WEBPACK_IMPORTED_MODULE_0__config_environment_dev__["a" /* Config */].auth0.domain + "/api/v2/users?" + body, opts)
                    .toPromise()
                    .then(function (res) {
                    resolve(res.json()[0]);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                console.log(err);
            });
        });
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
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 170:
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
webpackEmptyAsyncContext.id = 170;

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return aura; });
var aura = [
    {
        "Day": 1,
        "Course": "Mindfulness",
        "Title": "How to Sit",
        "Description": "This meditation was designed with the beginner in mind. It will guide you through the basics of how to sit in meditation and help you to start developing your practice. \nby Happiness Insight\nAbout AURA",
        "Author": "Happiness Insight",
        "ID": "hi1",
        "path": "How to Sit.html"
    },
    {
        "Day": 2,
        "Course": "Mindfulness",
        "Title": "Beginner's Mind",
        "Description": "There's a Chinese saying which states \"Renew yourself, completely each day. Do it again, and forever again.\" In this session we view our whole body as though it's brand new, no previous stories attached. Discover a new, curious relationship with your body, your mind and your life today. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e136",
        "path": "Beginner_s Mind.html"
    },
    {
        "Day": 3,
        "Course": "Mindfulness",
        "Title": "Body Scan",
        "Description": "Give your mind and body the gift of compassionate presence through this core mindfulness practice.\nby Ryan James Kenny\nAbout AURA",
        "Author": "Ryan James Kenny",
        "ID": "r6",
        "path": "Body Scan - Ryan James.html"
    },
    {
        "Day": 4,
        "Course": "Mindfulness",
        "Title": "Breath Sensing",
        "Description": "This guided meditation will help quiet your mind and settle your nervous system by paying attention to your breath. Breath sensing is an effective way to calm down and refocus, and can be used anytime, anywhere to return to your center.\nby Cassandra Carlopio\nAbout AURA",
        "Author": "Cassandra Carlopio",
        "ID": "-Kr3D9jPCHwW31EQ2lxK",
        "path": "Breath Sensing.html"
    },
    {
        "Day": 5,
        "Course": "Mindfulness",
        "Title": "Body Sweep Part by Part",
        "Description": "Practice giving your full attention to your body, part by part.\nby Lisa Pollard\nAbout AURA",
        "Author": "Lisa Pollard",
        "ID": "lp4",
        "path": "Body Sweep Part by Part.html"
    },
    {
        "Day": 6,
        "Course": "Mindfulness",
        "Title": "Naming Thoughts",
        "Description": "There is a common misconception about meditation that it is all about \"stopping thoughts.\" But that can be an exercise in frustration, since our minds are accustomed to thinking. Rather, mindfulness is about bringing our full awareness to whatever is present for us, including our thoughts. In this meditation, you will practice naming the kinds of thoughts coming up for you. You will learn how to be the observer of your own thinking, which ultimately will allow you to respond to events in your life with wisdom, rather than being a reaction to them.\nby Christina McMahon\nAbout AURA",
        "Author": "Christina McMahon (Aura)",
        "ID": "b47",
        "path": "Naming Thoughts.html"
    },
    {
        "Day": 7,
        "Course": "Mindfulness",
        "Title": "Sounds",
        "Description": "When you meditate, it is always helpful to have something to anchor your attention to. Usually, that is your breathing. In this meditation, however, you will use the sounds in your environment as your attention anchor. This will train you to be more in tune with your senses and can create a deeper sense of awareness in your everyday life.\nby Christina McMahon\nAbout AURA",
        "Author": "Christina McMahon (Aura)",
        "ID": "b38",
        "path": "Sounds.html"
    },
    {
        "Day": 8,
        "Course": "Mindfulness",
        "Title": "Everyday Mindfulness",
        "Description": "A natural byproduct of mindfulness is becoming aware of what is in the moment and what's possible. It's not to change us but to help us hold presence. This ancient technique of gazing is a potent mindfulness practice in order to grow consciousness and to cultivate fierce focus. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "b31",
        "path": "Everyday Mindfulness.html"
    },
    {
        "Day": 9,
        "Course": "Mindfulness",
        "Title": "Muscle Relaxation",
        "Description": "Feeling stressed or tight? This practice will help you identify and release muscular tension.\nby Lyndi Smith\nAbout AURA",
        "Author": "Lyndi Smith",
        "ID": "l3",
        "path": "Muscle Relaxation.html"
    },
    {
        "Day": 10,
        "Course": "Mindfulness",
        "Title": "Lovingkindness for Ourself and Others",
        "Description": "Loving yourself and others around you is one of the simplest yet most powerful way to bring happiness to yourself.\nby Kristy Arbon \nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e72",
        "path": "Lovingkindness for Ourself and Others.html"
    },
    {
        "Day": 1,
        "Course": "Refreshing ",
        "Title": "Awakening Factor of Joy",
        "Description": "By returning to our practice, time after time, we can realise a peaceful and heart-fufilling life. A permanent and deep joy naturally bubbles up and we feel that spread all over our bodies. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e22",
        "path": "Awakening Factor of Joy.html"
    },
    {
        "Day": 4,
        "Course": "Refreshing ",
        "Title": "Breath Mindfulness",
        "Description": "Focus on your breathing as you breath gently. There is nothing else to do except notice that you are breathing. Allowing your experience to be simple and nourishing. \nby Kristy Arbon\nAbout AURA",
        "Author": "Kristy Arbon (Aura) ",
        "ID": "b20",
        "path": "Breath Mindfulness.html"
    },
    {
        "Day": 2,
        "Course": "Refreshing ",
        "Title": "Be with Open Awareness",
        "Description": "A broad awareness practice, to help us be with the whole of our present moment experience. \nby Mark Quirk\nAbout AURA",
        "Author": "Mark Quirk",
        "ID": "-KqE-alcVOt93b8JYqvb",
        "path": "Be with Open Awareness.html"
    },
    {
        "Day": 3,
        "Course": "Refreshing ",
        "Title": "Becoming ",
        "Description": "This session is about becoming something that you know you can be. Whether it's having more patience, being more compassionate - whatever it is - climb into the moment with a little more attention and a little more care. In this session a internal body scan technique is used to release resistence and soften into what you are and what you're becoming. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e107",
        "path": "Becoming.html"
    },
    {
        "Day": 5,
        "Course": "Refreshing ",
        "Title": "Daily Refresh ",
        "Description": "Give yourself a time to refresh your perspective taking in the stillness of the moment, when we can feel deeply comfortable, relaxed and at ease. \nby Happiness Insight\nAbout AURA",
        "Author": "Happiness Insight",
        "ID": "hi6",
        "path": "Good Morning.html"
    },
    {
        "Day": 6,
        "Course": "Refreshing ",
        "Title": "Gratitude For The People In Your Life",
        "Description": "Learn to offer gratitude to someone who has been good to you, cultivate and savour feelings of kindness and appreciation as a way to support your own wellbeing.\nby Kristy Arbon\nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e81",
        "path": "Gratitude For The People In Your Life.html"
    },
    {
        "Day": 7,
        "Course": "Refreshing ",
        "Title": "Light",
        "Description": "Cultivate peace from within and share the light with everyone around you through this powerful visualisation practice. \nby Ryan James Kenny\nAbout AURA",
        "Author": "Ryan James Kenny",
        "ID": "r4",
        "path": "Light.html"
    },
    {
        "Day": 8,
        "Course": "Refreshing ",
        "Title": "Sink into Stillness",
        "Description": "Underneath the busyness of our lives and our minds, there is a calm pool of stillness that we can always dip into. In this meditation you will connect with that stillness and return recharged and rejuvenated after this session. \nby Christina McMahon\nAbout AURA",
        "Author": "Christina McMahon",
        "ID": "cd10",
        "path": "Sink Into Stillness.html"
    },
    {
        "Day": 9,
        "Course": "Refreshing ",
        "Title": "Spaciousness",
        "Description": "Space is everywhere. It's open, accepting, infinite, and indestructible. Tap into these freeing qualities as you open up to the spaciousness within you and around you.\nby Ryan James Kenny\nAbout AURA",
        "Author": "Ryan James Kenny",
        "ID": "-KpXhQlgYf2CwfkwIbwl",
        "path": "Spaciousness.html"
    },
    {
        "Day": 10,
        "Course": "Refreshing ",
        "Title": "Thank You",
        "Description": "In this session we find an easy, natural breathing pattern and attach an affirmation of gratitude, \"thank you\". It's a general thank you, and a full on inquiry into what it is you can be thankful for. Gratitude is the understanding that so many things have come together for us to just take one more breath, and that we're a part of something that is a privilege.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e41",
        "path": "Thank You.html"
    },
    {
        "Day": 1,
        "Course": "Focus",
        "Title": "21-Breaths Meditation ",
        "Description": "This short meditation practice can be helpful at times when the mind is really active, agitated or restless. By engaging the mind in focusing on a breathing routine and counting each breath up to twenty-one, the mind is encouraged to become calmer and more focussed. However, our intention is merely to encourage the mind, not to force it. We are approaching the practice with a sense of non-striving, allowing the mind to be as it is; if it is willing to settle, that’s fine, if not, that’s fine too – we simply notice it’s activity. If you become distracted and lose track of counting at any point, or if you reach twenty-one, simply begin again at one, and any time you wish to, simply let go of counting and observe the breath.\nby William James Davies, DCMT\nAbout AURA",
        "Author": "William James Davies, DCMT",
        "ID": "-Kr7nvf3aTlO2-BB2K_4",
        "path": "21-Breaths Meditation.html"
    },
    {
        "Day": 2,
        "Course": "Focus",
        "Title": "Awareness of Sounds",
        "Description": "When we are beginning a meditation practice, we tend to have the idea that sounds are a distraction and we desire a perfectly tranquil, or soundproofed setting, for our spiritual endeavors. We should overcome that and learn how to be present in the moment, exactly as it is. If sounds are part of that present moment, use them as an object of focus to help turn your attention inward.\nby Hilary Jackendoff\nAbout AURA",
        "Author": "Hilary Jackendoff",
        "ID": "-Krsk6E8H2wm2bJEID6t",
        "path": "Awareness of Sounds.html"
    },
    {
        "Day": 3,
        "Course": "Focus",
        "Title": "Body Scan",
        "Description": "Want to relax or refresh? The body scan is a relaxing way to become present by noticing bodily sensations.\nby Lyndi Smith\nAbout AURA",
        "Author": "Lyndi Smith",
        "ID": "l10",
        "path": "Body Scan - Lyndi.html"
    },
    {
        "Day": 4,
        "Course": "Focus",
        "Title": "Breath & Sounds",
        "Description": "Pay attention to your breath and the sounds around you to increase focus.\nby Lisa Pollard\nAbout AURA",
        "Author": "Lisa Pollard",
        "ID": "lp6",
        "path": "Breath _ Sounds.html"
    },
    {
        "Day": 5,
        "Course": "Focus",
        "Title": "Calm Inward Focus",
        "Description": "Gather yourself inward and for a few precious moments, stop focusing on the external environment and what's going on there. This session will give you intentional inward focus. We use a classical and effective yogic breathing technique to hone our focus and calm the mind. \nby Lauren Ziegler \nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e124",
        "path": "Calm Inward Focus.html"
    },
    {
        "Day": 6,
        "Course": "Focus",
        "Title": "Mindful Listening Meditation",
        "Description": "This meditation helps you to cultivate your present moment awareness. \nby Carla-Jo Geraghty\nAbout AURA",
        "Author": "Carla-Jo Geraghty",
        "ID": "-KpqM6NnPOWMiPfazwBO",
        "path": "Mindful Listening Meditation.html"
    },
    {
        "Day": 7,
        "Course": "Focus",
        "Title": "The Art of Stillness",
        "Description": "Experience the art and beauty of stillness in your mind and body so that you may experience a deeper calm that exists within you. \nby Dorothy Ratusny\nAbout AURA",
        "Author": "Dorothy Ratusny",
        "ID": "-KsWjlnpMIaScf3xkTxe",
        "path": "The Art of Stillness.html"
    },
    {
        "Day": 8,
        "Course": "Focus",
        "Title": "Three-Step Being Space",
        "Description": "Feeling a little overwhelmed or stuck? Use these 3 steps of awareness to create just enough space to make a decision about your next life steps.\nby Mark Quirk\nAbout AURA",
        "Author": "Mark Quirk",
        "ID": "-KqE8XxbYQuWS9e2yjHf",
        "path": "Three-Step Being Space.html"
    },
    {
        "Day": 9,
        "Course": "Focus",
        "Title": "Visualize Your Goals",
        "Description": "Do you have a cherished goal you're working toward? Visualisation is a powerful tool to get you focused and clear about achieving your goals. In order to \"be it,\" you have to be able to \"see it.\" Step into your best life with this powerful visualisation technique.\nby C + D (Christina + Darrin)\nAbout AURA",
        "Author": "C + D (Christina + Darrin)",
        "ID": "-KsOJxY1rZyyLWXAYTDK",
        "path": "Visualize Your Goals.html"
    },
    {
        "Day": 10,
        "Course": "Focus",
        "Title": "Waves of Breath",
        "Description": "Pause for a few minutes to let the breath wash away stress and bring you back to the present.\nby Ryan James Kenny\nAbout AURA",
        "Author": "Ryan James Kenny",
        "ID": "-Kpmuh_YqL9tYvY1Jb3O",
        "path": "Waves of Breath.html"
    },
    {
        "Day": 1,
        "Course": "Happiness",
        "Title": "Heart Light",
        "Description": "Find your true heart light\n                  by C + D (Christina + Darrin)\n                  About AURA",
        "Author": "C + D (Christina + Darrin)",
        "ID": "cd9(3)",
        "path": "Heart Light.html"
    },
    {
        "Day": 2,
        "Course": "Happiness",
        "Title": "Appreciative Joy",
        "Description": "In our world today we are subtly taught to focus on the flaws in others. But when we start re-training our brains to notice their goodness instead, we are actually investing in our own happiness. When we are able to notice others' virtues, we are better able to appreciate it in ourselves as well. That appreciation for goodness is what we will be practicing in this meditation.\nby Christina McMahon \nAbout AURA",
        "Author": "Christina McMahon (Aura)",
        "ID": "b40",
        "path": "Appreciative Joy.html"
    },
    {
        "Day": 3,
        "Course": "Happiness",
        "Title": "Attention to Happiness",
        "Description": "In this session we feel the sense of an inner smile radiating throughout the entire body, mind and more. We imagine pulsating cells brimming with joy and bliss. We will use breath and watch thoughts and sensations as they change, bringing a deep sense of enlivenment. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e4",
        "path": "Attention to Happiness.html"
    },
    {
        "Day": 4,
        "Course": "Happiness",
        "Title": "Comfortable Here",
        "Description": "Negative thoughts? This practice helps us direct attention away from thinking and enjoy comfortable sensations we may not be noticing.\nby Lyndi Smith\nAbout AURA",
        "Author": "Lyndi Smith",
        "ID": "l6",
        "path": "Comfortable Here.html"
    },
    {
        "Day": 5,
        "Course": "Happiness",
        "Title": "Cultivating Joy",
        "Description": "Want to increase your happiness quota today? It may be as simple as tapping into the joy that others are experiencing. When you can do this with an open heart, it is an important corrective to feelings of envy. When you can feel genuine happiness for another person's win, you are communicating a new belief in abundance that there's more than enough happiness to go around.\nby Christina McMahon \nAbout AURA",
        "Author": "Christina McMahon (Aura)",
        "ID": "b35",
        "path": "Cultivating Joy.html"
    },
    {
        "Day": 6,
        "Course": "Happiness",
        "Title": "Gratitude",
        "Description": "Practice gratitude to cultivate happiness in your life.\nby Heather Prete\nAbout AURA",
        "Author": "Heather Prete",
        "ID": "hp2",
        "path": "Gratitude.html"
    },
    {
        "Day": 7,
        "Course": "Happiness",
        "Title": "Gratitude Meditation",
        "Description": "It's so easy to wish that our lives were different - that we had a different job, lived in a different place or had a different partner. This is so often our pattern - break free of that pattern by acknowledging it when it arises and consciously cultivating gratitude. \nby Hilary Jackendoff\nAbout AURA",
        "Author": "Hilary Jackendoff",
        "ID": "-KrsjDZENifwb40CH-EL",
        "path": "Gratitude Meditation.html"
    },
    {
        "Day": 8,
        "Course": "Happiness",
        "Title": "Light of Lovingkindness",
        "Description": "Lovingkindness is the essence of a happy life. By generating boundless heart energy for ourselves and others, we open a gateway for more love to flow to us.\nby Christina McMahon\nAbout AURA",
        "Author": "Christina McMahon",
        "ID": "cd5",
        "path": "Light of Lovingkindness.html"
    },
    {
        "Day": 9,
        "Course": "Happiness",
        "Title": "Lovingkindness for a Friend",
        "Description": "Open the heart and mind and deepen your sense of connection with this lovingkindness practice directed towards a dear friend.  \nby Pause Meditation\nAbout AURA",
        "Author": "Pause Meditation",
        "ID": "-Kq4taDGjhykrzvCgCEB",
        "path": "Loving-Kindness for a Friend.html"
    },
    {
        "Day": 10,
        "Course": "Happiness",
        "Title": "Offering Out Compassion and Lovingkindness",
        "Description": "When we're feeling great, when our own cup is full of feelings of well-being, we can make ourselves even happier by offering those feelings of kindness and well-being out to other people.\nby Kristy Arbon \nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e68",
        "path": "Offering Out Compassion and Lovingkindness.html"
    },
    {
        "Day": 1,
        "Course": "Selflove",
        "Title": "A Moment of Self-Appreciation to Use Later",
        "Description": "Allowing yourself to feel some appreciation for yourself. Things that you've done in your life have lead to you feeling this way. Allow yourself to delight in yourself and all of your good work, and then save this feeling for a time when you'll need it in the future.\nby Kristy Arbon \nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e84",
        "path": "A Moment of Self-Appreciation to Use Later.html"
    },
    {
        "Day": 2,
        "Course": "Selflove",
        "Title": "May You Have Everything You Need",
        "Description": "Sit with yourself, be with yourself for a few minutes and offer yourself words of support and encouragement. May you thrive, may you feel peaceful, may you remember that you are a precious human being, may you feel at ease.\nby Kristy Arbon \nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e80",
        "path": "May You Have Everything You Need.html"
    },
    {
        "Day": 3,
        "Course": "Selflove",
        "Title": "Compassionate Self-talk",
        "Description": "We're so hard on ourselves. True healing takes place when we're able to show up to a given condition honestly and fully, the highs and the lows. In this session, create a hospitable space that includes kindness towards yourself.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e7",
        "path": "Compassionate Self-talk.html"
    },
    {
        "Day": 4,
        "Course": "Selflove",
        "Title": "I Am Enough",
        "Description": "This session uses slow, measured breaths to set it up so that you may do some self-inquiry. Look into the feeling of being overwhelmed and what other feelings come with it. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e131",
        "path": "I Am Enough.html"
    },
    {
        "Day": 5,
        "Course": "Selflove",
        "Title": "Just As It Is",
        "Description": "Bit by bit, tune into your inner world and notice what it's like to be you right now in your life. No need to figure anything out or fix anything, just noticing and letting it be. In this session we will use a body scan technique, allowing each part of our body to be just as it is.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e104",
        "path": "Just As It Is.html"
    },
    {
        "Day": 6,
        "Course": "Selflove",
        "Title": "Kindness to Self - Using Phrases",
        "Description": "In this kindness to self meditation we will gently cultivate a sense of warmth and kindness to ourselves. \nby Carla-Jo Geraghty\nAbout AURA",
        "Author": "Carla-Jo Geraghty",
        "ID": "-KsIu5LljrPj0tLf3qjj",
        "path": "Kindness to Self - Using Phrases.html"
    },
    {
        "Day": 7,
        "Course": "Selflove",
        "Title": "Manifestation and Empathetic Joy",
        "Description": "Empathetic Joy is delight in others' good fortune. When we view the world through the eyes of abundance, there's not much we can fail to attract into our own lives.\nby Christina McMahon\nAbout AURA",
        "Author": "Christina McMahon",
        "ID": "cd7",
        "path": "Manifestation and Empathetic Joy.html"
    },
    {
        "Day": 8,
        "Course": "Selflove",
        "Title": "Meditation for Inner Peace",
        "Description": "Experience inner peace deliberately as you choose a point of focus within your body and hold attention and awareness here. As you allow your breath to be directed into this area, feel the sensations of peacefulness throughout your body.\nby Dorothy Ratusny\nAbout AURA",
        "Author": "Dorothy Ratusny",
        "ID": "-Krxk-O0zpOZ9MCZf-Xo",
        "path": "Meditation for Inner Peace.html"
    },
    {
        "Day": 9,
        "Course": "Selflove",
        "Title": "Self-Appreciation: 3 Things I Like About Myself",
        "Description": "Deep down, in the core of your being, there are some really good things about yourself that you really like - allow yourself to savour these good feelings.\nby Kristy Arbon\nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e90",
        "path": "Self-Appreciation- 3 Things I Like About Myself.html"
    },
    {
        "Day": 10,
        "Course": "Selflove",
        "Title": "Worthiness",
        "Description": "This is a visualisation session. We imagine a golden spark that grows and grows, which is the energy that helps you see your self-worth and your higher self shining.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e43",
        "path": "Worthiness.html"
    },
    {
        "Day": 1,
        "Course": "Healing",
        "Title": "Boulders",
        "Description": "This is a motivating session for working through the thing that's holding you back. We use the metaphor of boulder in the center of your room that you keep ignoring. Choose what you're going to do to clear the way once and for all. Decide to change your life for the good. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e36",
        "path": "Boulders.html"
    },
    {
        "Day": 2,
        "Course": "Healing",
        "Title": "Breathing Kindness In, Releasing Difficulty Out",
        "Description": "Intentionally breathing in kindness. You especially need kindness right now and you can breathe this in for yourself. Breathing out whatever you don't need right now - intentionally letting go of any difficulty.\nby Kristy Arbon\nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e56",
        "path": "Breathing Kindness In_ Releasing Difficulty Out.html"
    },
    {
        "Day": 3,
        "Course": "Healing",
        "Title": "Building Resilience",
        "Description": "Sometimes it can feel like we're going through life pushing a boulder uphill that's three times the size of us. There are so many things all at once and we can get overwhelmed. This session isn't about fixing it all, because we'll never really stop pushing that boulder. However this session will teach you how to become so much more resilient and stronger, so that the uphill game of life is less burdensome.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e37",
        "path": "Building Resilience.html"
    },
    {
        "Day": 4,
        "Course": "Healing",
        "Title": "Filled",
        "Description": "In this session, we close our eyes and go through the whole body piece by piece, filling it with light. We bring relaxed and vibrant attention into the body, and we settle the mind. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e99",
        "path": "Filled.html"
    },
    {
        "Day": 5,
        "Course": "Healing",
        "Title": "Freakout Formula",
        "Description": "This session will offer you a simple and profound freakout formula. See through your reactivity and ease your sufferring. These are steps to use mindfulness to help get out in front of the freaking out. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e20",
        "path": "Freakout Formula.html"
    },
    {
        "Day": 6,
        "Course": "Healing",
        "Title": "Letting Go of Resistance ",
        "Description": "When we fight our reality or struggle against change, we can inadvertently create more suffering for ourselves. By allowing ourselves to let go and accept things as they are, we suffer less. This meditation is designed to help you let go of the things that you can't control through the use of your body and mind. \nby Happiness Insight\nAbout AURA",
        "Author": "Happiness Insight",
        "ID": "-Ksdh0wWxnyxA7vaXU8n",
        "path": "Letting Go of Resistance.html"
    },
    {
        "Day": 7,
        "Course": "Healing",
        "Title": "Reinforcements",
        "Description": "In this session, we bring in all the reinforcements. Bring in your special memories, places, and people that give you a sense of peace and well-being and evoke feelings of comfort and rest. As the sense of ease and security remains, you'll discover that you have these inner resources with you all of the time. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e12",
        "path": "Reinforcements.html"
    },
    {
        "Day": 8,
        "Course": "Healing",
        "Title": "Self Compassion Break",
        "Description": "Learn to take a self-compassion break in your day. You deserve it! \nby Dea Rivera\nAbout AURA",
        "Author": "Dea Rivera",
        "ID": "-Kqhcwmo7WUXVz8cmrwc",
        "path": "Self Compassion Break.html"
    },
    {
        "Day": 9,
        "Course": "Healing",
        "Title": "Soften and Let Go Again",
        "Description": "This session begins with deep breathing to make it easier to soften and loosen the grip physically, mentally, emotionally, and spiritually.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler",
        "ID": "-KsP1iYUGYIV9VrUQZdf",
        "path": "Soften and Let Go Again.html"
    },
    {
        "Day": 10,
        "Course": "Healing",
        "Title": "This Emotion is not Me or Mine",
        "Description": "We don't choose to have difficult emotions. They are not ours to claim. We didn't create them, we can release them, and they don't define us. We can find a little relief in the moment by choosing to not hang on to difficult emotions.\nby Kristy Arbon\nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e67",
        "path": "This Emotion is not Me or Mine.html"
    },
    {
        "Day": 1,
        "Course": "Relaxation",
        "Title": "Being Rocked by the Breath",
        "Description": "Noticing the gentle rhythm of your breathing, the way your body is sweetly rocked by the breath like a child being rocked in their parent's arms, allowing your body to be caressed by the breath.\nby Kristy Arbon\nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e64",
        "path": "Being Rocked by the Breath.html"
    },
    {
        "Day": 2,
        "Course": "Relaxation",
        "Title": "Belly Breathing",
        "Description": "This session is focused on physically expanding your breathing. Breathing this way into the low abdomen will help calm emotions and the mind.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e96",
        "path": "Belly Breathing.html"
    },
    {
        "Day": 3,
        "Course": "Relaxation",
        "Title": "Body Scan",
        "Description": "This body scan trains awareness and opens capacity for feeling more subtly. It trains the ability to hone in and feel more concentrated and then widen to allow your awareness to include a broader span. It can have the side effect of relieving pain and anxiety. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "b2",
        "path": "Body Scan.html"
    },
    {
        "Day": 4,
        "Course": "Relaxation",
        "Title": "Letting Go of the Work Day",
        "Description": "When we transition from our work day to home, we can sometimes take home the work frustrations and stress from our day, and let it impact our home life. This meditation helps you to enter the \"third space\", a transitionary space that allows us to let go of work and our busy day, and enter into a new and replenished headspace. \nby Happiness Insight\nAbout AURA",
        "Author": "Happiness Insight",
        "ID": "-Kqta0rtBcIYBpN3D5_P",
        "path": "Letting Go of the Work Day.html"
    },
    {
        "Day": 5,
        "Course": "Relaxation",
        "Title": "Letting Go Waterfall ",
        "Description": "This session uses a breathing practice to create the effect of a longer exhale. This has a soothing effect on the nervous system, calming the body and mind. It's a specific yoga technique to connect you with yourself in a safe way. It's especially helpful for those times we want to go to sleep, let go more, be clearer, or speak when needed.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e125",
        "path": "Letting Go Waterfall.html"
    },
    {
        "Day": 6,
        "Course": "Relaxation",
        "Title": "One Breath At A Time",
        "Description": "Distracted? Restless? This practice helps us become present by taking things one breath at a time.\nby Lyndi Smith\nAbout AURA",
        "Author": "Lyndi Smith",
        "ID": "l9",
        "path": "One Breath At A Time.html"
    },
    {
        "Day": 7,
        "Course": "Relaxation",
        "Title": "Release",
        "Description": "This session uses a yogic breathing technique that is cooling to the body and has a deep effect of calming the nervous system, difficult emotions, and even soothes inflamation and pain in the body. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e94",
        "path": "Release.html"
    },
    {
        "Day": 8,
        "Course": "Relaxation",
        "Title": "Relaxation",
        "Description": "Relaxation is an art and a science. By relaxation, we mean a release of tension in both the mind and the body for a period of time to allow complete rest and revitalisation. Like sleep, only these days we tend to go to bed with so much tension that we wake up feeling exhausted. It's a life changing thing to get to relax.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e9",
        "path": "Relaxation.html"
    },
    {
        "Day": 9,
        "Course": "Relaxation",
        "Title": "Releasing Tension from the Body",
        "Description": "This practice involves letting tension go from each part of the body sequentially.\nby Suzie Brown\nAbout AURA",
        "Author": "Suzie Brown",
        "ID": "-KqmVgS6yx2vqT6FXbI0",
        "path": "Releasing Tension from the Body.html"
    },
    {
        "Day": 10,
        "Course": "Relaxation",
        "Title": "Soothing Breath",
        "Description": "Feeling tense? This practice helps us let go of tension and relax our mind and body.\nby Lyndi Smith\nAbout AURA",
        "Author": "Lyndi Smith",
        "ID": "-KpprCahe4rGNmbmQncQ",
        "path": "Soothing Breath.html"
    },
    {
        "Day": 1,
        "Course": "Stress",
        "Title": "Be a Tree",
        "Description": "Imagine placing your back up against a large tree, feeling supported and steady. We use all the senses to imagine this tree and the warmth of the sun nourishing down into the trunk, to the roots. Relax into the tree and feel the sunlight nourishing you from the top of your head down into your feet. This is a meditation for becoming sturdy and grounded for when you're feeling under the weather or need some inspiration.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e93",
        "path": "Be a Tree.html"
    },
    {
        "Day": 2,
        "Course": "Stress",
        "Title": "Calmness in Mind and Body",
        "Description": "Calm your mind and body during stressful times. \nby Dorothy Ratusny\nAbout AURA",
        "Author": "Dorothy Ratusny",
        "ID": "d9",
        "path": "Calmness in Mind and Body.html"
    },
    {
        "Day": 3,
        "Course": "Stress",
        "Title": "Equanimity in You",
        "Description": "The only thing constant in life is change. So even when you are going through something difficult, you can take comfort in the fact that your life is always changing, and even difficult emotions eventually transform. We are all in a constant state of flux. When you can approach life from this perspective, you start living on an even keel, and even the most challenging of emotions don't seem so overwhelming.\nby Christina McMahon\nAbout AURA",
        "Author": "Christina McMahon (Aura)",
        "ID": "e53",
        "path": "Equanimity in You.html"
    },
    {
        "Day": 4,
        "Course": "Stress",
        "Title": "I Need to Take a Breather",
        "Description": "There are certain times in the day when we just need to take a breath and reconnect with ourselves. This meditaiton helps you to step out of the busyness of your day and gain back some clarity. \nby Happiness Insight\nAbout AURA",
        "Author": "Happiness Insight",
        "ID": "hi2",
        "path": "I Need to Take a Breather.html"
    },
    {
        "Day": 5,
        "Course": "Stress",
        "Title": "Shifting from \"Doing\" to \"Being\"",
        "Description": "Are you firmly in \"doing\" mode today? Find some stress relief by giving yourself three minutes to sink into \"being.\" After you rejuvenate yourself, the action that you take today will be much more effective.\nby C + D (Christina + Darrin)\nAbout AURA",
        "Author": "C + D (Christina + Darrin)",
        "ID": "-KrNEFJ4vZygme71d56Z",
        "path": "Shifting from _Doing_ to _Being_.html"
    },
    {
        "Day": 6,
        "Course": "Stress",
        "Title": "Slowing Down in a Busy Day",
        "Description": "Our lives are busy. We tend to spend a lot of our day rushing from one thing to the next. This meditation allows you to slow down, find peace and serenity, and is particularly helpful if you have been feeling stressed or overwhelmed. \nby Happiness Insight\nAbout AURA",
        "Author": "Happiness Insight",
        "ID": "-KsAEVTtVKqEx-8dqj8Q",
        "path": "Slowing Down in a Busy Day.html"
    },
    {
        "Day": 7,
        "Course": "Stress",
        "Title": "Taking Off the Shield",
        "Description": "Imagine being in a place where you just let the stressful things drip off you. Imagine letting some of the rigidity lift up off you so your breathing flows in and out with no hindrance. In this session we take off the shield and focus on ease of breathing. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler",
        "ID": "-KrECP1Nz_TtlY7D2N5L",
        "path": "Taking Off the Shield.html"
    },
    {
        "Day": 8,
        "Course": "Stress",
        "Title": "Thoughts on a Leaf",
        "Description": "Quiet your mind with this practice as you visualize a lovely stream alongside you.  It may be helpful when your mind feels busy or emotions feel strong\nby Dea Rivera\nAbout AURA",
        "Author": "Dea Rivera",
        "ID": "-KsHBNpfqyvomcc98SH7",
        "path": "Thoughts on a Leaf.html"
    },
    {
        "Day": 9,
        "Course": "Stress",
        "Title": "Time Alone in Nature ",
        "Description": "This is a visualisation session. We bring to mind a special place in nature and access the feelings this place provides. This is about cultivating an \"inner resource\" by recalling the feeling of time alone in nature. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler",
        "ID": "-KrEE4frzzd3ZZcHV-4P",
        "path": "Time Alone in Nature .html"
    },
    {
        "Day": 10,
        "Course": "Stress",
        "Title": "Systematic Body Relaxation",
        "Description": "A stressed mind automatically implies a stressed body. In this session we work to relax the mind and body,  to help relieve stress and give you that much needed break. Recieve expert guidance in cycling your attention through your body systematically, a technique for feeling and releasing the tension that you don't need to be carrying. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e13",
        "path": "Systematic Body Relaxation.html"
    },
    {
        "Day": 1,
        "Course": "Anxiety",
        "Title": "10 Mindful Breaths",
        "Description": "Challenge yourself with this practice of breathing and counting, focusing solely on the breath. It's a simple practice, but not easy. \nby Dea Rivera\nAbout AURA",
        "Author": "Dea Rivera",
        "ID": "-Kr8WOMm_AOnOrxj2YFl",
        "path": "10 Mindful Breaths.html"
    },
    {
        "Day": 2,
        "Course": "Anxiety",
        "Title": "Slowing Down",
        "Description": "When you're feeling stressed or anxious, everything seems to be moving quickly: thoughts race through your mind, and your heart may feel like it is going to explode in your chest. In this meditation, you'll intentionally slow down the breath, and then check in with your thoughts and your heart rate to see if they have also slowed.\n                     by C + D (Christina + Darrin)\n                  About AURA",
        "Author": "C + D (Christina + Darrin)",
        "ID": "-KqoTTpIs4i6PHKsTaIF",
        "path": "Slowing Down.html"
    },
    {
        "Day": 3,
        "Course": "Anxiety",
        "Title": "Befriending Difficulty",
        "Description": "Overwhelmed with emotions? This practice helps us accept and let go of our struggling.\nby Lyndi Smith\nAbout AURA",
        "Author": "Lyndi Smith",
        "ID": "l11",
        "path": "Befriending Difficulty.html"
    },
    {
        "Day": 4,
        "Course": "Anxiety",
        "Title": "Calm",
        "Description": "Calm the mind with this simple yet powerful breath meditation. \nby Ryan James Kenny\nAbout AURA",
        "Author": "Ryan James Kenny",
        "ID": "r2",
        "path": "Calm.html"
    },
    {
        "Day": 5,
        "Course": "Anxiety",
        "Title": "Where to Park Your Mind",
        "Description": "This session is about thought management and mature perspective and will give you the gift of looking at your situation in a new way, so that you can park your mind there and move forward with hope and strength. \nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e44",
        "path": "Where to Park Your Mind.html"
    },
    {
        "Day": 6,
        "Course": "Anxiety",
        "Title": "Gentleness",
        "Description": "We use a gently expanded breathing technique to bring relaxation into parts of the body, mind and more. This yogic technique of breathing into the back body (the lungs in the back) brings a sense of tenderness and ease, while leaving your feeling energised and poised for moving softly through your day with more flexibility.\nby Lauren Ziegler\nAbout AURA",
        "Author": "Lauren Ziegler (Aura)",
        "ID": "e112",
        "path": "Gentleness.html"
    },
    {
        "Day": 7,
        "Course": "Anxiety",
        "Title": "Letting Go of Anxiety ",
        "Description": "In our daily lives, if we stop and tune in, we can often sense a background hum of anxiety or stress. This meditation has been designed to help you let go of this constant feeling of stress and anxiety, and to inside find equanimity and peace. \nby Happiness Insight\nAbout AURA",
        "Author": "Happiness Insight",
        "ID": "-KsM12wH81JsVHs7jblW",
        "path": "Letting Go of Anxiety.html"
    },
    {
        "Day": 8,
        "Course": "Anxiety",
        "Title": "S T O P Meditation",
        "Description": "The STOP meditation is a simple way to reconnect to yourself physically, mentally, and emotionally. You can do this practice throughout your day whenever you feel disconnected from yourself.\nby Bill Scheinman\nAbout AURA",
        "Author": "Bill Scheinman",
        "ID": "-KqjDZXtyL2_G3QE53E4",
        "path": "S T O P Meditation.html"
    },
    {
        "Day": 9,
        "Course": "Anxiety",
        "Title": "Relief from Anxiety",
        "Description": "Experience a simple and effective way to regulate your breath that instantly slows your breathing rate, blood pressure and heart rate - allowing you relief from anxiety.\nby Dorothy Ratusny\nAbout AURA",
        "Author": "Dorothy Ratusny",
        "ID": "-KrxqdWyodGUPsx506wa",
        "path": "Relief from Anxiety.html"
    },
    {
        "Day": 10,
        "Course": "Anxiety",
        "Title": "You Are A Deeply Caring Person",
        "Description": "We need to take care of ourselves so that we can take care of the people and tasks in our life. Take a few moments to connect with yourself and to remind yourself that you are worthy of your own care and concern, and the reason you feel stressed is because you are a deeply caring person.\nby Kristy Arbon \nAbout AURA",
        "Author": "Kristy Arbon (Aura)",
        "ID": "e62",
        "path": "You Are A Deeply Caring Person.html"
    }
];
//# sourceMappingURL=aura.config.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_aura_config_aura_config__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_script_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_progress_modal_progress_modal__ = __webpack_require__(229);
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
    function AuraContentPage(navCtrl, navParams, render, viewCtrl, scr, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.viewCtrl = viewCtrl;
        this.scr = scr;
        this.sanitizer = sanitizer;
        this.auraLoc = __WEBPACK_IMPORTED_MODULE_3__assets_aura_config_aura_config__["a" /* aura */];
        this.module = {
            title: "Morning Meditations",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut blandit mi. Proin condimentum dolor vitae porttitor imperdiet. Cras erat ipsum, cursus feugiat ligula ac, posuere placerat elit. Nunc volutpat sollicitudin imperdiet. Maecenas lobortis quis sapien vel porta. Aenean cursus felis et tortor volutpat consectetur. Duis in condimentum ante, id viverra justo.ips",
            link: this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/10%20Mindful%20Breaths.html")
        };
        var data = this.navParams.get('data');
        /* If there are no data in navparams *
         * redirect to main page			 */
        if (typeof data == "undefined") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */]);
        }
        else {
            /* set the content details */
            this.module.title = data.title;
            this.module.description = data.desc;
            this.module.link = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/" + encodeURIComponent(data.path));
        }
    }
    AuraContentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AuraContentPage');
    };
    AuraContentPage.prototype.ngAfterViewInit = function () {
        var self = this;
        self.pmc.toggleView(false);
        /* check if iframe has loaded */
        document.getElementById("aura-widget-div").onload = function (e) {
            var fp = e.srcElement;
            var hed = fp.contentWindow.document.getElementsByTagName('head')[0];
            var frm = fp.contentWindow.document.getElementsByTagName('body')[0];
            frm.style.maxHeight = "100%"; // assign max height
            frm.style.margin = "0px"; // and margin css details
            var auraWidget = fp.contentWindow.document.getElementById('aura-widget-div');
            auraWidget.style.maxHeight = "100%";
            auraWidget.style.height = "100%";
            /* TO DO: Add listener to aura player to track	*
             * play, pause, and audio completion			*/
            fp.contentWindow.addEventListener('DOMContentLoaded', function (e) {
                // add event listener here
            });
            /* Append scripts from adobe to the iframe. Uncomment once okay *
            let scr1 = document.createElement("script");
            let scr2 = document.createElement("script");
            scr1.setAttribute("src","//assets.adobedtm.com/bf12630c02a44df137a783f39cdb4dbd09e2b5d7/satelliteLib-a77040281e8ad94d1a2e4c30d4df757c9e6fed98.js");
            scr1.setAttribute("type","text/javascript");
            scr2.setAttribute("type","text/javascript");
    
            scr2.innerText = "_satellite.pageBottom();";
    
            hed.appendChild(scr1);
            frm.appendChild(scr2);
            */
        };
    };
    /* If page leave is triggered before audio finishes playing, *
     * make sure to pause/stop all aura audio					 */
    AuraContentPage.prototype.ionViewDidLeave = function () {
        //audio.ontimeupdate = null;
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
        selector: 'page-aura-content',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/aura-content/aura-content.html"*/'<aura-head></aura-head>\n\n<ion-content >\n<progress-modal></progress-modal>\n    <!--div id="aura-widget-div" #aura></div-->\n    <iframe id="aura-widget-div" [src]="module?.link"></iframe>\n    \n    <section class="description">\n    	<p class="title">\n    		Description\n    	</p>\n    	<p class="body">\n    		{{module?.description}}\n    	</p>\n    </section>\n\n    <footer></footer>\n</ion-content>\n\n<aura-foot></aura-foot>'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/aura-content/aura-content.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__providers_app_script_service__["a" /* ScriptService */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
], AuraContentPage);

//# sourceMappingURL=aura-content.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__ = __webpack_require__(49);
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
    function ProgressModalComponent(nav, render, elem) {
        this.nav = nav;
        this.render = render;
        this.elem = elem;
        this.day = 1;
        this.length = 10;
        this.show = false;
    }
    ProgressModalComponent.prototype.ngOnInit = function () {
        console.log(this);
    };
    ProgressModalComponent.prototype.toHome = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__["a" /* AuraMainPage */]);
    };
    /* toggle visibility of this component */
    ProgressModalComponent.prototype.toggleView = function (stat) {
        if (stat === void 0) { stat = !this.show; }
        this.show = stat;
        if (!this.show) {
            this.render.setStyle(this.elem.nativeElement, "display", "none");
        }
        else {
            this.render.setStyle(this.elem.nativeElement, "display", "none");
        }
    };
    return ProgressModalComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('day'),
    __metadata("design:type", Number)
], ProgressModalComponent.prototype, "day", void 0);
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
        selector: 'progress-modal',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/progress-modal/progress-modal.html"*/'<!-- Generated template for the ProgressModalComponent component -->\n<div class="container">\n  <h3 class="congrats">\n  Congratulations\n  </h3>\n  <h4 class="completion">\n  	DAY {{day}} COMPLETE\n  </h4>\n  <p>\n  	You\'ve completed<br/>\n  	<a class="rng">{{day}}</a> out of <a class="rng">{{length}}</a> sessions.\n  </p>\n  <button ion-button class="done" (tap)="toHome()">\n  	Done\n  </button>\n</div>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/progress-modal/progress-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], ProgressModalComponent);

//# sourceMappingURL=progress-modal.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sign_up_sign_up__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(36);
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
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
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
        this.auth0.searchUser(this.formGroup.value.email)
            .then(function (res) {
            if (res) {
                self.invalidEmail = false;
                self.auth0.changePassword(self.formGroup.value.email)
                    .then(function (res) {
                    self.emailSent = true;
                })
                    .catch(function (err) {
                    console.log(err);
                });
            }
            else {
                self.invalidEmail = true;
            }
        })
            .catch(function (err) {
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
        selector: 'page-forgot-password',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/forgot-password/forgot-password.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Forgot Your Password</p>\n	<p class="form-desc">Verify your email and we will send you instructions on how to reset your password.</p>\n	<form [formGroup]="formGroup" id="forgotpw-form" #forgotPw>\n		<ion-row>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [ngClass]="{\'error\':invalidEmail,\'mailed\':emailSent}"></ion-input>\n		</ion-row>\n		<button ion-button id="reset" class="go-back" (tap)="reset_pass()" [disabled]="!formGroup.valid || emailSent">Reset Password</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="signup_btn" class="fbLogin" (tap)="toSignup()">Sign up</button>\n	</form>\n	\n</section>\n\n<footer></footer>\n\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/forgot-password/forgot-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */]])
], ForgotPasswordPage);

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgeGatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sign_up_sign_up__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(28);
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
    function AgeGatePage(navCtrl, navParams, render, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.alertCtrl = alertCtrl;
        this.invalidAge = false;
        this.cookiesOn = false;
        this.selectedDate = {
            'day': '',
            'month': '',
            'year': ''
        };
        this.inputDate = '';
    }
    AgeGatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AgeGatePage');
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
            console.log((currentDate - this.selectedDate.year) > 18);
            if ((currentDate - this.selectedDate.year) > 18) {
                this.invalidAge = false;
                /* We're all good. Proceed to sign up */
                if (this.cookiesOn) {
                    __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('age_gate', "true");
                    __WEBPACK_IMPORTED_MODULE_2_ng2_cookies__["Cookie"].set('birthdate', JSON.stringify(this.selectedDate));
                }
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__sign_up_sign_up__["a" /* SignUpPage */], { age_gate: true });
            }
            else {
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
        selector: 'page-age-gate',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/age-gate/age-gate.html"*/'<ion-header>\n        <ion-navbar>\n            <ion-buttons end>\n              <button ion-button class="xbtn" (tap)="dismissThis()"></button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n\n<ion-content class="has-header">\n\n<section padding class="main" >\n\n  <ion-img src="../assets/images/logo_neutrogena.png"></ion-img>\n<div *ngIf="!invalidAge">\n	<p class="content">Please enter your date of birth:</p>\n\n\n		<ion-row>\n\n<input type="text" maxlength="2" placeholder="MM" [(ngModel)]="selectedDate.month" [readonly]=\'true\'/>\n<input type="text" maxlength="2" placeholder="DD" [(ngModel)]="selectedDate.day" [readonly]=\'true\'/>\n<input type="text" maxlength="4" placeholder="YYYY" [(ngModel)]="selectedDate.year" [readonly]=\'true\'/>\n\n<ion-datetime displayFormat="MMM DD, YYYY" [(ngModel)]="inputDate" (ionChange)="changedDate()"></ion-datetime>\n			</ion-row>\n<p class="content small width-70">By submitting your data, you are accepting our Privacy Policy and Cookie Policy.</p>\n	<ion-row>\n    <ion-item >\n    <ion-label>\nPlease remember me on this site.</ion-label>\n    <ion-checkbox [(ngModel)]="cookiesOn"></ion-checkbox>\n  </ion-item>\n  </ion-row>\n  <button ion-button (click)="submitAge()">Enter</button>\n</div>\n<div class=\'invalid-age-container\' *ngIf="invalidAge">\n  <h3>Unfortunately,</h3>\n  <p class="content">only users </p>\n<p class="content color-orange">18 YEARS OR OLDER </p>\n<p class="content">can enter this site.</p>\n</div>\n</section>\n\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/age-gate/age-gate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], AgeGatePage);

//# sourceMappingURL=age-gate.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_account_my_account__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__ = __webpack_require__(15);
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
    DeleteAccountPage.prototype.delete = function () {
        //auth0 here
        var self = this;
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        this.auth0.deleteUser().then(function (res) {
            self.auth0.logout();
            self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        })
            .catch(function (err) {
            console.log("An error has occurred", err);
            load.dismiss();
        });
    };
    return DeleteAccountPage;
}());
DeleteAccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-delete-account',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/delete-account/delete-account.html"*/'<ion-content>\n\n<section class="main">\n	<p class="form-title">Are you sure you want to delete your account?</p>\n	<p class="form-desc">This will erase your information and progress.</p>\n\n	<button ion-button id="cancel" class="go-back" (tap)="cancel()">No, go back</button>\n	<a (tap)="delete()" id="delete" class="go-ahead">Yes, delete my account please.</a>\n	\n</section>\n\n<footer></footer>\n\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/delete-account/delete-account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], DeleteAccountPage);

//# sourceMappingURL=delete-account.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(252);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_auth_auth__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_my_account_my_account__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_delete_account_delete_account__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_forgot_password_forgot_password__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_reset_password_reset_password__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_age_gate_age_gate__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_aura_content_aura_content__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_aura_main_aura_main__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_evt_evt__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_app_app__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_app_script_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_components_module__ = __webpack_require__(344);
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
    __WEBPACK_IMPORTED_MODULE_17__pages_aura_main_aura_main__["a" /* AuraMainPage */]
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
            __WEBPACK_IMPORTED_MODULE_22__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: [
                    { component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */], name: 'Home', segment: 'home' },
                    { component: __WEBPACK_IMPORTED_MODULE_8__pages_sign_up_sign_up__["a" /* SignUpPage */], name: 'SignUpPage', segment: 'sign-up' },
                    { component: __WEBPACK_IMPORTED_MODULE_9__pages_auth_auth__["a" /* AuthPage */], name: 'Auth0Page', segment: ':data' },
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
            __WEBPACK_IMPORTED_MODULE_18__providers_evt_evt__["a" /* EvtProvider */],
            __WEBPACK_IMPORTED_MODULE_19__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_20__providers_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_21__providers_app_script_service__["a" /* ScriptService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cookies__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__ = __webpack_require__(49);
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
    function HomePage(platform, navCtrl, evt, auth0, loader) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.evt = evt;
        this.auth0 = auth0;
        this.loader = loader;
        this.links = [];
        this.scanFailed = false;
        this.auth0.setEVTInfo();
    }
    HomePage.prototype.ngOnInit = function () {
        // if noticeViewed is true, the cookie policy notification will no longer be displayed
        if (__WEBPACK_IMPORTED_MODULE_4_ng2_cookies__["Cookie"].get('cookie_notice') && __WEBPACK_IMPORTED_MODULE_4_ng2_cookies__["Cookie"].get('cookie_notice') == '1') {
            this.noticeViewed = true;
        }
        else {
            __WEBPACK_IMPORTED_MODULE_4_ng2_cookies__["Cookie"].set('cookie_notice', '1');
            this.noticeViewed = false;
        }
        this.mobileVersion = this.platform.is('mobile');
    };
    HomePage.prototype.scan = function () {
        var self = this;
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        this.evt.scan().then(function (res) {
            load.data.enableBackdropDismiss = false;
            if (res.length === 0) {
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
            else if (typeof res[0].results[0].thng !== "undefined") {
                /* Scanned QR code. It is a thng */
                var item_1 = res[0].results[0].thng;
                self.evt.getUserContext().then(function (usr) {
                    usr.thng(item_1.id).read().then(function (thng) {
                        self.scanFailed = false;
                        thng.action("scans").create().catch(function (err) { return console.error(err); });
                        thng.action("_Activated").create().then(console.log).catch(console.error);
                        usr.update({ customFields: { myThng: thng.id } }).then(console.log);
                        //TODO: Redirect to content page. Still in progress
                        self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */]);
                    })
                        .catch(function (err) {
                        self.scanFailed = true;
                        console.log(err, 'thng error');
                    });
                })
                    .catch(function (err) {
                    console.log(err);
                });
            }
            else if (typeof res[0].results[0].product !== "undefined") {
                /* Scanned via image recognition. it is a product */
                var item_2 = res[0].results[0].product;
                self.evt.getUserContext().then(function (usr) {
                    usr.product(item_2.id).read().then(function (prod) {
                        self.scanFailed = false;
                        prod.action("scans").create().catch(function (err) { return console.error(err); });
                        self.evt.getUserCustomFields().then(function (cf) {
                            if (cf) {
                                /* Already has a thng */
                                console.log('You already have a thng!');
                                /* REDIRECT TO MAIN PAGE */
                                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */]);
                                var thngId = cf.myThng;
                            }
                            else {
                                /* Create a thng */
                                var thng = {
                                    name: "User Thng - " + usr.id,
                                    tags: ["Image Recognition"],
                                    product: item_2.id
                                };
                                usr.thng().create(thng).then(function (th) {
                                    /* Assign the newly created thng to the user */
                                    usr.update({ customFields: { myThng: th.id } }).then(console.log);
                                    /* Create activated action */
                                    th.action("_Activated").create().then(console.log).catch(console.error);
                                    /* REDIRECT TO MAIN PAGE */
                                    self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__aura_main_aura_main__["a" /* AuraMainPage */]);
                                })
                                    .catch(function (err) {
                                    console.log("Failed to create a thng");
                                });
                            }
                        }).catch(function (err) {
                            console.error("Failed to save");
                        });
                    })
                        .catch(function (err) {
                        self.scanFailed = true;
                        console.log(err, 'prod error');
                    });
                })
                    .catch(function (err) {
                    console.log(err);
                });
            } // END OF SCAN PROCESS
        }).catch(function (err) {
            self.scanFailed = true;
            console.log('scan failed', err);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/home/home.html"*/'\n<!--ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header-->\n\n<!-- No headers. We\'ll create\n  a component for this instead -->\n\n<notice [title]="\'Cookie Notice\'" [class]="\'black\'" *ngIf="!noticeViewed">\n\n  This site uses cookies as described in our <a>Cookie Policy</a>. Please continue to use our website if you agree to our use of cookies.\n</notice>\n<ion-content id="homeMobile" *ngIf="mobileVersion">\n  <!--button ion-button secondary menuToggle>Toggle Menu</button-->\n  <section id="client-logo" [ngClass] = "{ \'hidden\':scanFailed,\'client-logo\':true }">\n    <!--<span id="neutrogena-logo" class="placeholder" #neuLogo>\n    </span>-->\n    <ion-img src="../assets/images/logo_neutrogena.png" id="neutrogena-logo" #neuLogo></ion-img>\n    <p>in partnership with </p>\n    <!--<span id="aura-logo" class="placeholder" #auraLogo>\n    </span>-->\n    <ion-img src="../assets/images/logo_aura.png" id="aura-logo" #auraLogo></ion-img>\n  </section>\n  <section class="scan_failed" *ngIf="scanFailed">\n    <h2>It looks like that didn\'t work</h2>\n    <h3>Please try again to enter site</h3>\n  </section>\n\n  <section id="guide-scan-container" class="">\n\n    <span class="guide-images">\n\n      <div id="qr-image" class="placeholder">\n        <img src="../assets/images/qrcode.png"/>\n      </div>\n\n      <div id="logo-image" class="placeholder">\n        <img src="../assets/images/activator.png"/>\n      </div>\n\n    </span>\n\n    <span class="guide-text-instructions">\n      <p>Scan the QR code</p>\n      <p><b>OR</b></p>\n      <p>Scan the Neutrogena&reg; logo on your</p>\n      <p>Neutrogena&reg; Visibly Clear&reg; Light Therapy</p>\n      <p>Acne Mask Activator</p>\n    </span>\n\n  </section>\n\n  <section id="scan-button-container" #scanContainer>\n\n    <button ion-button id="scan-button" #scanButton (tap)="scan()">\n\n    </button>\n\n  </section>\n\n\n  <footer></footer>\n\n</ion-content>\n\n\n\n<ion-content id="homeDesktop" padding *ngIf="!mobileVersion">\n\n  <section id="client-logo" class="client-logo">\n\n    <ion-img src="../assets/images/logo_neutrogena.png" id="neutrogena-logo" #neuLogo></ion-img>\n    <span></span>\n    <ion-img src="../assets/images/logo_aura_blue@3x.png" id="aura-logo" #auraLogo></ion-img>\n  </section>\n\n  <section  id="client-content" class="client-content">\n      <h3 padding>This site is best viewed on mobile.</h3>\n\n      <ion-img src="../assets/images/activator_desktop.jpg"> </ion-img>\n      <p padding>To access on desktop, upload a photo of the Neutrogena&copy; logo on your\nVisibly Clear&copy; Light Therapy Acne Mask Activator</p>\n\n\n  </section>\n\n\n\n\n  <footer></footer>\n\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__["a" /* EvtProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(28);
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
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.text = "Don't forget to track your progress with a photo.";
        this.show = false;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }
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
            //self.evt.init();
            console.log("EVT");
        });
        // if(this.platform.is('mobile')){
        //   this.rootPage = HomePage;
        // }
        // else{
        //   this.rootPage = '';
        // }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/app/app.html"*/'<ion-menu [content]="content" side="right">\n  <button ion-button id="btnClose" menuClose><ion-icon name="close"></ion-icon></button>  \n  <side-menu></side-menu>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<notice [class]="\'pink\'" *ngIf="show">\n\n  {{text}}\n</notice>'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__ = __webpack_require__(15);
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
    function AuthPage(navCtrl, navParams, auth0) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth0 = auth0;
    }
    AuthPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var data = this.navParams.get('data');
        if (data == "") {
            if (localStorage.getItem('access_token') && localStorage.getItem('id_token')) {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }
            else {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
            }
        }
        else {
            var authData = this.URLToArray(data);
            //console.log(authData);
            this.auth0.result(authData).then(function (res) {
                console.log(res);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
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
    return AuthPage;
}());
AuthPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-auth',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/auth/auth.html"*/'<!--\n  Generated template for the AuthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/auth/auth.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth_service__["a" /* AuthService */]])
], AuthPage);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(28);
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
    function ResetPasswordPage(navCtrl, navParams, render, auth0, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
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
        selector: 'page-reset-password',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/reset-password/reset-password.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Reset your Password</p>\n	<p class="form-desc">Enter a new password</p>\n	<p [ngClass]="{\'reset\':successfulReset, \'instructions\':true}">Password must be 8+ characters and include 1 or more uppercase letter or number.</p>\n	<form [formGroup]="formGroup" id="login-form" #loginForm>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password (8+ characters)" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)" [ngClass]="{\'error\':(checkDirty() && !checkMatch())}"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="confirm" placeholder="Confirm Password (8+ characters)" (ionFocus)="focused($event)" [(ngModel)]="confirm" (ionBlur)="blurred($event)" [ngClass]="{\'error\':(checkDirty() && !checkMatch())}"></ion-input>\n		</ion-row>\n		<button ion-button id="resetPass" class="getStarted" (tap)="resetPw()" [disabled]="!formGroup.valid || !checkDirty() || !checkMatch() || successfulReset">Reset Password</button>\n	</form>\n	<p class="reset-successful" *ngIf="successfulReset">\n		<b>Password reset.</b>\n		Log in <a (tap)="toLoginPage()">here</a>.\n	</p>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/reset-password/reset-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], ResetPasswordPage);

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scan_scan__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__side_menu_side_menu_module__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notice_notice_module__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__footer_footer_module__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sub_course_sub_course_module__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__aura_head_aura_head_module__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__aura_foot_aura_foot_module__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__progress_modal_progress_modal_module__ = __webpack_require__(358);
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
            __WEBPACK_IMPORTED_MODULE_8__progress_modal_progress_modal_module__["a" /* ProgressModalComponentModule */],]
    })
], ComponentsModule);

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 345:
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
        selector: 'scan',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/scan/scan.html"*/'<!-- Generated template for the ScanComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/scan/scan.html"*/
    }),
    __metadata("design:paramtypes", [])
], ScanComponent);

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__side_menu__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(6);
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

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_environment_dev__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_my_account_my_account__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(19);
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
    function SideMenuComponent(auth0, app, dom) {
        this.auth0 = auth0;
        this.app = app;
        this.dom = dom;
        this.links = [];
        this.ext = __WEBPACK_IMPORTED_MODULE_3__config_environment_dev__["a" /* Config */].ext_links;
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
        selector: 'side-menu',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/side-menu/side-menu.html"*/'<!-- Generated template for the SideMenuComponent component -->\n<ion-content>\n  <ion-list>\n  	<!-- unused <button menuClose class="main" ion-item >My Account</button> -->\n  	<button menuClose class="main" ion-item *ngIf="!loggedIn()" (tap)="login()">Log In</button>\n  	<button menuClose class="main dbl" ion-item *ngIf="loggedIn()" (tap)="myAccount()">My Account</button>\n  	<button menuClose class="main" ion-item *ngIf="loggedIn()" (tap)="logout()">Log Out</button>\n    <a target="_blank" *ngFor="let p of links" [href]="p?.link">\n    	<button menuClose ion-item>\n    		{{p?.title}}\n    	</button>\n    </a>\n  </ion-list>\n\n  <section class="footer">\n  	<ion-row class="container">\n  		<ion-col class="neutrogena">\n  			<img src="../assets/images/logo_neutrogena.png"/>\n  		</ion-col>\n  		<ion-col class="aura">\n  			<img src="../assets/images/logo_aura_blue.png"/>\n  		</ion-col>\n  	</ion-row>\n  </section>\n</ion-content>'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/side-menu/side-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */]])
], SideMenuComponent);

//# sourceMappingURL=side-menu.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticeComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notice__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(6);
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

/***/ 349:
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
    NoticeComponent.prototype.ngAfterViewInit = function () {
        if (this.class == "pink") {
            this.style = { 'color': '#fff', 'font-size': '15px', 'line-height': '20px', 'background-color': 'rgb(240,115,172)', 'text-align': 'center' };
        }
        else {
            this.style = { 'color': '#fff', 'font-size': '13px', 'line-height': '20px', 'background-color': 'rgb(69,69,69)' };
        }
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("class"),
    __metadata("design:type", Object)
], NoticeComponent.prototype, "class", void 0);
NoticeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'notice',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/notice/notice.html"*/'<!-- Generated template for the NoticeComponent component -->\n<section class="body" [ngStyle]="style">\n	<button ion-button id="btnClose" (click)="destroy()"><ion-icon name="close"></ion-icon></button>  \n	<span class="title" *ngIf="title">\n		{{title}}\n	</span>\n	<div class="body">\n		<ng-content>\n		  \n		</ng-content>\n	</div>\n</section>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/notice/notice.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], NoticeComponent);

//# sourceMappingURL=notice.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__footer__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(6);
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

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_environment_dev__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(19);
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
    function FooterComponent(dom) {
        this.dom = dom;
        this.links = [];
        console.log(this);
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.links = [
            {
                text: "Privacy Policy",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment_dev__["a" /* Config */].ext_links.privacyPolicy)
            },
            {
                text: "Cookie Policy",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment_dev__["a" /* Config */].ext_links.cookiePolicy)
            },
            {
                text: "Legal Notice",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment_dev__["a" /* Config */].ext_links.legalNotice)
            },
            {
                text: "Modern Slavery Act Statement",
                href: this.dom.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_1__config_environment_dev__["a" /* Config */].ext_links.slaveryAct)
            },
        ];
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'footer',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/footer/footer.html"*/'<section id="footer" #footer>\n    \n	<nav id="footer-links" class="footer-links">\n	  <a *ngFor="let a of links" target="_blank" [href]="a?.href">{{a?.text}}\n	  </a>\n	</nav>\n\n\n	<p class="disclaimer" id="disclaimer"> \n	  This site is best viewed with Internet Explorer 7.0 or higher. &copy; Johnson & Johnson Limited 2017. This site is published by Johnson & Johnson Ltd, which is solely responsible for its contents. It is intended for a UK audience. Site last updated on: 21 September 2017.\n	</p>\n</section>'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/footer/footer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
], FooterComponent);

//# sourceMappingURL=footer.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubCourseComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sub_course__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(6);
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

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubCourseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_sign_up_sign_up__ = __webpack_require__(40);
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
        this.progress = 0;
        this.bgn = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */];
    }
    SubCourseComponent.prototype.begin = function (tes) {
        tes['progress'] = this.progress;
        tes['title'] = this.title;
        /* this assigns the progress and title 	*
         * to the top element 					*/
        this.bgn.emit(tes);
    };
    SubCourseComponent.prototype.ngOnInit = function () {
        this.duration = Object.keys(this.crs).length;
        this.bgImg = "../assets/aura/images/hero/" + this.title + ".jpg";
        /* THIS SHOULDNT BE RANDOM 				*
         * Once the progress tracking system 	*
         * has been implemented, fetch user 	*
         * progress and then assign here 		*/
        if (this.auth0.loggedIn) {
            this.progress = Math.round(Math.random() * this.duration);
        }
        else {
            this.progress = 0;
        }
    };
    SubCourseComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        if (this.loggedIn()) {
            self.render.setStyle(self.prog.nativeElement, "width", self.getProg() + "%");
        }
    };
    SubCourseComponent.prototype.loggedIn = function () {
        return this.auth0.loggedIn();
    };
    SubCourseComponent.prototype.getProg = function () {
        return Math.round((this.progress * 100) / this.duration);
    };
    SubCourseComponent.prototype.toSignUp = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_sign_up_sign_up__["a" /* SignUpPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])('begin'),
    __metadata("design:type", Object)
], SubCourseComponent.prototype, "bgn", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('activeCourse'),
    __metadata("design:type", Object)
], SubCourseComponent.prototype, "crs", void 0);
SubCourseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'sub-course',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/sub-course/sub-course.html"*/'<!-- Generated template for the SubCourseComponent component -->\n<div class="container">\n	<span class="image-container" [ngStyle]="{\'background-image\':\'url(\'+bgImg+\')\'}">\n		<p class="title">{{title}}</p>\n		<p class="duration">(Duration) {{duration}} days</p>\n		<p class="sign-in" *ngIf="!loggedIn()" (tap)="toSignUp()">Sign in to track progress</p>\n		<span class="progress" *ngIf="loggedIn()" [ngClass]="{\'no-prog\':(getProg() == 0)}">\n			<div class="main-bar">\n				<div class="progress-bar" #prog></div>\n			</div>\n			<p class="completion">{{getProg()}}% Complete</p>\n		</span>\n	</span>\n	<button ion-button class="begin" (tap)="begin(crs)" [disabled]="!loggedIn() || !enabled">{{getProg()==0?"Begin":"Continue"}}</button>\n</div>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/sub-course/sub-course.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], SubCourseComponent);

//# sourceMappingURL=sub-course.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraHeadComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aura_head__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(6);
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

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraHeadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_sign_up_sign_up__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_my_account_my_account__ = __webpack_require__(66);
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
        //this.navCtrl.setRoot(LoginPage);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_sign_up_sign_up__["a" /* SignUpPage */]);
    };
    AuraHeadComponent.prototype.myAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_my_account_my_account__["a" /* MyAccountPage */]);
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
        selector: 'aura-head',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/aura-head/aura-head.html"*/'<!-- Generated template for the AuraHeadComponent component -->\n<div class="body">\n	\n	<ion-row>\n\n		<ion-col col-7>\n			<span><img src="../assets/images/neutrogena_white.png"/></span>\n			<span><img src="../assets/images/auraLogo_white.png"/></span>\n		</ion-col>\n\n		<ion-col col-5>\n			<a (tap)="toLogin()" *ngIf = "!logged">Sign In</a>\n			<a *ngIf = "logged" (tap)="myAccount()">Hi, {{name}}</a>\n			<span><img src="../assets/images/person.png"/></span>\n		</ion-col>\n\n	</ion-row>\n  \n</div>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/aura-head/aura-head.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], AuraHeadComponent);

//# sourceMappingURL=aura-head.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraFootComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aura_foot__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(6);
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
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["f" /* IonicModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__aura_foot__["a" /* AuraFootComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__aura_foot__["a" /* AuraFootComponent */]
        ]
    })
], AuraFootComponentModule);

//# sourceMappingURL=aura-foot.module.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraFootComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_evt_evt__ = __webpack_require__(61);
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
    function AuraFootComponent(nav, view, evt) {
        this.nav = nav;
        this.view = view;
        this.evt = evt;
        /* This is the reorder link */
        this.ext_url = "//www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator";
        console.log('Hello AuraFootComponent Component');
        this.text = 'Hello World';
    }
    AuraFootComponent.prototype.toHome = function () {
        console.log(this.nav);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_aura_main_aura_main__["a" /* AuraMainPage */]);
    };
    AuraFootComponent.prototype.logAction = function () {
        // TODO: this is a user action. Possible that we want to log 
        // the reorder action even if there are no users logged in
        this.evt.createUserAction("_Reorder");
    };
    return AuraFootComponent;
}());
AuraFootComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'aura-foot',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/components/aura-foot/aura-foot.html"*/'<div class="body">\n  <ion-row>\n  	<ion-col col-6>\n  		<div class="home" (tap)="toHome()">\n  			<img src="../assets/images/pink_house.png"/>\n  			<p>Home</p>\n  		</div>\n  	</ion-col>\n  	<ion-col col-6>\n  		<div class="reorder">\n  			<a (tap)="logAction()" [href]="ext_url" target="_blank">\n  				<img src="../assets/images/reorder.png"/>\n  			</a>\n  			<p>Re-Order</p>\n  		</div>\n  	</ion-col>\n  </ion-row>\n</div>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/components/aura-foot/aura-foot.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_evt_evt__["a" /* EvtProvider */]])
], AuraFootComponent);

//# sourceMappingURL=aura-foot.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressModalComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progress_modal__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(6);
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

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_evt_evt__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forgot_password_forgot_password__ = __webpack_require__(230);
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
    function LoginPage(navCtrl, navParams, render, auth0, formBuilder, loader, evt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.evt = evt;
        this.invalidLogin = false;
        this.formGroup = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required],
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
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
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        }
    };
    LoginPage.prototype.toSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__["a" /* SignUpPage */]);
    };
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
        this.auth0.login({ email: usr.email, pass: usr.password }).then(function (res) {
            //console.log(res)
            self.evt.createUserAction("_Login");
        })
            .catch(function (err) {
            console.log(err);
            _this.invalidLogin = true;
            load.dismiss();
        });
    };
    LoginPage.prototype.FBauth = function () {
        this.auth0.fbAuth();
    };
    LoginPage.prototype.passwordReset = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/login/login.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Log In</p>\n	<p class="form-desc">Let\'s get started with your free mindulness sessions. Sign up <a class="linker" (tap)="toSignup()">here</a></p>\n	<form [formGroup]="formGroup" id="login-form" #loginForm>\n		<ion-row>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [ngClass]="{\'error\':invalidLogin}"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row class="extra-top">\n			<a class="linker" (tap)="passwordReset()">Forgot your password?</a>\n		</ion-row>\n		<button ion-button id="login" class="getStarted" (tap)="login()" [disabled]="!formGroup.valid">Log In</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="loginFB" class="fbLogin" (tap)="FBauth()">Log in with Facebook</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_evt_evt__["a" /* EvtProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__age_gate_age_gate__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_cookies__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_cookies__);
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
    function SignUpPage(navCtrl, navParams, render, auth0, formBuilder, loader) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.invalidReg = false;
        this.emailTaken = false;
        this.formGroup = this.formBuilder.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].pattern(/.*([A-Z+]|[0-9+]).*$/)])]
        });
        console.log(navParams.data);
    }
    SignUpPage.prototype.ionViewDidLoad = function () {
    };
    SignUpPage.prototype.ionViewWillEnter = function () {
        if (__WEBPACK_IMPORTED_MODULE_7_ng2_cookies__["Cookie"].get('age_gate') === "true" || this.navParams.get('age_gate') == true) {
            console.log('Passed age gate!');
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__age_gate_age_gate__["a" /* AgeGatePage */]);
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
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        }
    };
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
                self.emailTaken = true;
            }
            else {
                self.auth0.signup({ email: usr.email, pass: usr.password }, usr.firstName, usr.lastName).then(function (res) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                    console.log(res);
                })
                    .catch(function (err) {
                    console.log(err);
                    self.invalidReg = true;
                    load.dismiss();
                });
            }
        }).catch(function (err) {
            console.log("Something went wrong.");
        });
    };
    SignUpPage.prototype.FBauth = function () {
        this.auth0.fbAuth();
    };
    SignUpPage.prototype.toLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    return SignUpPage;
}());
SignUpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-sign-up',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/sign-up/sign-up.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">Sign Up</p>\n	<p class="form-desc">Let\'s get started with your free mindulness sessions.</p>\n	<form [formGroup]="formGroup" id="sign-up-form" #signUpForm>\n		<ion-row>\n			<ion-input type="text" formControlName="firstName" placeholder="First Name" (ionFocus)="focused($event)" [(ngModel)]="firstName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="text" formControlName="lastName" placeholder="Last Name" (ionFocus)="focused($event)" [(ngModel)]="lastName" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<ion-row [ngClass]="{\'taken\':emailTaken}">\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [ngClass]="{\'taken\':emailTaken}"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-input type="password" formControlName="password" placeholder="Password" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<div class="space-40"></div>\n		<p class="form-desc log">Already registered? Log in <a class="linker" (tap)="toLogin()">here</a>.</p>\n		<button ion-button id="signUp" class="getStarted" (tap)="signup()" [disabled]="!formGroup.valid">Get Started</button>\n		<div class="space-40"><a>OR</a></div>\n		<button ion-button id="signUpFB" class="fbReg" (tap)="FBauth()">Sign Up with Facebook</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/sign-up/sign-up.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], SignUpPage);

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuraMainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_script_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_aura_content_aura_content__ = __webpack_require__(228);
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
 * Generated class for the AuraMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AuraMainPage = (function () {
    function AuraMainPage(navCtrl, navParams, render, viewCtrl, scr, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.render = render;
        this.viewCtrl = viewCtrl;
        this.scr = scr;
        this.app = app;
        this.expanded = false;
        this.def = "down";
        this.day = 0;
        this.dur = 10;
        this.arrDay = [];
        this.activeCourse = [{ desc: "", id: "", path: "", title: "" }];
        this.courseTitle = "Mindfulness";
    }
    AuraMainPage.prototype.ionViewDidLoad = function () {
    };
    /* Add buttons depending on number of days *
     * Animate for effect to the current day 	 */
    AuraMainPage.prototype.popDays = function () {
        var _this = this;
        this.arrDay = [];
        for (var i = 1; i <= this.day; i++) {
            var st = !(i == this.day);
            this.arrDay.push({ day: i, status: st });
        }
        setTimeout(function () {
            try {
                _this.btnSlide.slideTo(_this.day);
            }
            catch (e) {
                //console.log(e);
            }
        }, 100);
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
        this.popDays();
    };
    AuraMainPage.prototype.ngOnInit = function () {
        var self = this;
        this.app.initProgArr();
    };
    /* This is triggered by the sub-course component *
    * when it is tapped (begin / continue) and 	  *
    * transfers the data from the sub-course to 	  *
    * the top area (slider of buttons).     	 	  */
    AuraMainPage.prototype.tryMe = function ($event) {
        this.day = $event.progress;
        this.courseTitle = $event.title;
        delete $event['progress'];
        delete $event['title'];
        this.app.setActiveCourse($event);
        //this.dur = this.app.progressKeys.length;
        this.popDays();
    };
    /* Go to the aura content */
    AuraMainPage.prototype.intoTheContent = function (stat, ind) {
        if (ind === void 0) { ind = 1; }
        //console.log(this.activeCourse[ind]);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_aura_content_aura_content__["a" /* AuraContentPage */], { data: this.app.activeCourse[ind] });
    };
    return AuraMainPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
], AuraMainPage.prototype, "slider", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('btns'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
], AuraMainPage.prototype, "btnSlide", void 0);
AuraMainPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-aura-main',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/aura-main/aura-main.html"*/'<aura-head></aura-head>\n\n<ion-content >\n\n	<section class="track-preview {{courseTitle}}">\n		<a class="progress-days">\n			Day {{day < app?.activeDur ? (day+1):day}} of {{app?.activeDur}}\n		</a>\n		<p class="section-title">\n			{{courseTitle}}\n		</p>\n\n		<!--div class="day-tracker container" (scroll)="evtScroll($event)"-->\n		<ion-slides slidesPerView="auto" spaceBetween="27" zoom="false" #btns class="btns">\n			<ion-slide *ngFor="let dy of arrDay">\n				<div class="play">\n					<ion-col [ngClass]="{\'rng\':true}" (tap)="intoTheContent(!dy?.status,dy?.day)">\n						Day {{dy?.day}}\n						<img src="../assets/images/tick.png"/>\n					</ion-col>\n				</div>\n			</ion-slide>\n			<ion-slide *ngIf="day < app?.activeDur">\n				<div class="play">\n					<ion-col [ngClass]="{\'rng\':dy?.status}" (tap)="intoTheContent(true,day+1)">\n						<ion-icon name="play"></ion-icon>\n						Day {{day + 1}}\n					</ion-col>\n				</div>\n			</ion-slide>\n			<ion-slide>\n				&nbsp;\n			</ion-slide>\n			<ion-slide>\n				&nbsp;\n			</ion-slide>\n		</ion-slides>\n		<!--/div-->\n		<p class="label-intro">\n			Start this course\n		</p>\n\n		<div class="expandable">\n			<a class="desc-trigger" (tap)="expand()">Description <ion-icon name="ios-arrow-{{def}}"></ion-icon></a>\n			<p class="content" [ngClass]="{\'show\':expanded}">\n				{{app?.activeCourse[day+1]?.desc.trim().substring(0,300)}}\n				<a class="link">About AURA</a>\n			</p>\n		</div>\n\n\n	</section>\n	<p class="more-courses">Additional Courses</p>\n\n	<section class="sliders">\n		<ion-slides slidesPerView="auto" spaceBetween="20" zoom="false">\n			<ion-slide *ngFor = "let crs of app?.progressKeys; let i=index">\n				<sub-course [title]="crs" [progress]="25" [enabled]="true" (begin)="tryMe($event)" [activeCourse]="app?.courses[crs]"></sub-course>\n			</ion-slide>\n			<!--ion-slide>\n				<sub-course [title]="\'Mindfulness\'" [progress]="0" [enabled]="false" (begin)="tryMe($event)"></sub-course>\n			</ion-slide>\n			<ion-slide>\n				<sub-course [title]="\'Focus\'" [progress]="0" [enabled]="false" (begin)="tryMe($event)"></sub-course>\n			</ion-slide-->\n\n		</ion-slides>\n	</section>\n\n    <footer></footer>\n</ion-content>\n\n<aura-foot></aura-foot>'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/aura-main/aura-main.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_app_script_service__["a" /* ScriptService */], __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */]])
], AuraMainPage);

//# sourceMappingURL=aura-main.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EvtProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_environment_dev__ = __webpack_require__(62);
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
    function EvtProvider(http
        // private auth0: AuthService
    ) {
        this.http = http;
        console.log('Hello EvtProvider Provider', __WEBPACK_IMPORTED_MODULE_3__config_environment_dev__["a" /* Config */].evt_app);
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
    EvtProvider.prototype.createUserAction = function (actionType, action) {
        if (actionType === void 0) { actionType = ''; }
        if (action === void 0) { action = {}; }
        this.getUserContext().then(function (usr) {
            usr.action(actionType).create(action).then(console.log).catch(function (err) { return console.error(err); });
        });
    };
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
    };
    /* return evt user context as a promise */
    EvtProvider.prototype.getUserContext = function () {
        var _this = this;
        //let usr = this.auth0.getUserDetailsFromStorage();
        var userContext = JSON.parse(localStorage.evrythngInfo);
        return (new Promise(function (resolve, reject) {
            resolve(new EVT.User({
                id: userContext.evrythngUser,
                apiKey: userContext.evrythngApiKey
            }, _this.evtapp));
        }));
    };
    /* EVT Scan */
    EvtProvider.prototype.scan = function () {
        return this.evtapp.scan();
    };
    /* Get EVT user's custom fields */
    EvtProvider.prototype.getUserCustomFields = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getUserContext().then(function (usr) {
                usr.$init.then(function (user) {
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
    return EvtProvider;
}());
EvtProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]
        // private auth0: AuthService
    ])
], EvtProvider);

//# sourceMappingURL=evt.js.map

/***/ }),

/***/ 62:
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
    appId: "UG7N6Q2yVMsrtNRaak34fprg",
    auth0: {
        clientID: 'w9VzQPQgiQaldMl3MaGkfEph63N6VJhi',
        domain: 'demo-evt.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://demo-evt.eu.auth0.com/userinfo',
        redirectUri: window.location.origin,
        scope: 'openid'
    },
    auth0Mgmt: {
        grant_type: 'client_credentials',
        client_id: 'iFF5t1pmHIXS9vsOV14KGt5V4XfEh37n',
        client_secret: '4gAx_w6YVA-uC1CtOGEvwCqyKoxRgKqyvf39i2axHVmOuZLr0U2fRCghMholpQqy',
        audience: 'https://demo-evt.eu.auth0.com/api/v2/'
    },
    ext_links: {
        privacyPolicy: "//www.neutrogena.co.uk/privacypolicy",
        cookiePolicy: "//www.neutrogena.co.uk/cookie-policy",
        legalNotice: "//www.neutrogena.co.uk/legal-statement",
        slaveryAct: "//www.neutrogena.co.uk/sites/neutrogena.co.uk/files/modern_slavery_act_statement.pdf"
    }
};
//# sourceMappingURL=environment.dev.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__delete_account_delete_account__ = __webpack_require__(232);
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
    function MyAccountPage(navCtrl, navParams, 
        // private render: Renderer2,
        auth0, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth0 = auth0;
        this.formBuilder = formBuilder;
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
        var node = event._elementRef.nativeElement;
    };
    MyAccountPage.prototype.blurred = function (event) {
        var node = event._elementRef.nativeElement;
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
        this.auth0.updateUser({ firstName: usr.firstName, lastName: usr.lastName }).then(function (res) {
            self.auth0.setUserMetadata(res['user_metadata']);
            self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        })
            .catch(function (err) {
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
        selector: 'page-my-account',template:/*ion-inline-start:"/Users/raysantos/evt-neutrogena/src/pages/my-account/my-account.html"*/'<ion-content>\n\n<section class="main">\n	<button ion-button class="xbtn" (tap)="dismissThis()"></button>\n	<p class="form-title">My Account</p>\n	<form [formGroup]="formGroup" id="my-account-form" #signUpForm [ngClass]="{\'fbreg\':FBreg}">\n		<ion-row>\n			<ion-label>First Name</ion-label>\n			<ion-input type="text" formControlName="firstName" placeholder="First Name" (ionFocus)="focused($event)" [(ngModel)]="firstName" (ionBlur)="blurred($event)" [readonly]="FBreg"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-label>Last Name</ion-label>\n			<ion-input type="text" formControlName="lastName" placeholder="Last Name" (ionFocus)="focused($event)" [(ngModel)]="lastName" (ionBlur)="blurred($event)" [readonly]="FBreg"></ion-input>\n		</ion-row>\n		<ion-row>\n			<ion-label>Email Address</ion-label>\n			<ion-input type="email" formControlName="email" placeholder="email@email.com" (ionFocus)="focused($event)" [(ngModel)]="email" (ionBlur)="blurred($event)" [readonly]="FBreg"></ion-input>\n		</ion-row>\n		<ion-row *ngIf="!FBreg">\n			<ion-label>Password</ion-label>\n			<ion-input type="text" formControlName="password" placeholder="********" (ionFocus)="focused($event)" [(ngModel)]="password" (ionBlur)="blurred($event)"></ion-input>\n		</ion-row>\n		<p class="fb-edit" *ngIf="FBreg">You can edit first name, last name, and email address on your Facebook <a (tap)="toFB()" class="linker">account page</a>.</p>\n		<button ion-button id="saveChanges" class="getStarted" (tap)="updateUser()" *ngIf="!FBreg">Save Changes</button>\n		<button ion-button id="logout" class="getStarted" (tap)="logout()">Log out</button>\n		<div class="space-40"><hr></div>\n		<button ion-button id="deleteAccount" class="fbReg" (tap)="deleteAccount()">Delete Account</button>\n	</form>\n\n</section>\n<footer></footer>\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/evt-neutrogena/src/pages/my-account/my-account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
], MyAccountPage);

//# sourceMappingURL=my-account.js.map

/***/ })

},[233]);
//# sourceMappingURL=main.js.map