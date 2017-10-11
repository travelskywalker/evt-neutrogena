import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppProvider, EvtProvider } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	links: any = [];
  constructor(public navCtrl: NavController, public appProvider: AppProvider, public evtProvider: EvtProvider) {
    console.log(appProvider,evtProvider);
  }

  ngOnInit(){
  	this.links = [
  					{text:"Privacy Policy",href:"javascript:void()"},
  					{text:"Cookie Policy",href:"javascript:void()"},
  					{text:"Legal Notice",href:"javascript:void()"},
  					{text:"Modern Slavery Act Statement",href:"javascript:void()"},
  					];
  }

}
