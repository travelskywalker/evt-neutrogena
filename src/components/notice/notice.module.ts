import {NgModule} from '@angular/core';
import {NoticeComponent} from "./notice";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        NoticeComponent
    ],
    exports: [
        NoticeComponent
    ]
})
export class NoticeComponentModule {

}
