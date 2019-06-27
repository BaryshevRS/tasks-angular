import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { ErrorTasks, LoadTask, LoadTasks, TasksActionTypes, UpdateStatusTask } from '../actions/tasks.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Task } from '../../components/tasks/models/task.model';
import { of } from 'rxjs';
import { SettingsService } from '../../components/settings/services/settings.service';
import {
  LoadSettings,
  GetSettings,
  SettingsActionTypes,
  SettingsActions,
  UpdateSettings, ErrorSetting
} from '../actions/settings.actions';
import { SessionUnion } from "../../components/settings/models/settings.model";

@Injectable()
export class SettingsEffects implements OnInitEffects  {

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) {
  }

  ngrxOnInitEffects(): SettingsActions {
    return new GetSettings();
  }

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(SettingsActionTypes.GetSettings),
    switchMap(() => {
        return this.settingsService.readSettings().pipe(
          tap((settings) => console.log('settings', settings)),
          // todo надо проверку если есть в сторе, то не делать запрос на сервер
          map((settings: any) => new LoadSettings(settings)),
          catchError(error => of(new ErrorTasks(error)))
        );
      }
    )
  );

  @Effect()
  updateSettings$ = this.actions$.pipe(
    ofType(SettingsActionTypes.UpdateSettings),
    switchMap(({payload}) => {
        return this.settingsService.updateSettings(payload)
          .then((state: SessionUnion) => {
            console.log('updateSettings$', state);
            return new LoadSettings(state);
          }
        ).catch(error => of(new ErrorSetting()))
      }
    )
  );

}
