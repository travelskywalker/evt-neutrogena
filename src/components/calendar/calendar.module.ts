import {NgModule} from '@angular/core';
import {CalendarComponent} from "./calendar";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule,
    ],
    declarations: [
        CalendarComponent,
    ],
    exports: [
        CalendarComponent
    ]
})
export class CalendarComponentModule {

}
