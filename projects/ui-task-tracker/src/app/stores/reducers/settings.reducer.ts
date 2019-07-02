import { SettingsActionsUnion, SettingsActionTypes } from '../actions/settings.actions';
import { Priorities, Statuses } from '../../components/settings/models/settings.model';

export interface StateSettings {
  priorities: Priorities;
  statuses: Statuses;
}

export const initialState: StateSettings = {
  priorities: null,
  statuses: null
};

export function SettingsReducer(state = initialState, action: SettingsActionsUnion): StateSettings {
  switch (action.type) {

    case SettingsActionTypes.GetSettings:
      return {...state};

    case SettingsActionTypes.LoadSettings:
      return {...state, ...action.payload};

    case SettingsActionTypes.ErrorSetting:
      return {...state};

    default:
      return state;
  }
}
