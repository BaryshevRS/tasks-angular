import { initialState, SettingsReducer } from './settings.reducer';

describe('Settings Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = SettingsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
