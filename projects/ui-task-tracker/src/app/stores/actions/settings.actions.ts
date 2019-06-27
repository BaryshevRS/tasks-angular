import { Action } from '@ngrx/store';
import { Settings, SessionUnion } from '../../components/settings/models/settings.model';

export enum SettingsActionTypes {
  GetSettings = '[Setting] Get Settings',
  LoadSettings = '[Setting] Load Settings',
  UpdateSettings = '[Setting] Update Settings',
  ErrorSetting = '[Setting] Error Setting'
}

export class ErrorSetting implements Action {
  readonly type = SettingsActionTypes.ErrorSetting;
}

export class GetSettings implements Action {
  readonly type = SettingsActionTypes.GetSettings;
}

export class LoadSettings implements Action {
  readonly type = SettingsActionTypes.LoadSettings;
  constructor(public payload: Settings) {
  }
}

export class UpdateSettings implements Action {
  readonly type = SettingsActionTypes.UpdateSettings;
  constructor(public payload: SessionUnion) {
  }
}

export type SettingsActionsUnion =
  | LoadSettings
  | GetSettings
  | UpdateSettings
  | ErrorSetting;
