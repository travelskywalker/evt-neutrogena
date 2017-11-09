import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../config/environment.dev';

// import { AuthService } from '../auth/auth.service';
declare var EVT : any;

/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvtProvider {

 evtapp : any;

  constructor(public http: Http
    // private auth0: AuthService
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

  createUserAction(actionType:string='',action:any = {}){
  	this.getUserContext().then(usr=>{
  		usr.action(actionType).create(action).then(console.log).catch(err=>console.error(err));
  	})
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

  /* return evt user context as a promise */
  getUserContext():Promise<any> {
  	//let usr = this.auth0.getUserDetailsFromStorage();
  	let userContext = JSON.parse(localStorage.evrythngInfo);
  	return(
  		new Promise((resolve,reject)=>{
  			resolve(
		        new EVT.User({
		            id: userContext.evrythngUser,
		            apiKey: userContext.evrythngApiKey
		        }, this.evtapp)
        	)
  		})
  	);
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
