import { Component } from '@angular/core';
import { Config } from "../../config/environment";
import { DomSanitizer} from '@angular/platform-browser';

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

 	constructor(private dom:DomSanitizer) {
 		console.log(this);
 	}

 	ngOnInit(){
		this.links = [
	  		{
	  			text:"Privacy Policy",
	  			href:this.dom.bypassSecurityTrustResourceUrl(Config.ext_links.privacyPolicy)
	  		},
	  		{
	  			text:"Cookie Policy",
	  			href:this.dom.bypassSecurityTrustResourceUrl(Config.ext_links.cookiePolicy)
	  		},
	  		{
	  			text:"Legal Notice",
	  			href:this.dom.bypassSecurityTrustResourceUrl(Config.ext_links.legalNotice)
	  		},
	  		{
	  			text:"Modern Slavery Act Statement",
	  			href:this.dom.bypassSecurityTrustResourceUrl(Config.ext_links.slaveryAct)
	  		},
  		];
 	}

}
