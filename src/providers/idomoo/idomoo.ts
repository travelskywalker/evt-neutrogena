import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IdomooProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class IdomooProvider {

	outFormat: string = "VIDEO_MP4_V_X264_640X360_800_A_AAC_128";
	storyboardId: number = 15614;//13442;
	accountId: number = 2474;//2282;
	reqBdy: any;
	secret: string = "8DGLDfTkKM8dd2cf8339c7f286c28687e8b0aa6e533TTTjSNDar";//"RWf6jfWyVSe644c28ec48697446aa93288b9a925451YoxkSmH7h";
	link: string = "https://usa-api.idomoo.com/api/cg";
	vidLink: string = "";
  constructor(public http: Http) {
  	let self = this;
    self.reqBdy = 
  	{
	    response_format: "json",
	    video: {
	        "output_formats": [
	            {
	                "format": this.outFormat
	            }
	        ],
	        "data": [
	        	{
	                "key": "TEXT1",
	                "val": "YOLO! "
	            },
	            {
	                "key": "hgjiygku",
	                "val": "https://res.cloudinary.com/jandjstaging/image/upload/v1516066381/Happiness.jpg_1516066358854.jpg"
	            },
	            {
	                "key": "IMAGE1",
	                "val": "https://res.cloudinary.com/jandjstaging/image/upload/v1516066381/Happiness.jpg_1516066358854.jpg"
	            }
	        	],
	        "storyboard_id": this.storyboardId,
	        "account_id": this.accountId,
		    "authentication_token": this.secret,//"w0dvjVQZSNrFEZoeqRGjbA--",
		   // "landing_page_id":this.landPageId
	    }
	}
	//this.test();
  }

  testD():PromiseLike<any>{
  	let self = this;
  	let hdr = new Headers();
  	hdr.append("Content-Type","application/json");
  	let rq = new RequestOptions({headers: hdr});
  	return this.http.post(this.link, this.reqBdy, rq).toPromise()
  			.then(r=>{
  				let res = r.json();
  				console.log(res);
  				self.vidLink = res.video.output_formats[0].links[0].url;
  				console.log(self.vidLink);
  				localStorage.vid = self.vidLink;
  				self.storeLastPhoto();
  			})
  			.catch(console.error);
  }

  getUserPhotosFromStorage(){
  	let dataMap : Array<{key:string,val:string}> = [];
  	let cyg :Array<any> = eval(localStorage.cygHistory);
  	//let self = this;
  	return new Promise((resolve,reject)=>{
  		cyg.forEach((val,ind)=>{
	  		dataMap.push({"key":"IMAGE_"+(ind+1),"val":val['photoUrl']});
	  		dataMap.push({"key":"TEXT_"+(ind+1),"val":"DAY "+(ind+1)});
	  	});	
  		resolve(dataMap);
  	})
  	
  }

  getLastPhoto(){
  	let lastPhoto = JSON.parse(localStorage.cygHistory);
  	return lastPhoto[lastPhoto.length-1]['photoUrl'];
  }

  storeLastPhoto(){
  	localStorage.lastPhoto = this.getLastPhoto();
  }

  generateVid():PromiseLike<any>{
  	let self = this;
  	if(localStorage.lastPhoto == this.getLastPhoto()){
  		return Promise.resolve("same");
  	}
	return self.getUserPhotosFromStorage().then(res=>{
		self.reqBdy.video.data = res;
		return self.testD();
		
	}).catch(console.info);
  }
}


