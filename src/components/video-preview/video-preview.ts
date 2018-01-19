import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';

import { IdomooProvider } from '../../providers/idomoo/idomoo';

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
  generated: boolean = false;
  @ViewChild('plyr') plyr : ElementRef;

  constructor(private idomoo: IdomooProvider, private render: Renderer2) {
  }

  ngAfterViewInit(){
    this.assets['arr'] = "../assets/images/down-arrow.png";
    console.log(this.plyr.nativeElement.innerHTML);
  }

  isframeLoaded() {
  	setTimeout(()=>{
  		console.log("isframeLoaded");
  	},500);
  }

  toggleView(){
  	this.expanded = !this.expanded;
  	if(this.expanded && !this.generated){
  		this.generated = true;
  		this.assets['vid'] = localStorage.vid;
  		this.idomoo.generateVid().then(res=>{
  			console.log(res);
			let scr : HTMLScriptElement = document.createElement('script');
			scr.type = "text/javascript";
			scr.id = "idomooScript";
			scr.src = "../assets/scripts/idomoo-player.js";

			let dlLink = document.getElementById('idomoo_download_link');
			dlLink.insertBefore(scr,dlLink.childNodes[0]);
		});
  	}

  }

  resetPlayer(){
  	document.getElementById('idomooScript').remove();
  	this.render.setProperty(this.plyr.nativeElement,'innerHTML',"");
  }

  dL(){
  	
  }

}
