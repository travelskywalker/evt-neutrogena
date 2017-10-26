import { Component, Input, Output, EventEmitter, Renderer2, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { AuthService } from "../../providers/auth/auth.service";

/**
 * Generated class for the SubCourseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sub-course',
  templateUrl: 'sub-course.html'
})
export class SubCourseComponent {
  @Input('bgImg') bgImg ?: string = "../assets/images/courseImage.png";
  @Input('title') title ?: string = "Sleep well";
  @Input('duration') duration ?: number = 30;
  @Input('enabled') enabled ?: boolean = false;
  @Input('progress') progress ?: number = 0;
  @ViewChild('prog') prog : ElementRef;
  @Output('begin') bgn = new EventEmitter;


  constructor(private auth0: AuthService, private render: Renderer2) {
  }

  begin($event){
  	this.bgn.emit($event);
  }

  ngAfterViewInit(){
  	let self = this;
  	if(this.loggedIn()){
  		self.render.setStyle(self.prog.nativeElement,"width",self.getProg()+"%");
  	}
  }

  loggedIn() : boolean{
    return this.auth0.loggedIn();
  }

  getProg(){
  	return Math.round((this.progress*100) / this.duration);
  }

}
