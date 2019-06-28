import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../../tasks/models/task.model';
import { delay, map, tap } from 'rxjs/operators';
import {
  SessionUnion,
  Settings
} from '../models/settings.model';

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
      map(actions => {
        const settings = new Settings();
        actions.map(a => settings[a.payload.doc.id] = a.payload.doc.data());
        return settings;
      })
    );
  }

  updateSettings(values: SessionUnion) {
    const id = Object.keys(values)[0];

    console.log('values[id]', values[id]);

    const updateVal = {};
    values[id].map(a => {
      const u = {...a};
      delete u.checked;
      updateVal[u.key] = {...u};
    });

    const state = {};
    state[id] = updateVal;

    console.log('updateVal', id, updateVal);

    return this.afs.doc(`settings/${id}`).set(updateVal)
      .then(() => state);
  }
}
