import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { SettingsService } from '../../components/settings/services/settings.service';
import {
  LoadSettings,
  GetSettings,
  SettingsActionTypes,
  SettingsActionsUnion,
  ErrorSetting
} from '../actions/settings.actions';
import { SessionUnion, Settings } from '../../components/settings/models/settings.model';
import { Store } from '@ngrx/store';
import { NoteMessage } from '../../share/classes/note-message.class';
import { ErrorUsers } from '../actions/users.actions';
import { NoteMessageService } from '../../share/services/note-message.service';
import { selectCurrentTask } from '../selectors/tasks.selector';

@Injectable()
export class SettingsEffects  { // implements OnInitEffects

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private noteMessageService: NoteMessageService,
    private store$: Store<any>
  ) {
  }

  @Effect()
  getSettings$ = this.actions$.pipe(
    ofType(SettingsActionTypes.GetSettings),
    withLatestFrom(this.store$.select('users')),
    switchMap((settings, users) => {

          return this.settingsService.readSettings().pipe(
            map(sets => new LoadSettings(sets)),
            catchError(error => {
              if (users) {
                return of(new LoadSettings(new Settings()));
              } else {
                return of(new ErrorSetting());
              }
            })
          );

      }
    )
  );

  @Effect()
  updateSettings$ = this.actions$.pipe(
    ofType(SettingsActionTypes.UpdateSettings),
    switchMap(({ payload }) => {
        return this.settingsService.updateSettings(payload)
          .then((state: Settings) => {
              // update store immediately
              return new LoadSettings(state);
            }
          )
          .catch(error => {
            this.noteMessageService.handleError(new NoteMessage('Ошибка Обновления', 'Закрыть'));
            return new ErrorSetting();
          });
      }
    )
  );
/*
  // upload after effects init
  ngrxOnInitEffects(): SettingsActionsUnion {
    // return new GetSettings();
  }*/

}
