import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { selectAllTasks } from '../../../stores/selectors/tasks.selector';
import { takeUntil } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks-toolbar',
  templateUrl: './tasks-toolbar.component.html',
  styleUrls: ['./tasks-toolbar.component.scss']
})
export class TasksToolbarComponent implements OnInit {

  public colorButton = 'left';

  private unsubscribe$ = new Subject<void>();

  public settings;

  constructor(
    private store$: Store<StateTasks>,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    if (this.router.url.includes('/scrum')) {
      this.colorButton = 'right';
    }

    this.settings = this.store$.pipe(select('settings'));

    //     .pipe(takeUntil(this.unsubscribe$))
    //     .subscribe((settings) => {
    //       console.log('TasksToolbarComponent', settings);
    //
    //     });
    // }

    // ngOnDestroy(): void {
    //   this.unsubscribe$.next();
    //   this.unsubscribe$.complete();
    // }

  }

  trackByFn(index, item) {
    // console.log('item', item);
    return item.key; // unique id corresponding to the item
  }

}
