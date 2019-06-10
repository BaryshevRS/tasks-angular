import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import {TabTitleComponent} from '../tab-title/tab-title.component';
import {TabContentComponent} from '../tab-content/tab-content.component';
import {TabsService} from "../tabs.service";

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, AfterContentInit {

  static tabIndex = -1;

  constructor(private tabsService: TabsService, private ref: ChangeDetectorRef) {
  }

  @ContentChild(TabTitleComponent) tabTitleComponent: TabTitleComponent;
  @ContentChild(TabContentComponent) tabContentComponent: TabContentComponent;

  ngOnInit() {
    TabComponent.tabIndex++;
  }

  staticTabIndex() {
    return TabComponent.tabIndex;
  }

  ngAfterContentInit() {

    this.tabTitleComponent.tabIndex = TabComponent.tabIndex;
    this.tabContentComponent.tabIndex = TabComponent.tabIndex;

    if (!this.tabTitleComponent.activeTab && TabComponent.tabIndex === 0) {
      this.tabsService.setTabIndex();
    }
  }

  ngOnDestroy(): void {

    if (this.tabTitleComponent.activeTab) {
      this.tabsService.setTabIndex();
    }

    TabComponent.tabIndex--;
  }


}
