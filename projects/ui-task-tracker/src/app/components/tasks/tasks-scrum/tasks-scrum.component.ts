import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { STATUS } from '../../settings/const';
import { select, Store } from '@ngrx/store';
import { StateTask } from '../../../stores/reducers/tasks.reducer';
import { selectAllTasks } from '../../../stores/selectors/tasks.selector';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { Task } from '../models/task.model';
import { Observable, of, Subject } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-tasks-scrum',
  templateUrl: './tasks-scrum.component.html',
  styleUrls: ['./tasks-scrum.component.scss']
})
export class TasksScrumComponent implements OnInit, OnDestroy {

  private statuses: Map<string, string>;
  private unsubscribe$ = new Subject<void>();
  private tasks: Observable<any>;

  constructor(
    private store$: Store<StateTask>
  ) {
  }


  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  ngOnInit(): void {

    this.statuses = STATUS;

    this.tasks = this.store$.pipe(select(selectAllTasks)).pipe(
      switchMap(
        (tasks: Task[]) => {

          const tabs = tasks.reduce((a, task: Task) => { // Dictionary<string>

            const x = {};
            x[task.status] = task;

            if (Object.keys(a).length === 0) {
              a[task.status] = task;
            } else {
              a = {
              ...a, [task.status] : task
              };
            }


            return a;

          }, {});

          console.log('tabs', tabs);
          return of(tabs);
        }
      )
    );

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
