import { Injectable } from '@angular/core';
import { Actions, Effect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';
import { InitsActionsUnion, InitsActionTypes, LoadInits } from '../actions/inits.actions';
import { ErrorUsers, LoginUserSuccess, UsersActionTypes } from "../actions/users.actions";
import { catchError, exhaustMap, flatMap, map, switchMap, takeUntil, tap, withLatestFrom } from "rxjs/operators";
import { IUser, User } from "../../components/users/models/users.model";
import { NoteMessage } from "../../share/classes/note-message.class";
import { Task } from "../../components/tasks/models/task.model";
import { ErrorTasks, GetTasks, LoadTasks, TasksActionTypes } from "../actions/tasks.actions";
import { Observable, of } from "rxjs";
import { GetSettings, SettingsActionTypes } from '../actions/settings.actions';
import { Store } from "@ngrx/store";
import { selectTaskWithSettings } from "../selectors/settings.selector";

@Injectable()
export class InitsEffects implements OnRunEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<any>
  ) {
  }

  @Effect()
  LoadInits$ = this.actions$.pipe(
    ofType(InitsActionTypes.LoadInits),
    flatMap(() => {
      return [new GetSettings(), new GetTasks()];
    }),
    catchError(error => of(new ErrorTasks(error)))
  );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType(UsersActionTypes.LoginUserCheck),
      withLatestFrom(this.store$.select(selectTaskWithSettings)),
      exhaustMap(([, [tasks, settings]]) => {

          if (this.isEmptyObject(settings) && !(tasks as Array<any>).length) {
            console.log('LoadInits');
            this.store$.dispatch(new LoadInits());
          }

          return resolvedEffects$.pipe(
            tap(() => console.log('GetSettings')),
            takeUntil(this.actions$.pipe(ofType(SettingsActionTypes.GetSettings)))
          )
        }
      )
    );
  }

  isEmptyObject(obj) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i) && obj[i]) {
        return false;
      }
    }
    return true;
  }
}
