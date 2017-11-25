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

  @Input('day') day ?: number;
  @Input('course') course?: string;
  @Input('length') length ?: number = 10;
  @Input('show') show ?: boolean = false;
  constructor(private nav: NavController, private render: Renderer2,
              private elem:ElementRef, private app: AppProvider) {
  }

  ngOnInit(){

    this.length = this.app.getCourseDuration(this.course);
  	console.log("progress set" , this.day, this.length);

  }

  toHome(course?: string){

    this.app.clearLocalHistory();
    this.app.setActiveCourse(course);
    this.nav.setRoot(AuraMainPage, {reload: true, lastplayed: course});

  }

/* toggle visibility of this component */
  toggleView(stat: boolean = !this.show, course?: any){

  	this.show = stat;

    //this.course = course.course;
    //let progCnt = this.app.getCourseProgress(this.course);
    //this.day = progCnt > 0 && progCnt == this.day ? progCnt+1 : this.day;

  	if(!this.show){
  		this.render.setStyle(this.elem.nativeElement,"display","none");
  	}else{

  		this.render.setStyle(this.elem.nativeElement,"display","block");
  	}
  }


}
