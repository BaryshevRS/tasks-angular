import {AfterContentInit, Component, HostBinding, OnDestroy} from '@angular/core';
import {TabsService} from '../tabs.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements AfterContentInit, OnDestroy {

  public tabIndex: number;
  private subscription: Subscription;

  @HostBinding('hidden') hidden = true;

  constructor(private tabsService: TabsService) {
  }

  ngAfterContentInit() {

    this.subscription = this.tabsService.change.subscribe(tabIndex => {
      if (tabIndex === this.tabIndex) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
