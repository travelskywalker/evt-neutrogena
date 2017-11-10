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
  @Input('show') show ?: boolean = false;
  style: any;
	//@ViewChild(this) content ?: NoticeComponent;
  constructor(private render: Renderer2, public elem:ElementRef) {
  }

  ngOnInit(){
    if(this.class == "pink"){
      this.style = {'color':'#fff','font-size':'15px','line-height':'20px','background-color':'rgb(240,115,172)','text-align':'center'};
    }
    else{
      this.style = {'color':'#fff','font-size':'13px','line-height':'20px','background-color':'rgb(69,69,69)'};
    }
  }

  ngAfterViewInit(){

  }
  toggleView(stat: boolean = !this.show){
    this.show = stat;

    if(!this.show){
      this.render.setStyle(this.elem.nativeElement,"display","none");
    }else{
      this.render.setStyle(this.elem.nativeElement,"display","block");
    }
  }

  destroy(){
  	console.log(this.elem.nativeElement);
  	this.render.setStyle(this.elem.nativeElement,"display","none");
  	//this.content.setElementStyle("display","none");
  }

}
