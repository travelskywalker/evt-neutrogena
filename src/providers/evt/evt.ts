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

  createThngAction(actionType:string='',action:any = {}): Promise<any> {
    return this.getThngContext().then(thng=>{
      thng.action(actionType).create(action).then(console.log).catch(err=>console.error(err));
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

  getUserContextKeys(): any {
    let lsApiKey = "";
    let lsId = "";
    if (this.auth.loggedIn()) {
      let userContext = this.auth.getUserDetailsFromStorage();
      lsApiKey = userContext.user_metadata.evrythngUserData.evrythngApiKey;
      lsId = userContext.user_metadata.evrythngUserData.evrythngUser;
    } else {
      //Anon user
      if (typeof localStorage.evrythngInfo != 'undefined') {
        let userContext = JSON.parse(localStorage.evrythngInfo);
        lsId = userContext.evrythngUser;
        lsApiKey = userContext.evrythngApiKey;
      }
    }

    if (lsApiKey !== "" && lsId !== "") {
      return [lsApiKey, lsId];
    }
  }

  /* return evt user context as a promise */
  getUserContext():Promise<any> {

    let ls = this.getUserContextKeys();
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

  getUser() {
    /**
     * Return EVT user instance object (Not a promise)
     * @type {any}
     */
    let ls = this.getUserContextKeys();
    let lsId = ls[1];
    let lsApiKey = ls[0];

    let userContext = this.auth.getUserDetailsFromStorage();
    if (typeof userContext != 'undefined') {
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
  getThngContext():Promise<any> {
    /**
     * assign `this` local function context
     * @type {any}
     */
    let self = this;

    if (typeof localStorage.myThng !== 'undefined') {
      let myThng = JSON.parse(localStorage.myThng);
      return this.getUser().thng(myThng.id).read();
    } else {
      return this.getUserCustomFields().then(cf => {
        if (typeof cf != 'undefined' && cf.hasOwnProperty('myThng')) {
          //has myThng customField
          return self.getUser().thng(cf.myThng).read(th=>{
            localStorage.myThng = JSON.stringify(th);
          });
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

}
