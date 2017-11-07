import {NgModule} from '@angular/core';
import {AuraHeadComponent} from "./aura-head";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        AuraHeadComponent
    ],
    exports: [
        AuraHeadComponent
    ]
})
export class AuraHeadComponentModule {

}
