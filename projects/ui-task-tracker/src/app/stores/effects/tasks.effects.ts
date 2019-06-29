import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ErrorTasks,
  GetTask,
  LoadTask,
  LoadTasks,
  UpdateStatusTask,
  TasksActionTypes,
  GetTasks, AddTask,
} from '../actions/tasks.actions';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { TasksService } from '../../components/tasks/services/tasks.service';
import { Task } from '../../components/tasks/models/task.model';
import { Store } from '@ngrx/store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { selectCurrentTask } from '../selectors/tasks.selector';
import { NoteMessageService } from '../../share/services/note-message.service';
import { NoteMessage } from '../../share/classes/note-message.class';

// import { selectRouteParams } from "../reducers/tasks.reducer";

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
    private store$: Store<any>,
    private noteMessageService: NoteMessageService
  ) {
  }

  /*
  * Select all task from db
  * */
  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType<GetTasks>(TasksActionTypes.GetTasks),
    switchMap(() => {
        return this.tasksService.readTask().pipe(
          map((tasks: Task[]) => new LoadTasks(tasks)),
          catchError(error => of(new ErrorTasks(error)))
        );
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
      const path = action.payload.routerState.root.firstChild;
      if (path && path.firstChild) {
        return path.firstChild.params.id;
      }
      return false;
    }),
    map((action: RouterNavigationAction) => {
      const id = action.payload.routerState.root.firstChild.firstChild.params.id;
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
        console.log('@Effect loadTask$');
        return this.tasksService.readTaskForId(action.payload).pipe(
          map((task: Task) => {
            return new LoadTask(task);
          }),
          catchError(error => of(new ErrorTasks(error)))
        );
      } else {
        return of(new LoadTask(taskStore));
      }
    })
  );

  /*
  * Update task for store and db at scrum view
  * */
  @Effect()
  UpdateTask$ = this.actions$.pipe(
    ofType<UpdateStatusTask>(TasksActionTypes.UpdateStatusTask),
    switchMap((action) => {

      console.log('UpdateTask$', action);
      if (action.payload.status) {
        return this.tasksService.updateStatusTask(action.payload.id, action.payload.status)
          .then(() => {
              return new LoadTask(action.payload);
            }
          ).catch(error => of(new ErrorTasks(error)));
      } else {
        return of(new ErrorTasks(null));
      }

    })
  );

  /*
  * Add new task
  * */

  @Effect()
  addTask$ = this.actions$.pipe(
    ofType<AddTask>(TasksActionTypes.AddTask),
    withLatestFrom(this.store$.select('users')),
    switchMap(([{ payload }, { profile }]) => {
      return this.tasksService.addTask(payload)
        .then(() => {
            this.noteMessageService.handleError(new NoteMessage('Задача добавлена успешно.'));
            payload.uid = profile.uid;
            return new LoadTask(payload);
          }
        ).catch(error => {
          this.noteMessageService.handleError(new NoteMessage('Ошибка добавления.'));
        });
    })
  );
}
