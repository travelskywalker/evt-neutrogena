import { Component, Input } from '@angular/core';
import { NavController, ViewController,LoadingController } from "ionic-angular";

import { AuraMainPage } from "../../pages/aura-main/aura-main";

import { AppProvider } from "../../providers/app/app";
import { ReorderModalComponent } from "../../components/reorder-modal/reorder-modal";
import { Config } from "../../config/environment";
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

  @Input('reorder') reorder?: ReorderModalComponent;
  /* This is the reorder link */
  ext_url ?: string = "//www.neutrogena.co.uk/product/visibly-clear-light-therapy-acne-mask-activator";
  neutrogena_reorder_url = Config.neutrogena_reorder_url;
  constructor(private loader: LoadingController,
              private nav: NavController, private view: ViewController,
              private appState: AppProvider) {
    console.log('Hello AuraFootComponent Component');
  }

  /***
   * home btn tap handler
   */
  toHome(): void {
    if (typeof this.appState.noticeViewManager != 'undefined') {
      this.appState.noticeViewManager.toggleView(false);
    }
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

  /***
   * reorder btn tap handler
   */
  reorderAction(): void{
    this.reorder.toggleView();
  }

  logAction(): void {
    this.appState.evt.createUserAction('_Reorder', {}, !this.appState.hasLoggedIn());
  }

}
