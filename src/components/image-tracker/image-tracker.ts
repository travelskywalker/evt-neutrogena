import { Component, ViewChild } from '@angular/core';
import { Slides, LoadingController } from 'ionic-angular';


var sha1 = require('sha1');
declare var EXIF;
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
	//cloudName:string = 'jandjstaging';
  text: string;
  photoProg: Array<any> = [];
  @ViewChild('Slides') slider: Slides;

  constructor(private loader: LoadingController) {
    console.log('Hello ImageTrackerComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
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

  unlockSlides(){
  	this.slider.lockSwipeToNext(false);
  	this.slider.lockSwipeToPrev(false);
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
    let load = this.loader.create({
      spinner: 'crescent',
      dismissOnPageChange: true,
      showBackdrop: true,
      content: `Please wait...`,
      enableBackdropDismiss:true});
    load.present();
    let orientation;
		EXIF.getData(file,function(){
			orientation =  EXIF.getTag(this, "Orientation");
		})
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

      let rdr = new FileReader(); 
      rdr.onloadend = function(){
	    var tempImg = new Image();
	    tempImg.src = rdr.result;
	    tempImg.onload = function() {
	      	var MAX_WIDTH = 400;
	        var MAX_HEIGHT = 400;
	        var tempW = tempImg.width;
	        var tempH = tempImg.height;
	        if (tempW > tempH) {
	            if (tempW > MAX_WIDTH) {
	               tempH *= MAX_WIDTH / tempW;
	               tempW = MAX_WIDTH;
	            }
	        } else {
	            if (tempH > MAX_HEIGHT) {
	               tempW *= MAX_HEIGHT / tempH;
	               tempH = MAX_HEIGHT;
	            }
	        }
	 
	        var canvas = document.createElement('canvas');
	        canvas.width = tempW;
	        canvas.height = tempH;
	        var ctx = canvas.getContext("2d");
	        //ctx.drawImage(tempImg, 0, 0, tempW, tempH);

	        //var dataURL = canvas.toDataURL("image/png");
	        var dataURL = self.exifProc(orientation,ctx,canvas,tempImg);
	        //var data = 'image='+dataURL;

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
		      self.photoProg.push(response.secure_url);
		      //self.exifProc(response.secure_url,self.photoProg.length-1);
		      self.unlockSlides();
		      setTimeout(()=>{
			  	self.slider.slideTo(self.photoProg.length+1);
			  },500);
		    	load.dismiss();
		    }
		  }

		  let tstamp = Date.now().toString();
		  let pid = file.name+"_"+self.photoProg.length;
		  let secret = "BBImHLi3cw-Y_NynlbMU3HYyhH0"
		  //let secret = "uJkQIneMpHgAJkqho1NLFroqGUg";
		  fd.append('file', dataURL);
		  fd.append('public_id', pid);
		  fd.append('timestamp', tstamp);
		  fd.append('api_key', '299675785887213'); // 572517737342669 Optional - add tag for image admin in Cloudinary

		  let signed = sha1('public_id='+pid+'&timestamp='+tstamp+secret);
		  fd.append('signature', signed); // Optional - add tag for image admin in Cloudinary
		  xhr.send(fd);

	      }
  	}

      rdr.readAsDataURL(file);


}

exifProc(orientation,ctx,canvas,exifImg){
	console.log(orientation,ctx,canvas,exifImg);
/*	let exifImg = <HTMLImageElement>document.getElementsByClassName('i'+id)[0]; 
	exifImg.src = url;
	EXIF.getData(exifImg, function() {
  var orientation = EXIF.getTag(this, "Orientation");
  
	        var canvas = document.createElement('canvas');
	        canvas.width = exifImg.width;
	        canvas.height = exifImg.height;
	        var ctx = canvas.getContext("2d");
  ctx.translate(exifImg.width * 0.5, exifImg.height * 0.5);
*/
  switch(orientation) {
    case 2:
        // horizontal flip
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        break;
    case 3:
        // 180° rotate left
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(Math.PI);
        break;
    case 4:
        // vertical flip
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        break;
    case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
    case 6:
        // 90° rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -canvas.height);
        break;
    case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(canvas.width, -canvas.height);
        ctx.scale(-1, 1);
        break;
    case 8:
        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI);
        //ctx.translate(-canvas.width, 0);
        break;
  }

  if(orientation == 1){
  	ctx.drawImage(exifImg, 0, 0, canvas.width, canvas.height);
  }
  else{
	 // ctx.translate(-canvas.width * 0.5, -canvas.height * 0.5);
  		ctx.drawImage(exifImg, 0, 0, canvas.width, canvas.height);
  }
  return canvas.toDataURL("image/png");
}


/* *********** Handle selected files ******************** //
var handleFiles = function(files) {
  for (var i = 0; i < files.length; i++) {
    uploadFile(files[i]); // call the function to upload the file
  }
};*/
}
