import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SettingsEffects } from './settings.effects';
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../reducers";
import { EffectsModule } from "@ngrx/effects";
import { effectsList } from "./index";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../environments/environment";
import { MatSnackBarModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe('SettingsEffects', () => {
  let actions$: Observable<any>;
  let effects: SettingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
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

    effects = TestBed.get(SettingsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
