import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UsersEffects } from './users.effects';
import { EffectsModule } from "@ngrx/effects";
import { effectsList } from "./index";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../reducers";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../environments/environment";
import { MatSnackBarModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";

describe('UsersEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
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

    effects = TestBed.get(UsersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
