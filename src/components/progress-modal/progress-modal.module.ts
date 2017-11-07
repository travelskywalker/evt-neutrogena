import {NgModule} from '@angular/core';
import {ProgressModalComponent} from "./progress-modal";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        ProgressModalComponent
    ],
    exports: [
        ProgressModalComponent
    ]
})
export class ProgressModalComponentModule {

}
