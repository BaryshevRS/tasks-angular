import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Task } from "../../tasks/models/task.model";
import { map, tap } from "rxjs/operators";
import { IPriority, IStatus, Priorities, SessionUnion, Settings, Statuses } from "../models/settings.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  readSettings(): Observable<Settings> {
    let settingsCollection: AngularFirestoreCollection<Settings>;
    settingsCollection = this.afs.collection<Settings>('settings');

    return settingsCollection.snapshotChanges().pipe(
      tap((test) => console.log('readSettings', test)),
      map(actions => {
        let map = new Settings();
        actions.map(a => map[a.payload.doc.id] = a.payload.doc.data());
        console.log('map', map);
        return map;
      }),
      tap((test) => console.log('readSettings2', test)),
    );
  }
}
