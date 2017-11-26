import { Component, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';

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
  @Input('hero') hero ?: string;
  @Input('duration') duration ?: number = 30;
  @Input('enabled') enabled ?: boolean = false;
  @Input('progress') progress ?: number;
  @ViewChild('prog') prog : ElementRef;
  @ViewChild('courseElem') courseElem : ElementRef;
  @Output('begin') bgn = new EventEmitter;
  @Input('activeCourse') crs : any;

  //daysLength ?: number = 0;

  constructor(private auth0: AuthService, private appService: AppProvider, private render: Renderer2, private nav: NavController) {
  }

  begin(tes){
  	tes['progress'] = this.progress;
  	tes['title'] = this.title;
  	/* this assigns the progress and title 	*
  	 * to the top element */
    let courseElem = this.courseElem.nativeElement.parentElement.parentElement.parentElement;
    this.hideCourse(courseElem);
  	this.bgn.emit(tes);
  }

  hideCourse(elem?: ElementRef) {

    this.render.setStyle(elem, "display", "none");
    if (typeof this.appService.hiddenPar != 'undefined') {
      //only one hidden at a given time.
      this.render.setStyle(this.appService.hiddenPar, "display", "block");
    }
    this.appService.hiddenPar = elem;

  }


  ngOnInit(){
  	this.duration = Object.keys(this.crs).length;
  	this.bgImg = "../assets/aura/images/hero/"+this.title+".jpg";

  	if(this.auth0.loggedIn()){
      if (typeof this.progress == 'undefined') {
        //fallback only, progress data is already bound on the component selector see aura-main.html
        this.progress = Math.round(Math.random()*this.duration);
      }
  	}

  }

  ngAfterViewInit(){
  	//let self = this;
    //this.render.setStyle(this.prog.nativeElement,"width",this.getProg()+"%");

    if (typeof this.appService.activeCourse != 'undefined'
      && typeof this.prog != 'undefined'
      && this.appService.activeCourse[1].course == this.title) {

      let courseElem = this.courseElem.nativeElement.parentElement.parentElement.parentElement;
      this.hideCourse(courseElem) ;

    } else {

      if (this.title === 'Mindfulness' || this.hero === this.title) {

        let courseElem = this.courseElem.nativeElement.parentElement.parentElement.parentElement;
        this.hideCourse(courseElem) ;

      }

    }
  }

  loggedIn() : boolean{
    return this.auth0.loggedIn();
  }

  getProg(){
  	return Math.round((this.progress*100) / this.duration);
  }

  getProgPct() {
    return this.getProg() + '%';
  }

  toSignUp(){
  	this.nav.push(SignUpPage);
  }

  getProgLabel() {

    if (this.getProg() == 0) {
      return "Begin";
    } else {
      if (this.progress != this.duration) {
        return "Continue"
      } else {
        return "Complete"
      }

    }
  }
}
