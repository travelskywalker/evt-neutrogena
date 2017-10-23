import { NgModule } from '@angular/core';
import { ScanComponent } from './scan/scan';
import { SideMenuComponentModule } from './side-menu/side-menu.module';
import { NoticeComponentModule } from './notice/notice.module';
import { FooterComponentModule } from './footer/footer.module';
@NgModule({
	declarations: [ScanComponent,],
	imports: [SideMenuComponentModule],
	exports: [ScanComponent,
    SideMenuComponentModule,
    NoticeComponentModule,
    FooterComponentModule,]
})
export class ComponentsModule {}
