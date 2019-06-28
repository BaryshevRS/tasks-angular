import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InitsEffects } from './inits.effects';

describe('InitsEffects', () => {
  let actions$: Observable<any>;
  let effects: InitsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InitsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(InitsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
