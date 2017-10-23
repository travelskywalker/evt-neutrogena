import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppProvider, EvtProvider } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	links: any = [];
  constructor(public navCtrl: NavController, public appProvider: AppProvider, public evtProvider: EvtProvider, private navParams : NavParams) {
    console.log(appProvider,evtProvider);
  }

  ngOnInit(){
    console.log(this.navParams.data);
  }

  scan(){
    this.evtProvider.scan().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    });
  }

}
