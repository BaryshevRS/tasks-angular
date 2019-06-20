import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorTasks, GetTask, LoadTask, LoadTasks, TasksActionTypes } from "../actions/tasks.actions";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { TasksService } from "../../components/tasks/services/tasks.service";
import { Task } from "../../components/tasks/models/task.model";
import { Store } from "@ngrx/store";
import { State as tasksState } from "../reducers/tasks.reducer";
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { selectCurrentTask } from "../selectors/tasks.selector";

// import { selectRouteParams } from "../reducers/tasks.reducer";

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private store$: Store<any>
  ) {
  }

  /*
  * Select all task from db
  * */
  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(TasksActionTypes.GetTasks),
    switchMap(() => {
        return this.tasksService.readTask().pipe(
          map((tasks: Task[]) => new LoadTasks(tasks)),
          catchError(error => of(new ErrorTasks(error)))
        )
      }
    )
  );

  /*
  * Select route for page task and set current task id in store.
  * */
  @Effect()
  getTask$ = this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
    filter((action: RouterNavigationAction) => {
      return action.payload.routerState.root.firstChild.routeConfig.path === 'tasks/:id';
    }),
    map((action: RouterNavigationAction) => {
      const id = action.payload.routerState.root.firstChild.params.id;
      return new GetTask(id);
    })
  );

  /*
  * Select current task from store or get from db
  * */
  @Effect()
  loadTask$ = this.actions$.pipe(
    ofType<GetTask>(TasksActionTypes.GetTask),
    withLatestFrom(this.store$.select(selectCurrentTask)),
    switchMap(([action, taskStore]) => {

      if (!taskStore) {
        return this.tasksService.readTaskForId(action.payload).pipe(
          map((task: Task) => {
            console.log('taskValue', task);
            return new LoadTask(task);
          }),
          catchError(error => of(new ErrorTasks(error)))
        )
      } else {
        return of(new LoadTask(taskStore));
      }

    })
  )
}
