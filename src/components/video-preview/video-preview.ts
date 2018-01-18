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
  }

  ngAfterViewInit(){
    this.assets['arr'] = "../assets/images/down-arrow.png";
    this.assets['vid'] = "https://v.idomoo.com/2282/0000/1k7z533d2l2o2f2lu91501uow2c2h0336o1y2l17y.mp4";
    //this.assets['link'] = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/idomoo/idomoo_player.html?"+encodeURIComponent(this.assets['vid']));
    localStorage.vid = this.assets['vid'];

    let scr : HTMLScriptElement = document.createElement('script');
    scr.type = "text/javascript";
    scr.id = "idomooScript";
    scr.src = "../assets/scripts/idomoo-player.js";

    let dlLink = document.getElementById('idomoo_download_link');
    dlLink.insertBefore(scr,dlLink.childNodes[0]);

    console.log(scr);
  }

  isframeLoaded() {
  	setTimeout(()=>{
  		console.log("isframeLoaded");
  	},500);
  }

  toggleView(){
  	this.expanded = !this.expanded;
  }

  dL(){
  	
  }

}
