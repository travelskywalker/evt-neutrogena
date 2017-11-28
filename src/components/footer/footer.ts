import { Component } from '@angular/core';
import { Config } from "../../config/environment";
import { DomSanitizer} from '@angular/platform-browser';
import { AppProvider } from "../../providers/app/app";
import { Platform } from 'ionic-angular';
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
	mobileVersion : boolean;
 	constructor(private dom:DomSanitizer, public app: AppProvider, public platform: Platform,) {
 		console.log(this);
		this.mobileVersion = this.platform.is('mobile');
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
