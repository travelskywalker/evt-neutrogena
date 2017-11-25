import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import {DomSanitizer} from '@angular/platform-browser';

import { aura } from "../../assets/aura/config/aura.config";

import { AppProvider } from "../../providers/app/app"

import { AuraMainPage } from "../aura-main/aura-main";
import { ProgressModalComponent } from "../../components/progress-modal/progress-modal";
/**
 * Generated class for the AuraContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aura-content',
  templateUrl: 'aura-content.html',
})
export class AuraContentPage{

	@ViewChild('aura') auraComponent : ElementRef;
	@ViewChild(Content) content: Content;
	auraLoc = aura;
  lessonTimer?: any;
	module :{title?:string,description?:string,link?:any,id?:any,course?:any, day?:any, author?: any} = {
			title:"Morning Meditations",
			description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut blandit mi. Proin condimentum dolor vitae porttitor imperdiet. Cras erat ipsum, cursus feugiat ligula ac, posuere placerat elit. Nunc volutpat sollicitudin imperdiet. Maecenas lobortis quis sapien vel porta. Aenean cursus felis et tortor volutpat consectetur. Duis in condimentum ante, id viverra justo.ips`,
      id:'h1',
			link:this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/10%20Mindful%20Breaths.html"),
      author: 'AURA'
		};
	auraRef : any;
	auraSelect: any;
  listener: any;
	@ViewChild(ProgressModalComponent) pmc : ProgressModalComponent;
  message:any;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public app: AppProvider,
              private sanitizer: DomSanitizer) {

  	let data = this.navParams.get('data');

      	/* If there are no data in navparams *
  	 * redirect to main page			 */
  	if(typeof data == "undefined"){
  		this.navCtrl.setRoot(AuraMainPage);
  	}else{
  		/* set the content details */
      console.log(data);
	  	this.module.title = data.title;
	  	this.module.description = data.desc;
      this.module.id = data.id;
      this.module.course = data.course;
      this.module.day = data.day;
      this.module.author = data.author;
	  	this.module.link = this.sanitizer.bypassSecurityTrustResourceUrl("../assets/aura/Neutrogena_widgets/"+encodeURIComponent(data.path));
  	}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuraContentPage');
    this.app.startCourse(this.module);
  }

  loadScript(url,contentId) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.setAttribute('id','aura-widget');
    node.setAttribute('data-content-id',contentId);

    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('page-aura-content')[0].appendChild(node);

  }

  isframeLoaded() {
    console.log("isframeLoaded")
  }
  //ngAfterViewInit(){
  ionViewWillEnter() {
    let self = this;
    self.pmc.toggleView(false, this.module);

    // this.loadScript('../assets/scripts/widget.js',this.module.id);
  	/* check if iframe has loaded */
  	document.getElementById("aura-widget-div").onload = function(e){
  		let fp = <HTMLIFrameElement> e.srcElement;
  		let frm : HTMLBodyElement = fp.contentWindow.document.getElementsByTagName('body')[0];
  		frm.style.maxHeight = "100%";	// assign max height
  		frm.style.margin = "0px";		// and margin css details

  		let auraWidget = <HTMLDivElement> fp.contentWindow.document.getElementById('aura-widget-div');
  		auraWidget.style.maxHeight = "100%";
  		auraWidget.style.height = "100%";

      // fp.contentWindow.document.getElementById('aura-widget-div')
  		/* TO DO: Add listener to aura player to track	*
  		 * play, pause, and audio completion			*/

       let handler = function(e){
         let playBtn = fp.contentWindow.document.querySelector('div.audio.play');

         if (typeof self.listener == 'undefined') {
           console.log('playBtn', playBtn);
           playBtn.addEventListener('click',function(e){
             self.listener = e;
             let ifStartPlay = fp.contentWindow.document.getElementById('play-btn').classList.contains('fa-play');
             let ifStartPlayClassList = fp.contentWindow.document.getElementById('play-btn').classList;
             console.log('ifStartPlay', ifStartPlay);
             self.controlButtons(ifStartPlayClassList);
           });
         }
         auraWidget.removeEventListener('DOMSubtreeModified', this, true);
       }
       auraWidget.addEventListener('DOMSubtreeModified',handler,true);
  	}

  }

  controlButtons(ifStartPlayClassList?: any){
    this.app.playLesson(this.module, this.pmc, ifStartPlayClassList);
  }

  RemoveJsCss(filename, filetype){
      var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
      var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
      var allsuspects=document.getElementsByTagName(targetelement)
      for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
          allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
      }
  }


}
