import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { select, Store } from '@ngrx/store';
import { selectCurrentTask, selectViewTask } from '../../../stores/selectors/tasks.selector';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { Observable } from 'rxjs';
import { Settings } from '../../settings/models/settings.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public task: Observable<Task>;
  public viewTask: Observable<boolean>;
  public settings: Observable<Settings>;

  constructor(
    private store$: Store<StateTasks>
  ) {
  }

  ngOnInit() {
    this.viewTask = this.store$.pipe(select(selectViewTask)) as Observable<boolean>;
    this.task = this.store$.pipe(select(selectCurrentTask)) as Observable<Task>;
    this.settings = this.store$.pipe(select('settings'));
  }

}
