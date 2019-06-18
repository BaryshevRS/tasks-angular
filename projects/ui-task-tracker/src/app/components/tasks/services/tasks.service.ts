import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from '../models/task.model';
import { User } from "../../../models/users.model";
import { Observable } from "rxjs";
import { switchMap, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  // https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
  readTask() {
    return this.afs.collection<Task[]>(`tasks`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task[];
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addTask(task: Task) {
    const taskRef: AngularFirestoreCollection<Task> = this.afs.collection('tasks');

    console.log('task', task)

    taskRef.add(task)
      .then(credential => {
        alert('Задача добавлена успешно!')
      })
      .catch(error => this.handleError(error));
  }

  private handleError(error: Error) {
    console.error(error);
    alert('Ошибка добавления задачи');
  }
}
