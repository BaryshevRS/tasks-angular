import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { ErrorTasks, LoadTasks, TasksActionTypes } from '../actions/tasks.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Task } from '../../components/tasks/models/task.model';
import { of } from 'rxjs';
import { SettingsService } from '../../components/settings/services/settings.service';
import { LoadSettings, GetSettings, SettingsActionTypes, SettingsActions } from '../actions/settings.actions';

@Injectable()
export class SettingsEffects implements OnInitEffects  {

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) {
  }

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(SettingsActionTypes.GetSettings),
    switchMap(() => {
        return this.settingsService.readSettings().pipe(
          tap((settings) => console.log('settings', settings)),
          map((settings: any) => new LoadSettings(settings)),
          catchError(error => of(new ErrorTasks(error)))
        );
      }
    )
  );

  ngrxOnInitEffects(): SettingsActions {
    return new GetSettings();
  }

}
