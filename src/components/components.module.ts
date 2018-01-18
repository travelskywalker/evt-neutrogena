import { NgModule } from '@angular/core';
import { ScanComponent } from './scan/scan';

import { SideMenuComponentModule } from './side-menu/side-menu.module';
import { NoticeComponentModule } from './notice/notice.module';
import { FooterComponentModule } from './footer/footer.module';
import { SubCourseComponentModule } from './sub-course/sub-course.module';
import { AuraHeadComponentModule } from './aura-head/aura-head.module';
import { AuraFootComponentModule } from './aura-foot/aura-foot.module';
import { ProgressModalComponentModule } from './progress-modal/progress-modal.module';
import { ReorderModalComponentModule } from './reorder-modal/reorder-modal.module';
import { CalendarComponentModule } from './calendar/calendar.module';
import { ImageTrackerComponentModule } from './image-tracker/image-tracker.module';
import { VideoPreviewComponentModule } from './video-preview/video-preview.module';
@NgModule({
	declarations: [ScanComponent,
    ],
	imports: [SideMenuComponentModule],
	exports: [ScanComponent,
    SideMenuComponentModule,
    NoticeComponentModule,
    FooterComponentModule,
    SubCourseComponentModule,
    AuraHeadComponentModule,
    AuraFootComponentModule,
    ProgressModalComponentModule,
    ReorderModalComponentModule,
    CalendarComponentModule,
    ImageTrackerComponentModule,
    VideoPreviewComponentModule,
  ]
})
export class ComponentsModule {}
