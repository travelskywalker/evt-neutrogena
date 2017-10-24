import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { AppProvider, EvtProvider } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mobileVersion : any;
	links: any = [];
  constructor(public platform: Platform,
    public navCtrl: NavController,
    public appProvider: AppProvider,
    public evtProvider: EvtProvider,
    private navParams : NavParams) {
    console.log(appProvider,evtProvider);
  }

  ngOnInit(){
    // console.log(this.navParams.data);

    // console.log(this.platform.is('mobile'));

    this.mobileVersion = this.platform.is('mobile');

    console.log(this.mobileVersion);
  }

  scan(){
    this.evtProvider.scan().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    });
  }

}
