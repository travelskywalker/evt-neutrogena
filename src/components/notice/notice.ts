import { Component, Input, Renderer2, ElementRef } from '@angular/core';


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
	@Input("style") style ?: any;
	//@ViewChild(this) content ?: NoticeComponent;
  constructor(private render: Renderer2, public element:ElementRef) {
  }

  ngOnInit(){
  }

  destroy(){
  	console.log(this.element.nativeElement);
  	this.render.setStyle(this.element.nativeElement,"display","none");
  	//this.content.setElementStyle("display","none");
  }

}
