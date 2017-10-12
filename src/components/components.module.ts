import { NgModule } from '@angular/core';
import { ScanComponent } from './scan/scan';
import { SideMenuComponentModule } from './side-menu/side-menu.module';
@NgModule({
	declarations: [ScanComponent],
	imports: [SideMenuComponentModule],
	exports: [ScanComponent,
    SideMenuComponentModule]
})
export class ComponentsModule {}
