import { Injectable } from '@angular/core';
import { Actions, Effect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';
import { ErrorMessage, InitsActionTypes, LoadInits } from '../actions/inits.actions';
import { UsersActionTypes } from '../actions/users.actions';
import { catchError, exhaustMap, flatMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { GetTasks } from '../actions/tasks.actions';
import { Observable, of } from 'rxjs';
import { GetSettings, SettingsActionTypes } from '../actions/settings.actions';
import { Store } from '@ngrx/store';
import { selectTaskWithSettings } from '../selectors/settings.selector';

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
    catchError(error => of(new ErrorMessage()))
  );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType(UsersActionTypes.LoginUserCheck),
      withLatestFrom(this.store$.select(selectTaskWithSettings)),
      exhaustMap(([, [tasks, settings]]) => {

          if (this.isEmptyObject(settings) && !(tasks as Array<any>).length) {
            this.store$.dispatch(new LoadInits());
          }

          return resolvedEffects$.pipe(
            takeUntil(this.actions$.pipe(ofType(SettingsActionTypes.GetSettings)))
          );
        }
      )
    );
  }

  isEmptyObject(obj) {
    for (const i in obj) {
      if (obj.hasOwnProperty(i) && obj[i]) {
        return false;
      }
    }
    return true;
  }
}
