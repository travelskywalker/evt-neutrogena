import { Component, Input, Renderer2, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuraMainPage } from "../../pages/aura-main/aura-main";
import { AppProvider } from "../../providers/app/app";

/**
 * Generated class for the ProgressModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-modal',
  templateUrl: 'progress-modal.html'
})
export class ProgressModalComponent {

  @Input('day') day ?: number = 1;
  @Input('length') length ?: number = 10;
  @Input('show') show ?: boolean = false;
  constructor(private nav: NavController, private render: Renderer2,
              private elem:ElementRef, private app: AppProvider) {
  }

  ngOnInit(){
  	console.log(this);
  }

  toHome(){
  	this.nav.setRoot(AuraMainPage);
  }

/* toggle visibility of this component */
  toggleView(stat: boolean = !this.show, course?: any){
    this.day = this.app.getCourseProgress(course);
    this.length = this.app.getCourseDuration(course);
  	this.show = stat;

  	if(!this.show){
  		this.render.setStyle(this.elem.nativeElement,"display","none");
  	}else{
  		this.render.setStyle(this.elem.nativeElement,"display","block");
  	}
  }


}
