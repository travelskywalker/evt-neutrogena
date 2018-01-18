import { Component , Renderer2, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the VideoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-modal',
  templateUrl: 'video-modal.html',
})
export class VideoModalPage {
  @ViewChild('vid') vid : ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public render: Renderer2) {
      this.render.addClass(viewCtrl.pageRef().nativeElement, 'custom-popup');
  }

  ngAfterViewInit(){
    //this.vid.nativeElement.play(); //autoplay;
    this.render.setProperty(this.vid.nativeElement,"autoplay",true);
    this.render.setProperty(this.vid.nativeElement,"loop",true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoModalPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }
}
