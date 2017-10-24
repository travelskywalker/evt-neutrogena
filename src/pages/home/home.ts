import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppProvider, EvtProvider} from '../../providers/providers';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	links: any = [];
  constructor(public navCtrl: NavController, public appProvider: AppProvider, public evtProvider: EvtProvider, private navParams : NavParams, private auth0: AuthService) {
    console.log(appProvider,evtProvider);
    this.auth0.setEVTInfo();
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
