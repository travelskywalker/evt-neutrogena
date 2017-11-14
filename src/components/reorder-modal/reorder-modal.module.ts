import {NgModule} from '@angular/core';
import {ReorderModalComponent} from "./reorder-modal";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
      ReorderModalComponent
    ],
    exports: [
      ReorderModalComponent
    ]
})
export class ReorderModalComponentModule {

}
