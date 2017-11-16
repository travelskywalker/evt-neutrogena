import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EvtProvider } from '../../providers/evt/evt';
import { AppProvider } from '../../providers/app/app';
import { HomePage } from '../../pages/home/home';
import { AgeGatePage } from '../../pages/age-gate/age-gate';

/**
 * Native QR scan handler / redirector
 *
 */
@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})

export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private evt: EvtProvider, private app: AppProvider, private loader: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  ionViewWillEnter() {
    console.log("ngOnInit ScanPage");
    let load = this.loader.create({
        spinner: 'crescent',
        dismissOnPageChange: true,
        showBackdrop: true,
        content: `Please wait...`,
        enableBackdropDismiss: false
      });
      load.present();

    let thng = this.navParams.get("thng");

    this.evt.createAppUser(!this.app.hasLoggedIn()).then(usr=>{

      this.evt.getThngContextById(thng, !this.app.hasLoggedIn()).then((thng)=>{

        this.app.saveThngContext(thng);
        load.dismiss();
        this.navCtrl.setRoot(AgeGatePage);

      }).catch(err=>{

        load.dismiss();

        console.log("no thng like that", err);
        this.navCtrl.setRoot(HomePage);

      });
    });
  }
}
