import { NgModule } from '@angular/core';
import { ScanComponent } from './scan/scan';
import { LogoComponentModule } from './logo/logo.module';
@NgModule({
	declarations: [
				ScanComponent
				],
	imports: [],
	exports: [
			ScanComponent,
			LogoComponentModule
			]
})
export class ComponentsModule {}
