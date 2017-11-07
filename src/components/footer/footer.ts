import { Component } from '@angular/core';

/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

	links: any = [];

 	constructor() {
 		console.log(this);
 	}

 	ngOnInit(){
		this.links = [
	  		{text:"Privacy Policy",href:"javascript:void()"},
	  		{text:"Cookie Policy",href:"javascript:void()"},
	  		{text:"Legal Notice",href:"javascript:void()"},
	  		{text:"Modern Slavery Act Statement",href:"javascript:void()"},
  		];
 	}

}
