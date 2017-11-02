import {NgModule} from '@angular/core';
import {AuraFootComponent} from "./aura-foot";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        AuraFootComponent
    ],
    exports: [
        AuraFootComponent
    ]
})
export class AuraFootComponentModule {

}
