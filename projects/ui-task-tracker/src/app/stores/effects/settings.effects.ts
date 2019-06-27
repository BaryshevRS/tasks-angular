import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SettingsService } from '../../components/settings/services/settings.service';
import {
  LoadSettings,
  GetSettings,
  SettingsActionTypes,
  SettingsActions,
  ErrorSetting
} from '../actions/settings.actions';
import { SessionUnion } from "../../components/settings/models/settings.model";
import { Store } from "@ngrx/store";

@Injectable()
export class SettingsEffects implements OnInitEffects {

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private store$: Store<any>
  ) {
  }

  ngrxOnInitEffects(): SettingsActions {
    return new GetSettings();
  }

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(SettingsActionTypes.GetSettings),
    switchMap((settings) => {
        return this.settingsService.readSettings().pipe(
          tap((settings) => console.log('settings!', settings)),
          map((settings: any) => new LoadSettings(settings)),
          catchError(error => of(new ErrorSetting()))
        );
      }
    )
  );

  @Effect()
  updateSettings$ = this.actions$.pipe(
    ofType(SettingsActionTypes.UpdateSettings),
    switchMap(({ payload }) => {
        return this.settingsService.updateSettings(payload)
          .then((state: SessionUnion) => {
              // update store immediately
              return new LoadSettings(state);
            }
          )
        .catch(error => of(new ErrorSetting()))
      }
    )
  );

}
