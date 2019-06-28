import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from '../models/task.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  readTask(): Observable<Task[]> {
    let tasksCollection: AngularFirestoreCollection<Task>;
    tasksCollection = this.afs.collection<Task>('tasks');

    return tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  readTaskForId(id: string | number): Observable<Task>  {
    const task: AngularFirestoreDocument<Task> = this.afs.doc<Task>(`tasks/${id}`);

    return task.snapshotChanges().pipe(
      map((snap) => {
        const obj = snap.payload.data();
        obj.id = snap.payload.id;
        return obj;
      })
    );
  }

  addTask(task: Task) {
    const taskRef: AngularFirestoreCollection<Task> = this.afs.collection('tasks');
    return taskRef.add(task);
  }

  updateStatusTask(id, status) {
    return this.afs.doc<Task>(`tasks/${id}`).update({status});
  }
}
