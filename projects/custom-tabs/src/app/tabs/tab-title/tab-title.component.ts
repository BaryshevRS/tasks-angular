import {AfterContentInit, Component, HostBinding, HostListener} from '@angular/core';
import {TabsService} from '../tabs.service';

const classActiveTab = 'tabs__title tabs__title--active';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css']
})
export class TabTitleComponent implements AfterContentInit  {

  constructor(private tabsService: TabsService) { }

  public tabIndex: number;

  @HostBinding ('class') activeTab = '';

  @HostListener ('click') initTab() {
    this.tabsService.setTabIndex(this.tabIndex); // set active tab
  }

  ngAfterContentInit() {
    this.tabsService.change.subscribe(tabIndex => {
      this.activeTab = tabIndex === this.tabIndex ? classActiveTab : '';
    });
  }
}
