import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetTasks } from "../../../stores/actions/tasks.actions";
import { Store } from "@ngrx/store";
import { StateTasks } from "../../../stores/reducers/tasks.reducer";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TasksResolver implements Resolve<boolean> {
  constructor(
    private store$: Store<StateTasks>
  ) { }


  resolve(): Observable<boolean> {

    console.log('dispatch GetTasks');
    this.store$.dispatch(new GetTasks());

    return of(true);

  }
}
