import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { select, Store } from "@ngrx/store";
import { selectCurrentTask } from "../../../stores/selectors/tasks.selector";
import { StateTask } from "../../../stores/reducers/tasks.reducer";
import { Observable } from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  private task: Observable<Task>;

  constructor(
    private store$: Store<StateTask>
  ) {
  }

  ngOnInit() {
    this.task = <Observable<Task>>this.store$.pipe(select(selectCurrentTask));
  }

}
