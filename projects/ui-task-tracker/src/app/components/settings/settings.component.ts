import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { GetSettings } from "../../stores/actions/settings.actions";
import { selectAllTasks } from "../../stores/selectors/tasks.selector";
import { switchMap, takeUntil } from "rxjs/operators";
import { Task } from "../tasks/models/task.model";
import { Dictionary } from "@ngrx/entity";
import { of } from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
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

    this.settings = this.store$.pipe(select('settings')).pipe(
      // takeUntil(this.unsubscribe$),
      switchMap(
        (settings: any) => {
          console.log('settings', settings);
          return of(null);
        }
      )
    );
  }

}
