import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IfViewportSizeDirective} from './if-viewport-size.directive';
import {ViewportSizeService} from './viewport-size.service';
import IConfig from './interface/config';

@NgModule({
  declarations: [IfViewportSizeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    IfViewportSizeDirective
  ]
})
export class ViewportSizeModule {
  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: ViewportSizeModule,
      providers: [{
        provide: ViewportSizeService, useFactory() {
          return new ViewportSizeService(config);
        }
      }]
    };
  }
}
