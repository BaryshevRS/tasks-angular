import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  readTask() {
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

  readTaskForId(id: string | number) {
    let task: AngularFirestoreDocument<Task>;
    task = this.afs.doc<Task>(`tasks/${id}`);

    return task.snapshotChanges().pipe(
      map((snap) => {
        const fromCache = snap.payload.metadata.fromCache;
        // console.log('dataService: fetchActivities: map fromCache: ', fromCache);
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
