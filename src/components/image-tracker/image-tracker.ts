import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Slides, LoadingController } from 'ionic-angular';


var sha1 = require('sha1');
import * as loadImage from 'blueimp-load-image';

import { EvtProvider } from "../../providers/evt/evt";
/**
 * Generated class for the ImageTrackerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-tracker',
  templateUrl: 'image-tracker.html'
})
export class ImageTrackerComponent {
  tstamp = Date.now().toString();
	//cloudName:string = 'demoengmntprty';
  cygHistory:Array<any> = [];
	cloudName:string = 'jandjstaging';
  text: string;
  photoProg: Array<any> = [];
  canAddTodaysPhoto: boolean = false;
  @ViewChild('Slides') slider: Slides;
  @Output() uploaded: EventEmitter<any> = new EventEmitter();

  constructor(private loader: LoadingController, private evt: EvtProvider) {
    console.log('Hello ImageTrackerComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
    //console.log(loadImage);
  }


  ngAfterViewInit(){
  	/*setTimeout(()=>{
  		this.slider.slideTo(this.photoProg.length+1);
  	},300);*/
    let self = this;
    this.evt.getUserCustomFields().then((cF)=>{
      
      self.photoProg = cF.photoHistory || [];
      this.fetchCYGfromStorage();
      setTimeout(()=>{
        self.slider.slideTo(self.photoProg.length-1);
      },500);
      //console.log(cF,this.today);
      self.canUploadPhoto();
    });
  }

  canUploadPhoto(){
    let self = this;
    self.canIHasToday().then(i=>{
      if(i){
        self.canAddTodaysPhoto = false;
      }
      else{
        self.canAddTodaysPhoto = true;
      }
    });
  }

  canIHasToday():PromiseLike<any>{
    let localCpy :Array<any>= JSON.parse(localStorage.cygHistory);
    let self = this;
    return new Promise((resolve,reject)=>{
      resolve(localCpy.find((val)=>{
        let v1 = self.toLocaleDateString(val.timestamp);
        let v2 = self.toLocaleDateString(self.tstamp);
        //console.log(v1,v2,v1==v2);
        return v1==v2;
      })
      );
    })
  }

  sliderChanged(event = null){
    if(this.slider.isBeginning()){
      this.slider.lockSwipeToPrev(true);
      this.slider.lockSwipeToNext(false);
    }
    else if(this.slider.isEnd()){
      this.slider.lockSwipeToNext(true);
      this.slider.lockSwipeToPrev(false);
    }
    else{
      this.slider.lockSwipeToPrev(false);
      this.slider.lockSwipeToNext(false);
    }

  }

  unlockSlides(){
  	this.slider.lockSwipeToNext(false);
  	this.slider.lockSwipeToPrev(false);
  }

  takePic($event){
    let self = this;
    if($event.target.files && $event.target.files[0]){
    	self.uploadFile($event.target.files[0]);
    }

  }

  // *********** Upload file to Cloudinary ******************** //
	uploadFile(file) {
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
    load.present();
		let self = this;
    var url = `https://api.cloudinary.com/v1_1/${self.cloudName}/image/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    loadImage.parseMetaData(file, function(data){
         let oren = 0;
         if(data.exif){
           oren = data.exif.get('Orientation');
         }

      loadImage(file,

        function(img){
          let base64data = img.toDataURL("image/jpeg");
          //let img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
          xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
              // File uploaded successfully
              var response = JSON.parse(xhr.responseText);
              console.log(response);
              self.photoProg.push({photoUrl:response.secure_url,timestamp:self.tstamp});
              self.unlockSlides();
              setTimeout(()=>{
                self.slider.slideTo(self.photoProg.length-1);
                localStorage.cygHistory = JSON.stringify(self.photoProg);
                self.uploaded.emit(self.cloudName);
                self.canAddTodaysPhoto = false;
                self.canUploadPhoto();
              },500);
              load.dismiss();
            }
          }

          let pid = file.name+"_"+self.tstamp;
          let secret = "uJkQIneMpHgAJkqho1NLFroqGUg"
          //let secret = "BBImHLi3cw-Y_NynlbMU3HYyhH0";
          fd.append('file', base64data);
          fd.append('public_id', pid);
          fd.append('timestamp', self.tstamp);
          fd.append('api_key', '572517737342669'); // 299675785887213 Optional - add tag for image admin in Cloudinary

          let signed = sha1('public_id='+pid+'&timestamp='+self.tstamp+secret);
          fd.append('signature', signed); // Optional - add tag for image admin in Cloudinary
          xhr.send(fd);
        },

        {
          canvas:true,
          orientation:oren,
          maxWidth:400,
          maxHeight:400
        }
       )
    });

  }

  toLocaleDateString(dt){
    return new Date(parseInt(dt)).toLocaleDateString();
  }

  fetchCYGfromStorage(){
    if(localStorage.cygHistory && JSON.parse(localStorage.cygHistory)){
      this.photoProg = this.cygHistory = JSON.parse(localStorage.cygHistory);
    }
  }

}
