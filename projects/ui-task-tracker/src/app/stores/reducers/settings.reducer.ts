import { SettingsActions, SettingsActionTypes } from '../actions/settings.actions';
import { Priorities, Statuses } from '../../components/settings/models/settings.model';

export interface StateSettings {
  priorities: Priorities;
  statuses: Statuses;
}

export const initialState: StateSettings = {
  priorities: null,
  statuses: null
};

export function SettingsReducer(state = initialState, action: SettingsActions): StateSettings {
  switch (action.type) {

    case SettingsActionTypes.GetSettings:
      return {...state};

    case SettingsActionTypes.LoadSettings:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
