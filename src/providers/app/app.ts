import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { aura } from "../../assets/aura/config/aura.config";

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

  constructor(public http: Http) {
    console.log(aura);
  }

  toGroup():Promise<any>{
  	let mast = [];
	let promises = aura.map(ar=>{
			let crs = ar.Course.trim();
			if(mast.hasOwnProperty(crs)){
				mast[crs][ar.Day]= {id:ar.ID,title:ar.Title,path:ar.path,desc:ar.Description};
			}
			else{
				mast[crs] = {};
				mast[crs][ar.Day] = {id:ar.ID,title:ar.Title,path:ar.path,desc:ar.Description};
			}
	  	})
	  
  	return Promise.all(promises).then(()=>{return mast});


  }

  updateUserProgress(){
  	//TODO: get user data first from EVT. probably from custom fields

  	//TODO: assign user data to existing mapping.
  }

}
