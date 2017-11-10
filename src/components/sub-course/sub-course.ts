import { Component, Input, Output, EventEmitter, Renderer2, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { NavController } from "ionic-angular";
import { AuthService } from "../../providers/auth/auth.service";
import { AppProvider } from "../../providers/app/app";

import { SignUpPage } from "../../pages/sign-up/sign-up";

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
  @Input('activeCourse') crs : any;
  //daysLength ?: number = 0;

  constructor(private auth0: AuthService, private appService: AppProvider, private render: Renderer2, private nav: NavController) {
  }

  begin(tes){
  	tes['progress'] = this.progress;
  	tes['title'] = this.title;
  	/* this assigns the progress and title 	*
  	 * to the top element 					*/
  	this.bgn.emit(tes);
  }

  ngOnInit(){
  	this.duration = Object.keys(this.crs).length;
  	this.bgImg = "../assets/aura/images/hero/"+this.title+".jpg";

  	/* THIS SHOULDNT BE RANDOM 				*
  	 * Once the progress tracking system 	*
  	 * has been implemented, fetch user 	*
  	 * progress and then assign here 		*/
  	if(this.auth0.loggedIn){
      if (typeof this.appService.getCurrentLesson() !== 'undefined') {
        this.progress = this.appService.getCurrentLesson();
      } else {
        this.progress = Math.round(Math.random()*this.duration);
      }

  	}else{
  		this.progress = 0;
  	}
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

  toSignUp(){
  	this.nav.push(SignUpPage);
  }

}
