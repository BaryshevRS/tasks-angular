import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TasksEffects } from './tasks.effects';
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../reducers";
import { EffectsModule } from "@ngrx/effects";
import { effectsList } from "./index";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../environments/environment";
import { MatSnackBarModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";

describe('TasksEffects', () => {
  let actions$: Observable<any>;
  let effects: TasksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksEffects,
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

    effects = TestBed.get(TasksEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
