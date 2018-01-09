import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {Slides} from 'ionic-angular';

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
}
