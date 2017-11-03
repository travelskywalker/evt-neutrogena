import { Component, Input, Renderer2, ElementRef, AfterViewInit } from '@angular/core';


/**
 * Generated class for the NoticeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notice',
  templateUrl: 'notice.html'
})
export class NoticeComponent {

	@Input("title") title?: string = "";
	@Input("class") class ?: any;
  style: any;
	//@ViewChild(this) content ?: NoticeComponent;
  constructor(private render: Renderer2, public element:ElementRef) {
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    if(this.class == "pink"){
      this.style = {'color':'#fff','font-size':'15px','line-height':'20px','background-color':'rgb(240,115,172)','text-align':'center'};
    }
    else{
      this.style = {'color':'#fff','font-size':'13px','line-height':'20px','background-color':'rgb(69,69,69)'};
    }
  }

  destroy(){
  	console.log(this.element.nativeElement);
  	this.render.setStyle(this.element.nativeElement,"display","none");
  	//this.content.setElementStyle("display","none");
  }

}
