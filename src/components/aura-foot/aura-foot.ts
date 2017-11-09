import { Component } from '@angular/core';
import { NavController, ViewController,LoadingController,App } from "ionic-angular";

import { AuraMainPage } from "../../pages/aura-main/aura-main";
import { HomePage } from "../../pages/home/home";

import { EvtProvider } from "../../providers/evt/evt";
/**
 * Generated class for the AuraFootComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'aura-foot',
  templateUrl: 'aura-foot.html'
})
export class AuraFootComponent {

  text: string;

  /* This is the reorder link */
  ext_url ?: string = "//www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator";

  constructor(private app: App,private loader: LoadingController,private nav: NavController, private view: ViewController, private evt: EvtProvider) {
    console.log('Hello AuraFootComponent Component');
    this.text = 'Hello World';
  }

  toHome(){
    let currentView = this.view.component.name;
    if(currentView == 'AuraContentPage'){
      let load = this.loader.create({
          spinner: 'crescent',
          dismissOnPageChange: true,
          showBackdrop: true,
          content: `Please wait...`,
          enableBackdropDismiss:true});
        load.present();
      this.ClearPlayerResources().then((result) => {
        load.dismiss();
        // let EX = document.getElementsByTagName('head')[0];
        // var r = EX.getElementsByTagName('script');
        // console.log(r);
        //
        // r[0].remove();
        // r[11].remove();
        // r[12].remove();
        // for (var i = 0; i < r.length; i++) {
        //
        //     if(r[i].getAttribute('type') != 'text/javascript'){
        //
        //         // r[i].parentNode.removeChild(r[i]);
        //           r[i].remove();
        //     }
        //       // r[i].remove();
        // }


        if(result){
          this.nav.setRoot(AuraMainPage);
        }
        else{
          this.nav.setRoot(AuraMainPage);
        }

     });
    }
    else{
        this.nav.setRoot(AuraMainPage);
    }
    // let playBtn = document.getElementById('play-btn');
    //
    // if(playBtn){
    //   let load = this.loader.create({
    //     spinner: 'crescent',
    //     dismissOnPageChange: true,
    //     showBackdrop: true,
    //     content: `Please wait...`,
    //     enableBackdropDismiss:true});
    //   load.present();
    //   playBtn.click();
    //   let timer2 = setTimeout(() => {
    //
    //     this.nav.setRoot(AuraMainPage);
    //     load.dismiss();
    //       clearTimeout(timer2);
    //   }, 2000);
    //
    // }
    // else{
    //
    //   this.nav.setRoot(AuraMainPage);
    // }




  }

  ClearPlayerResources(){
    return new Promise((resolve) => {
        let playBtn = document.getElementById('play-btn');
          if(playBtn){
            if(playBtn.classList.contains('fa-pause')){
              playBtn.click();
            }

          }
          let timer2 = setTimeout(() => {
              resolve('B');
              clearTimeout(timer2);
          }, 2000);
   });
  }

  logAction(){
  	// TODO: this is a user action. Possible that we want to log
  	// the reorder action even if there are no users logged in
  	this.evt.createUserAction("_Reorder");
  }

}
