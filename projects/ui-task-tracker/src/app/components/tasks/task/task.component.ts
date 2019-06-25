import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { select, Store } from '@ngrx/store';
import { selectCurrentTask } from '../../../stores/selectors/tasks.selector';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { Observable } from 'rxjs';
import { Settings } from '../../settings/models/settings.model';
import { StateSettings } from '../../../stores/reducers/settings.reducer';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  private task: Observable<Task>;
  private settings: Observable<Settings>;

  constructor(
    private store$: Store<StateTasks>
  ) {
  }

  ngOnInit() {
    this.task = this.store$.pipe(select(selectCurrentTask)) as Observable<Task>;
    this.settings = this.store$.pipe(select('settings'));
  }

}
