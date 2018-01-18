import {NgModule} from '@angular/core';
import {VideoPreviewComponent} from "./video-preview";
import {IonicModule} from "ionic-angular/index";

@NgModule({
    imports:[
        IonicModule
    ],
    declarations: [
        VideoPreviewComponent
    ],
    exports: [
        VideoPreviewComponent
    ]
})
export class VideoPreviewComponentModule {

}
