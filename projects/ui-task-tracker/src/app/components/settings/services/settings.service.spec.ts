import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";

describe('SettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
  }));

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });
});
