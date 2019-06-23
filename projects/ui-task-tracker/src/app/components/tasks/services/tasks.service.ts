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
      tap((test) => console.log('readTask')),
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
        // const fromCache = snap.payload.metadata.fromCache;
        // // console.log('dataService: fetchActivities: map fromCache: ', fromCache);
        console.log('snap', snap);
        const obj = snap.payload.data();
        obj.id = snap.payload.id;
        return obj;
      })
    );
  }

  addTask(task: Task) {
    const taskRef: AngularFirestoreCollection<Task> = this.afs.collection('tasks');

    console.log('task', task);

    taskRef.add(task)
      .then(credential => {
        alert('Задача добавлена успешно!');
      })
      .catch(error => this.handleError(error));
  }

  private handleError(error: Error) {
    console.error(error);
    alert('Ошибка добавления задачи');
  }
}
