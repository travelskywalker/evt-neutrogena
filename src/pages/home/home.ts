import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppProvider, EvtProvider } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public appProvider: AppProvider, public evtProvider: EvtProvider) {
    console.log(appProvider,evtProvider);
  }

}
