import { NgModule } from '@angular/core';
import { ScanComponent } from './scan/scan';
import { LogoComponentModule } from './logo/logo.module';

import { SideMenuComponentModule } from './side-menu/side-menu.module';
import { NoticeComponentModule } from './notice/notice.module';
import { FooterComponentModule } from './footer/footer.module';
import { SubCourseComponentModule } from './sub-course/sub-course.module';
import { AuraHeadComponentModule } from './aura-head/aura-head.module';
import { AuraFootComponentModule } from './aura-foot/aura-foot.module';
@NgModule({
	declarations: [ScanComponent,],
	imports: [SideMenuComponentModule],
	exports: [ScanComponent,
    SideMenuComponentModule,
    NoticeComponentModule,
    FooterComponentModule,
    SubCourseComponentModule,
    AuraHeadComponentModule,
    AuraFootComponentModule,
    LogoComponentModule]
})
export class ComponentsModule {}
