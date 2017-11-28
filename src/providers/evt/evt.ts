import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../config/environment';

import { AuthService } from '../auth/auth.service';
declare var EVT : any;

/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvtProvider {

  evtapp : any;
  anonUserC: Promise<any>;
  userC: Promise<any>;
  anonEvtUser: any;
  evtUser: any;

  constructor(public http: Http,
              private auth: AuthService
  ) {
    console.log('Hello EvtProvider Provider',Config.evt_app);
    this.init();
  }

  createAppAction(actionType:string='',action:any = {}){
  	this.evtapp.$init.then(res=>{
  		res.action(actionType).create(action).then(console.log);
  	}).catch(err=>{
  		console.log(err);
  	});
  }

  createUserAction(actionType:string='',action:any = {}, anonUser: boolean=false): Promise<any> {

    let userC;
    if (anonUser) {
      userC = this.getAnonUserContext();
    } else {
      userC = this.getUserContext();
    }

  	return userC.then(usr=>{
  		usr.action(actionType).create(action).then(console.log(actionType)).catch(err=>console.error(err));
  	});
  }


  getAction(actionType:string='', anonUser: boolean=false){
    let usr;
    if (anonUser) {
      usr = this.getAnonUser();
    } else {
      usr = this.getUser();
    }

    if(usr){
      return usr.action(actionType).read();
    }
  }
  /**
   *
   * Create a THNG action for a given user mode - anon or registered
   *
   * @param actionType
   * @param action
   * @param anonUser
   * @returns {any}
   */
  createThngAction(actionType:string='',action: Object = {}, anonUser: boolean=false): Promise<any> {
    return this.getThngContext(anonUser).then(thng=>{
      if (typeof thng !='undefined') {
        thng.action(actionType).create(action).then(console.log).catch(err=>console.error(err));
      }
    });
  }

  init(){

  	EVT.use(EVT.Scan);

  	EVT.setup({
      apiUrl: Config.evt_base_url,
      geolocation: true
    });

    EVT.Scan.setup({
      filter: {
        method: ["ir", "2d"]
      }
    });

  	this.evtapp = new EVT.App(Config.evt_app);

  }

  hasUserContext(): boolean {
    return (this.getUserContextKeys() ? true : false);
  }

  getUserContextKeys(forceAnon: boolean=false): any {
    let lsApiKey = "";
    let lsId = "";

    if (forceAnon==true) {
      //force grab the anon user info
      console.log('user context is anon');
      if (typeof localStorage.anonEvrythngInfo != 'undefined') {
        let userContext = JSON.parse(localStorage.anonEvrythngInfo);
        lsId = userContext.evrythngUser;
        lsApiKey = userContext.evrythngApiKey;
      } else {
        this.createAppUser(forceAnon).then(usr=>{
          lsId = usr.evrythngUser;
          lsApiKey = usr.evrythngApiKey;
        })
      }
      console.log(lsId, lsApiKey);
    } else {
      if (this.auth.loggedIn()) {
        console.log('user context is registered');
        let userContext = this.auth.getUserDetailsFromStorage();

        if (typeof userContext.sub != 'undefined' && userContext.sub.indexOf("facebook") != -1) {
          lsApiKey = userContext[Config.fbUserMetadataNS + 'user_metadata'].evrythngUserData.evrythngApiKey;
          lsId = userContext[Config.fbUserMetadataNS + 'user_metadata'].evrythngUserData.evrythngUser;
        } else {
          lsApiKey = userContext.user_metadata.evrythngUserData.evrythngApiKey;
          lsId = userContext.user_metadata.evrythngUserData.evrythngUser;
        }

      } else {
        console.log('user context is ambigous');
        //possibly an anon user or just userContext was not set / reset
        if (typeof localStorage.evrythngInfo != 'undefined') {

          let userContext = JSON.parse(localStorage.evrythngInfo);
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
  }

  /**
   * helper to resolve context keys automatically
   *
   * @returns {any}
   * @private
   */
  _getUserContextKeys() {
    let ls: any;
    if (this.auth.loggedIn()) {
      ls = this.getUserContextKeys(false);
      if (typeof ls == 'undefined') {
        console.log('Did not find registered keys. Fall back to anon')
        ls = this.getUserContextKeys(true);
      }
    } else {
      //anon
      ls = this.getUserContextKeys(true);
    }
    return ls;
  }

  /* return evt user context as a promise */
  getUserContext():Promise<any> {

    if (typeof this.userC != 'undefined') {
      return this.userC;
    }

    let ls = this._getUserContextKeys();

    let lsId = typeof ls != 'undefined' ? ls[1] : '';
    let lsApiKey = typeof ls != 'undefined' ? ls[0] : '';

    if (lsApiKey == '' || lsId == '') {

      return new Promise(()=> { return false});

    } else {

      return(
        new Promise((resolve,reject)=>{
          resolve(
            new EVT.User({
              id: lsId,
              apiKey: lsApiKey
            }, this.evtapp)
          )})
      )

    }

  }

  getUser() {
    /**
     * Return EVT user instance object (Not a promise)
     * @type {any}
     */
    if (typeof this.evtUser != 'undefined') {
      return this.evtUser;
    }

    let ls = this._getUserContextKeys();

    if (typeof ls != 'undefined') {

      let lsId = ls[1];
      let lsApiKey = ls[0];
      return new EVT.User({
        id: lsId,
        apiKey: lsApiKey
      }, this.evtapp)
    }
    else{
      return false;
    }
  }

  /* return evt user context as a promise */
  getAnonUserContext():Promise<any> {

    if (typeof this.anonUserC != 'undefined') {
      return this.anonUserC;
    }

    let ls = this.getUserContextKeys(true);
    let lsId = ls[1];
    let lsApiKey = ls[0];

  	return(
  		new Promise((resolve,reject)=>{
  			resolve(
		        new EVT.User({
              id: lsId,
              apiKey: lsApiKey
		        }, this.evtapp)
        	)
  		})
  	);
  }

  getAnonUser() {
    /**
     * Return EVT user instance object (Not a promise)
     * @type {any}
     */

    if (typeof this.anonEvtUser != 'undefined') {
      return this.anonEvtUser;
    }

    let ls = this.getUserContextKeys(true);

    let lsId = ls[1];
    let lsApiKey = ls[0];

    if (typeof ls != 'undefined') {
      return new EVT.User({
        id: lsId,
        apiKey: lsApiKey
      }, this.evtapp)
    }
  }

  /**
   *
   * Return Thng context as promise
   * Save to local storage if it's available in EVT
   *
   * @returns {any}
   */
  getThngContext(anonUser: boolean=false):Promise<any> {
    /**
     * assign `this` local function context
     * @type {any}
     */
    let self = this;
    let userC = this.getUser();
    let userCF = this.getUserCustomFields();
    if (anonUser) {
      userC = this.getAnonUser();
      userCF = self.getAnonUserCustomFields();
    }

    if (typeof localStorage.myThng !== 'undefined') {

      let myThng = JSON.parse(localStorage.myThng);
      console.log('has thng', myThng);
      return userC.thng(myThng.id).read(th=>{});

    } else {
      console.log('no local thng');
      return userCF.then(cf => {
        if (typeof cf != 'undefined' && cf.hasOwnProperty('myThng')) {

          //has myThng customField
          return userC.thng(cf.myThng).read(th=>{
            localStorage.myThng = JSON.stringify(th);
            self.setLocalStorageTimeout();
          });

        } else if (typeof localStorage.myProduct != 'undefined') {
          console.log('no thng - product');
          let thngData = {
              name: 'User Thng - ' + userC.id,
              tags: ["Image Recognition"],
              product: localStorage.myProduct.id
          };
          return self.createThng(thngData, anonUser);

        } else {
          console.log('no thng');
        }
      })
    }
  }

  hasLocalThng(): boolean {
    if (typeof localStorage.myThng == 'undefined') {
      return false;
    } else {
      return true;
    }
  }

  hasLocalProduct(): boolean {
    if (typeof localStorage.myProduct == 'undefined') {
      return false;
    } else {
      return true;
    }
  }
  /**
   * Get a THNG context by giving it an ADI or THNG id
   *
   * @param thngId
   * @param anonUser
   * @returns {Promise<R>|any|Function}
   */
  getThngContextById(thngId: any, anonUser: boolean=false): Promise<any> {

    let userC = this.getUser();
    if (anonUser) {
      userC = this.getAnonUser();
    }

    return userC.thng(thngId).read().catch(err=> {

      userC.action("_NotRecognised").create().catch(err=>console.error(err));
      console.log('err fetch thng by id', err)

    });
  }

  /**
   * Get a product context by giving it a product Id
   *
   * @param productId
   * @param anonUser
   * @returns {Promise<R>|any|Function}
   */
  getProductContextById(productId: string, anonUser: boolean=false): Promise<any> {

    let userC = this.getUser();
    if (anonUser) {
      userC = this.getAnonUser();
    }

    return userC.thng(productId).read().catch(err=> {
      console.log('err fetch product by id', err)
    });

  }

  /* EVT Scan */
  scan(opt:any){
  	return this.evtapp.scan(opt);
  }

  /* Get EVT user's custom fields */
  getUserCustomFields():Promise<any>{
  	return new Promise((resolve,reject)=>{
	  	this.getUserContext().then(usr=>{
	  		usr.$init.then(user=>{
          console.log(user);
		  		if(typeof user.customFields !== "undefined" && user.customFields.hasOwnProperty('myThng')){
		  			resolve(user.customFields);
		  		}
		  		else{
		  			resolve(false);
		  		}
	  		})
	  	}).catch(err=>{
	  		reject(err);
	  	})
  	})
  }

  /* Get EVT anon user's custom fields */
  getAnonUserCustomFields():Promise<any>{
  	return new Promise((resolve,reject)=>{
	  	this.getAnonUserContext().then(usr=>{
	  		usr.$init.then(user=>{
		  		if(typeof user.customFields !== "undefined" && user.customFields.hasOwnProperty('myThng')){
		  			resolve(user.customFields);
		  		}
		  		else{
            reject(false);
		  		}
	  		})
	  	}).catch(err=>{
	  		reject(err);
	  	})
  	})
  }

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
  createThng(thngData: any, anonUser: boolean=false): Promise<any> {
    let slf = this;
    let usr = this.getUser();
    if (anonUser) {
      usr = this.getAnonUser();
    }

    return usr.thng().create(thngData).then(th=> {
      // Assign the newly created thng to the user immediately, then return the promise
      return usr.update({
        customFields: {
          myThng: th.id
        }
      }).then(()=>{
        localStorage.myThng = JSON.stringify(th);
        slf.setLocalStorageTimeout();
      });

    })
    .catch(err=> {

      console.log(err);
      console.log("Failed to create a thng");

    })
  }

  /**
   * Update the myThng custom field of chosen user context.
   *
   * @param thngData
   * @param anonUser
   * @param allowUpdateIfExists
   * @returns {any}
   */
  updateMyThng(thngData: any, anonUser: boolean=false, allowUpdateIfExists: boolean=false): Promise<any> {

    if (typeof thngData != 'undefined') {
      return new Promise((resolve)=> {
        resolve(false);
      })
    }

    let usr = this.getUser();
    let usrCF = this.getUserCustomFields();
    if (anonUser) {
      usr = this.getAnonUser();
      usrCF = this.getAnonUserCustomFields();
    }

    if (!allowUpdateIfExists) {
      usrCF.then((cf)=>{

        if (typeof cf != 'undefined' && cf) {

          if (typeof cf.myThng == 'undefined') {
            return this._updateMyThng(usr, thngData);
          }
        }

      })
    } else {

      return this._updateMyThng(usr, thngData);

    }
  }

  /***
   * private method for raw update to user custom fields
   *
   * @param usr
   * @param thngData
   * @returns {Function|any|Thenable<undefined>|SyncAsync<R>|Promise<R>}
   * @private
   */
  private _updateMyThng(usr: any, thngData: any): Promise<any> {
    let slf = this;
    return usr.update({

      customFields: {
        myThng: thngData.id
      }

    }).then(()=>{

      localStorage.myThng = JSON.stringify(thngData);
      slf.setLocalStorageTimeout();
      console.log('myTHng updated');

    }).catch(err=> {

      console.log('update myTHng err', err)

    });

  }

  anonymousDataModel(data){
    let obj = {
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
    }
    return obj;
  }

  setAnonUserContext(user: any, anonUser: boolean) {

    if (typeof anonUser == 'undefined' || anonUser) {

      localStorage.isAnon = true;
      localStorage.anonUserInfo = JSON.stringify(this.anonymousDataModel(user));
      let evtInfo = {
        anonymousUser: true,
        evrythngUser: user.id,
        evrythngApiKey: user.apiKey
      }
      localStorage.anonEvrythngInfo = JSON.stringify(evtInfo);

    } else {

      localStorage.isAnon = false;

    }


  }

  /**
   * Abstraction to get an anon user instance and save state to local store
   *
   * @param anonUser
   * @returns {Thenable<undefined>|Function|any|SyncAsync<R>|Promise<R>}
   */
  createAppUser(anonUser?: boolean): Promise<any>{

    return this.evtapp.appUser().create({
      anonymous: anonUser
    }).then(usr=>{
      console.log(typeof usr, usr);
      this.setAnonUserContext(usr, anonUser);
      return usr;
    }).catch(err=> {
      console.log(err);
    })

  }

  clearCache() {
    this.anonUserC = null;
    this.userC = null;
    this.anonEvtUser = null;
    this.evtUser = null;
  }

  setLocalStorageTimeout(){
    let dt_now = new Date();
    localStorage.localExpire = new Date(dt_now.getTime() + Config.scanRevertExpiry * 3600000); // add 1 day's worth of milliseconds
  }

}
