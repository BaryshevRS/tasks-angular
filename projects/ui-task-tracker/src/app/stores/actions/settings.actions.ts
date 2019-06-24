import { Action } from '@ngrx/store';
import { Settings } from '../../components/settings/models/settings.model';

export enum SettingsActionTypes {
  GetSettings = '[Settings] Get Settings',
  LoadSettings = '[Settings] Load Settings',
}

export class GetSettings implements Action {
  readonly type = SettingsActionTypes.GetSettings;
}

export class LoadSettings implements Action {
  readonly type = SettingsActionTypes.LoadSettings;
  constructor(public payload: Settings) {
  }
}


export type SettingsActions =
  | LoadSettings
  | GetSettings;
