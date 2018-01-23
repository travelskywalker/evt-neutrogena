import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';
import { VideoModalPage } from '../video-modal/video-modal';
import { LoginPage } from '../login/login';

import { CalendarComponent } from "../../components/calendar/calendar";
import { ImageTrackerComponent } from "../../components/image-tracker/image-tracker";
import { VideoPreviewComponent } from "../../components/video-preview/video-preview";
import { ProgressModalComponent } from "../../components/progress-modal/progress-modal";

import { AuthService } from "../../providers/auth/auth.service";
import { EvtProvider } from "../../providers/evt/evt";
/**
 * Generated class for the ChartGlowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart-glow',
  templateUrl: 'chart-glow.html',
})
export class ChartGlowPage {

	@ViewChild(CalendarComponent) cal: CalendarComponent;
	@ViewChild(ImageTrackerComponent) imt: ImageTrackerComponent;
	@ViewChild(VideoPreviewComponent) vp: VideoPreviewComponent;
	@ViewChild(ProgressModalComponent) pmc: ProgressModalComponent;
	expanded: boolean = false;
	def : string = "down";
  	photoCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private auth0: AuthService, private evt: EvtProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartGlowPage');
  }

  ionViewWillLeave(){
  	console.log('ionViewWillLeave');
  	this.vp.unloadIdomooPlyr();
  }

  expand(){
  	this.expanded = !this.expanded;
  	if(this.expanded) this.def = "up";
  	else this.def = "down";
  }

  isLogged():boolean{
  	return this.auth0.loggedIn();
  }

  ngAfterViewInit(){
  	console.log(this.cal);
  	this.photoCount = this.imt.getPhotoCount();
    this.pmc.toggleView(false);
  }

  openModal(){
  	this.evt.createThngAction('_PreviewInstructions');
    const videoModalOptions : ModalOptions = {
      showBackdrop:true,
      enableBackdropDismiss:true
    };

    const   videoData = { 'foo': 'bar' };


    let viewModal = this.modalCtrl.create(VideoModalPage, {data : videoData}, videoModalOptions);
    viewModal.present();
    console.log("openModal");
  }


  toSignup() {
    this.navCtrl.push(LoginPage);
  }

  updateCalendar($event){
  	console.log($event);
  	this.cal.fetchCYGfromStorage();
  	this.cal.buildCalendarHist();
  	this.photoCount = this.imt.getPhotoCount();

  	if($event){
  		this.pmc.toggleView(true);

  		if(this.photoCount > 2){

	  		this.vp.expanded = false;
	  		this.vp.resetPlayer();
  		}

  	}
  	
  }

}
