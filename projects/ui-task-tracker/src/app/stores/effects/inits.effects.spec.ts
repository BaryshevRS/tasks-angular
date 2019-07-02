import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InitsEffects } from './inits.effects';
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../reducers";
import { environment } from "../../../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { effectsList } from "./index";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { MatSnackBarModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";

describe('InitsEffects', () => {
  let actions$: Observable<any>;
  let effects: InitsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InitsEffects,
        provideMockActions(() => actions$)
      ],
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(effectsList),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MatSnackBarModule,
        RouterTestingModule
      ]
    });

    effects = TestBed.get(InitsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
