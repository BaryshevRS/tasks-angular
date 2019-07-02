import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../../environments/environment";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../../stores/reducers";
import { RouterTestingModule } from "@angular/router/testing";

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      RouterTestingModule,
      StoreModule.forRoot(reducers, { metaReducers }),
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
