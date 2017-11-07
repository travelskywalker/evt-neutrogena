import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { aura } from "../../assets/aura/config/aura.config";

/*
  Generated class for the AppProvider provider.

  This is the main service for handling user progress
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

  setActiveCourse(val){
  	this.activeCourse = val;
  	this.activeDur = Object.keys(this.activeCourse).map(a=>{return this.activeCourse[a]}).length;
  	console.log(this.activeCourse,this.activeDur);
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
