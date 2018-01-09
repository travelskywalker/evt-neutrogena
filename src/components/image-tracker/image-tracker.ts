import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {Slides} from 'ionic-angular';


var sha1 = require('sha1');
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

	cloudName:string = 'demoengmntprty';
  text: string;
  photoProg: Array<any> = [];
  @ViewChild('Slides') slider: Slides;

  constructor() {
    console.log('Hello ImageTrackerComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
  	this.photoProg = ["http://masterbeautyphotography.com/wp-content/uploads/2016/06/Bridget_0156-web.jpg","https://www.slrlounge.com/wp-content/uploads/2016/04/Julia-kuzmenko-fashion-beauty-photography-retouching-studio-tutorial-model-MUA-slrlounge-kishore-sawh-3-800x1152.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLlSgQp9jjmjsDpUkb3Wax2ymctEQ-JVhvPpgLhXJ1gfIaJfNu"];
  }


  ngAfterViewInit(){
  	setTimeout(()=>{
  		this.slider.slideTo(this.photoProg.length+1);
  	},300);
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

  takePic($event){
    //console.log($event,this.pic);
    let self = this;
    if($event.target.files && $event.target.files[0]){
    	self.uploadFile($event.target.files[0]);
      /*let rdr = new FileReader(); 
      rdr.onload = function(e){
        self.uploadFile(e.target['result']);
      }
      rdr.readAsDataURL($event.target.files[0]);*/
    }

  }

  // *********** Upload file to Cloudinary ******************** //
	uploadFile(file) {
		let self = this;
  var url = `https://api.cloudinary.com/v1_1/${self.cloudName}/image/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
  // Update progress (can be used to show progress indicator)
  /*xhr.upload.addEventListener("progress", function(e) {
    var progress = Math.round((e.loaded * 100.0) / e.total);
    document.getElementById('progress').style.width = progress + "%";

    console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
  });*/

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      /*var url = response.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      var tokens = url.split('/');
      tokens.splice(-2, 0, 'w_150,c_scale');
      var img = new Image(); // HTML5 Constructor
      img.src = tokens.join('/');
      img.alt = response.public_id;
      document.getElementById('gallery').appendChild(img);*/
      console.log(response);
    }
  };

  let tstamp = Date.now().toString();
  fd.append('file', file);
  fd.append('public_id', 'test');
  fd.append('timestamp', tstamp);
  fd.append('api_key', '299675785887213'); // Optional - add tag for image admin in Cloudinary

  let signed = sha1('public_id=test&timestamp='+tstamp+"BBImHLi3cw-Y_NynlbMU3HYyhH0");
  console.log(signed);
  fd.append('signature', signed); // Optional - add tag for image admin in Cloudinary
  xhr.send(fd);
}

/* *********** Handle selected files ******************** //
var handleFiles = function(files) {
  for (var i = 0; i < files.length; i++) {
    uploadFile(files[i]); // call the function to upload the file
  }
};*/
}
