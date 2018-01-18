import { Component } from '@angular/core';

/**
 * Generated class for the VideoPreviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'video-preview',
  templateUrl: 'video-preview.html'
})
export class VideoPreviewComponent {

  text: string;
  assets: Array<any> = [];
  expanded: boolean = false;

  constructor() {
    this.text = 'Hello World';
    this.assets['arr'] = "../assets/images/down-arrow.png";
    this.assets['vid'] = "https://v.idomoo.com/2282/0000/1k7z533d2l2o2f2lu91501uow2c2h0336o1y2l17y.mp4";
  }

  ngOnInit(){

  }

  toggleView(){
  	this.expanded = !this.expanded;
  }

  dL(){
  	
  }

}
