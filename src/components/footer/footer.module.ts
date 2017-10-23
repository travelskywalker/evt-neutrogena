import {NgModule} from '@angular/core';
import {FooterComponent} from "./footer";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ]
})
export class FooterComponentModule {

}
