import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';
import { VideoModalPage } from '../video-modal/video-modal';
import { LoginPage } from '../login/login';

import { CalendarComponent } from "../../components/calendar/calendar";
import { ImageTrackerComponent } from "../../components/image-tracker/image-tracker";
import { VideoPreviewComponent } from "../../components/video-preview/video-preview";

import { AuthService } from "../../providers/auth/auth.service";
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
	expanded: boolean = false;
	def : string = "down";
  	photoCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private auth0: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartGlowPage');
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
  }

  openModal(){

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
  	if($event && this.photoCount > 1){
  		this.vp.expanded = false;
  		this.vp.resetPlayer();
  	}
  	
  }

}
