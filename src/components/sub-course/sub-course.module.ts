import {NgModule} from '@angular/core';
import {SubCourseComponent} from "./sub-course";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        SubCourseComponent
    ],
    exports: [
        SubCourseComponent
    ]
})
export class SubCourseComponentModule {

}
