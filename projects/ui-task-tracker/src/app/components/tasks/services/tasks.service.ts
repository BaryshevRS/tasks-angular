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

  readTask(priority = null): Observable<Task[]> {

    let tasksCollection: AngularFirestoreCollection<Task>;

    if (priority) {
      tasksCollection = this.afs.collection(
        'tasks',
        ref => ref
          .where('priority', '==', priority)
          .orderBy('createDate', 'desc')
      );
    } else {
      tasksCollection = this.afs.collection<Task>(
        'tasks',
        ref => ref.orderBy('createDate', 'desc')
      );
    }

    return tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  readTaskForId(id: string | number): Observable<Task> {
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

  updateTask(task: Task) {
    return this.afs.doc<Task>(`tasks/${task.id}`).update(task);
  }

  updateStatusTask(id, status) {
    return this.afs.doc<Task>(`tasks/${id}`).update({ status });
  }
}
