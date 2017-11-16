import { Component, Input, Renderer2, ElementRef } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { EvtProvider } from "../../providers/evt/evt";
import { AppProvider } from "../../providers/app/app";
import { Config } from "../../config/environment.dev";
//import { NoticeComponent } from "../notice/notice";
/**
 * Generated class for the ReorderModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'reorder-modal',
  templateUrl: 'reorder-modal.html'
})
export class ReorderModalComponent {

  reorder_links: Array<any> = Config.reorder_links;
  @Input('show') show ?: boolean = true;

  constructor(private render: Renderer2, private elem:ElementRef, private evt: EvtProvider, private app: AppProvider) {

  }

  ngAfterViewInit(){
    this.app.reorderViewManager = this;
  }

  reorder(r) {
    this.toggleView();
    this.evt.createThngAction('_Reorder', {
      "customFields": {
        "retailer": r.name,
        "link": r.link
      }
    })
    window.open(r.link, '_blank');
  }

  toggleView(stat?: boolean){
    console.log('toggleView:' + this.show);

    if (typeof stat != 'undefined') {
      this.show = stat;
    }
    if(!this.show || typeof this.show == 'undefined'){
      this.show = true;
      this.render.setStyle(this.elem.nativeElement,"display","none");
    }else{
      this.show = false;
      this.render.setStyle(this.elem.nativeElement,"display","inline-block");
    }

    if (typeof this.app.noticeViewManager != 'undefined') {
      this.app.noticeViewManager.toggleView(false);
    }
  }
}
