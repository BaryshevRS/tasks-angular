import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../../../environments/environment";

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
    ]
  }));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });
});
