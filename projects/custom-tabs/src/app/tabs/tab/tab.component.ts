import {
  AfterContentInit,
  Component,
  ContentChild,
  OnDestroy
} from '@angular/core';
import {TabTitleComponent} from '../tab-title/tab-title.component';
import {TabContentComponent} from '../tab-content/tab-content.component';
import {TabsService} from '../tabs.service';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements AfterContentInit, OnDestroy {

  @ContentChild(TabTitleComponent) tabTitleComponent: TabTitleComponent;
  @ContentChild(TabContentComponent) tabContentComponent: TabContentComponent;

  private tabIndex: number;

  constructor(private tabsService: TabsService) {
    this.tabIndex = ++tabsService.tabIndex;
  }

  ngAfterContentInit() {

    // set tab index for child component
    this.tabTitleComponent.tabIndex = this.tabIndex;
    this.tabContentComponent.tabIndex = this.tabIndex;

    if (!this.tabTitleComponent.activeTab) {
      this.tabsService.setTabIndex();
    }

  }

  ngOnDestroy(): void {

    // if select active tab, then set first tab
    if (this.tabTitleComponent.activeTab) {
      this.tabsService.setTabIndex();
    }

    --this.tabIndex;
    this.tabsService.tabIndex = this.tabIndex;
  }

}
