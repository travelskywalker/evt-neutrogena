import {NgModule} from '@angular/core';
import {LogoComponent} from "./logo";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        LogoComponent
    ],
    exports: [
        LogoComponent
    ]
})
export class LogoComponentModule {

}
