import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  panelOpenState = false;
  settings;

  constructor(
    private store$: Store<any>
  ) {
  }

  ngOnInit() {
    // console.log('settings');
    // this.store$.dispatch(new GetSettings());

    this.settings = this.store$.pipe(select('settings'))

    // this.settings = this.store$.pipe(select('settings')).pipe(
    //   // takeUntil(this.unsubscribe$),
    //   switchMap(
    //     (settings: any) => {
    //       console.log('settings', settings);
    //       return of(null);
    //     }
    //   )
    // );
  }

  trackByFn(index, item) {
    // console.log('item', item);
    return item.key; // unique id corresponding to the item
  }

}
