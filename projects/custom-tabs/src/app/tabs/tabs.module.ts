import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs.component';
import {TabComponent} from './tab/tab.component';
import {TabTitleComponent} from './tab-title/tab-title.component';
import {TabContentComponent} from './tab-content/tab-content.component';
import {TabsService} from './tabs.service';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent
  ],
  exports: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TabsService
  ]
})
export class TabsModule {
}
