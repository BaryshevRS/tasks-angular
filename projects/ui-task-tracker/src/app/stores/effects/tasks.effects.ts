import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ErrorTasks, LoadTasks, TasksActionTypes } from "../actions/tasks.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { TasksService } from "../../components/tasks/services/tasks.service";
import { Task } from "../../components/tasks/models/task.model";


@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private tasksService: TasksService
  ) {
  }

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(TasksActionTypes.GetTasks),
    switchMap(() => {
        return this.tasksService.readTask().pipe(
          tap(tasks => !!tasks), // todo
          map((tasks: Task[]) => new LoadTasks(tasks)),
          catchError(error => of(new ErrorTasks()))
        )
      }
    )
  );

}
