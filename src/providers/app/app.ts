import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { aura } from "../../assets/aura/config/aura.config";

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
	courses ?: Array<any> = [];
	activeCourse : any;
	activeDur : number = 1;
  constructor(public http: Http) {
    console.log(aura);
    this.initCourses();
  }

  /* GET the aura variable containing the content details, path..etc. */
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
	  
  	return Promise.all(promises).then(()=>{ this.progressKeys = Object.keys(mast); return mast});


  }

  /* set the active course for the top component in the main page */
  setActiveCourse(val){
  	this.activeCourse = val;
  	let ll = Object.keys(this.activeCourse).map(a=>{return this.activeCourse[a]});
  	
  	this.activeDur = ll.length - 2; //subtract 2 because there are 2 extra fields: current progress and title

  }

  setDur(val:number){
  	this.activeDur = val;
  }

  initCourses(){
  	let self = this;
  	self.toGroup().then(res=>{
  		self.initProgArr();
  		self.courses = res;
  		self.activeCourse = res['Mindfulness'];
  		self.activeDur = self.progressKeys.length;
  	})
  }

  initProgArr(){
  	let self = this;
  	this.progressKeys.forEach((val,ind)=>{
  		let init = {val:[]};
  		self.progressArr.push(init);
  	});
  }

  updateUserProgress(){
  	//TODO: get user data first from EVT. probably from custom fields

  	//TODO: assign user data to existing mapping.
  }

}
