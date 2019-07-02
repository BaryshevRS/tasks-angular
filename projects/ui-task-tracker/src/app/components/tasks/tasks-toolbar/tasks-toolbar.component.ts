import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { Router } from '@angular/router';
import { FilterPriorityTasks, SetViewTasks } from '../../../stores/actions/tasks.actions';

@Component({
  selector: 'app-tasks-toolbar',
  templateUrl: './tasks-toolbar.component.html',
  styleUrls: ['./tasks-toolbar.component.scss']
})
export class TasksToolbarComponent implements OnInit {

  public colorButton = 'left';

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
  }

  changePriority(e = null) {
    this.store$.dispatch(new FilterPriorityTasks(e));
  }

  setView(view = false) {
    // viewScrum
    this.store$.dispatch(new SetViewTasks(view));
  }

  trackByFn(index, item) {
    return item.key;
  }

}
