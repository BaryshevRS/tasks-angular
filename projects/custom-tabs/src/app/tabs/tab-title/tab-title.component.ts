import {AfterContentInit, Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {TabsService} from '../tabs.service';
import {Subscription} from 'rxjs';

const classActiveTab = 'tabs__title tabs__title--active';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css']
})
export class TabTitleComponent implements AfterContentInit, OnDestroy {

  private subscription: Subscription;
  public tabIndex: number;

  constructor(private tabsService: TabsService) {
  }

  @HostBinding('class') activeTab = '';

  @HostListener('click') initTab() {
    this.tabsService.setTabIndex(this.tabIndex); // set active tab
  }

  ngAfterContentInit() {
    this.subscription = this.tabsService.change.subscribe(tabIndex => {
      this.activeTab = tabIndex === this.tabIndex ? classActiveTab : '';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
