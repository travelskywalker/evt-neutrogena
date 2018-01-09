import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, ModalOptions } from 'ionic-angular';
import { VideoModalPage } from '../video-modal/video-modal';
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

	expanded: boolean = false;
	def : string = "down";
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartGlowPage');
  }

  expand(){
  	this.expanded = !this.expanded;
  	if(this.expanded) this.def = "up";
  	else this.def = "down";
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

}
