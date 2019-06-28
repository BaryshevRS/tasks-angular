import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetTasks } from '../../../stores/actions/tasks.actions';
import { Store } from '@ngrx/store';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { Task } from '../models/task.model';
import { LoadInits } from "../../../stores/actions/inits.actions";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TasksResolver implements Resolve<boolean> {
  constructor(
    private store$: Store<StateTasks>
  ) { }

  resolve(): Observable<boolean> {
    this.store$.dispatch(new LoadInits());
    return of(true);
  }
}
