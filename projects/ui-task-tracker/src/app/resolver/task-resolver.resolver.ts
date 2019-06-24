import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { select, Store } from "@ngrx/store";
import { Task } from '../components/tasks/models/task.model';
import { StateTasks } from "../stores/reducers/tasks.reducer";
import { selectCurrentTask } from "../stores/selectors/tasks.selector";
import { map, take, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TaskResolver implements Resolve<Task> {
  constructor(
    private store$: Store<StateTasks>
  ) {
  }

  resolve(): Observable<Task> {




    return of(null);
    // return this.store$.pipe(select(selectCurrentTask)).pipe(
    //   take(1)
    // );
  }

}
