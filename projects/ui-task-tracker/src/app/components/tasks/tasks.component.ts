import { Component, OnInit, ViewChild } from '@angular/core';
import { PRIORITY } from '../settings/const';
import { Store } from '@ngrx/store';
import { StateTask } from '../../stores/reducers/tasks.reducer';
import { GetTasks } from '../../stores/actions/tasks.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public priority: Array<string>;

  constructor(
    private store$: Store<StateTask>
  ) {
    this.priority = PRIORITY;
  }

  ngOnInit(): void {
    console.log('dispatch GetTasks');
    this.store$.dispatch(new GetTasks());
  }

}

