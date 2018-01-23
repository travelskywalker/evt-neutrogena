import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { IdomooProvider } from '../../providers/idomoo/idomoo';
import { EvtProvider } from '../../providers/evt/evt';

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
  @ViewChild('xpand') xpand : ElementRef;

  constructor(public idomoo: IdomooProvider, public render: Renderer2, private sanitizer: DomSanitizer, private evt: EvtProvider) {
  }

  ngAfterViewInit(){
    this.assets['arr'] = "../assets/images/down-arrow.png";
    this.assets['link'] = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/images/Selflove.jpg");
    console.log(this.plyr.nativeElement.innerHTML);
  }

  isframeLoaded() {
  }

  toggleView(){
  	let self = this;
  	this.expanded = !this.expanded;
  	if(this.expanded){
  		self.evt.createThngAction('_PreviewVideo');
  		self.assets['vid'] = localStorage.vid;
  		this.idomoo.generateVid().then(res=>{
    		this.assets['link'] = this.sanitizer.bypassSecurityTrustResourceUrl("//idoplayer.idomoo.com/17//index.html?u="+localStorage.vid+"&ga_enable=null&autostart=1");
  			/*console.log(res);
			let scr : HTMLScriptElement = document.createElement('script');
			scr.type = "text/javascript";
			scr.id = "idomooScript";
			scr.src = "../assets/scripts/idomoo-player.js";

			let dlLink = document.getElementById('idomoo_download_link');
			self.render.appendChild(self.xpand.nativeElement,scr);*/
			//dlLink.insertBefore(scr,dlLink.childNodes[0]);
		});
  	}

  }

  unloadIdomooPlyr(){
  	let scr = document.getElementById('idomooScript');
  	console.log(scr);
  	if(scr){
  		this.render.removeChild(this.xpand.nativeElement,scr);
  		this.render.setProperty(this.plyr.nativeElement,'innerHTML','');
  	}
  }

  resetPlayer(){
  	//this.render.setProperty(this.plyr.nativeElement,'innerHTML',"");
  	this.assets['link'] = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/images/Selflove.jpg");
  }

  DL(){
  	this.evt.createThngAction('_DownloadVideo');	
  }

}
