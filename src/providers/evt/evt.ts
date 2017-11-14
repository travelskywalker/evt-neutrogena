import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../config/environment.dev';

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

  createUserAction(actionType:string='',action:any = {}): Promise<any> {
  	return this.getUserContext().then(usr=>{
  		usr.action(actionType).create(action).then(console.log(actionType)).catch(err=>console.error(err));
  	})
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
  createThngAction(actionType:string='',action:any = {}, anonUser: boolean=false): Promise<any> {
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
	  geolocation: false
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
      }
      console.log(lsId, lsApiKey);
    } else {
      if (this.auth.loggedIn()) {
        console.log('user context is registered');
        let userContext = this.auth.getUserDetailsFromStorage();
        lsApiKey = userContext.user_metadata.evrythngUserData.evrythngApiKey;
        lsId = userContext.user_metadata.evrythngUserData.evrythngUser;
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
    let ls = this._getUserContextKeys();

    let lsId = ls[1];
    let lsApiKey = ls[0];

    if (typeof ls != 'undefined') {
      return new EVT.User({
        id: lsId,
        apiKey: lsApiKey
      }, this.evtapp)
    }
  }

  /* return evt user context as a promise */
  getAnonUserContext():Promise<any> {

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
      return userC.thng(myThng.id).read();

    } else {
      return userCF.then(cf => {
        if (typeof cf != 'undefined' && cf.hasOwnProperty('myThng')) {

          //has myThng customField
          return userC.thng(cf.myThng).read(th=>{
            localStorage.myThng = JSON.stringify(th);
          });

        } else if (typeof localStorage.myProduct != 'undefined') {

          let thngData = {
              name: 'User Thng - ' + userC.id,
              tags: ["Image Recognition"],
              product: localStorage.myProduct.id
          };
          self.createThng(thngData, anonUser);

        }
      })
    }
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
		  			resolve(false);
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
      });

    })
    .catch(err=> {

      console.log(err);
      console.log("Failed to create a thng");

    })
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

  setAnonUserContext(res: any, anonUser: boolean) {

    if (typeof anonUser == 'undefined' || anonUser) {

      localStorage.isAnon = true;
      localStorage.anonUserInfo = JSON.stringify(this.anonymousDataModel(res[0].user));
      let evtInfo = {
        anonymousUser: true,
        evrythngUser: res[0].user.id,
        evrythngApiKey: res[0].user.apiKey
      }
      localStorage.anonEvrythngInfo = JSON.stringify(evtInfo);

    } else {

      localStorage.isAnon = false;

    }


  }

}
