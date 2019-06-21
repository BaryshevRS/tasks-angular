import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { STATUS } from "../../settings/const";
import { select, Store } from "@ngrx/store";
import { StateTask } from "../../../stores/reducers/tasks.reducer";
import { selectAllTasks } from "../../../stores/selectors/tasks.selector";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material";
import { Task } from "../models/task.model";
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-tasks-scrum',
  templateUrl: './tasks-scrum.component.html',
  styleUrls: ['./tasks-scrum.component.scss']
})
export class TasksScrumComponent implements OnInit {

  private statuses: Map<string, string>;
  private unsubscribe$ = new Subject<void>();
  private tasks: any;
  private mapTask: Map<string, Task>;

  constructor(
    private store$: Store<StateTask>
  ) {
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  success = [
    'Get up2',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  ngOnInit(): void {

    // todo отписаться
    // todo убрать 15 повторов вызова сервиса

    this.statuses = STATUS;

/*    this.tasks = this.store$.pipe(select(selectAllTasks)).pipe(
      switchMap((tasks: Task[]) => {

        // tasks.map(task => {
        //   console.log('task', task);
        //   this.mapTask.set(task.status, task)
        // });
        //
        // console.log('mapTask', this.mapTask);

        return tasks;
      })
    )
      // .pipe(takeUntil(this.unsubscribe$))
      // .subscribe((data) => {
      //   console.log('TasksTableComponent', data)
      //   this.dataSource = new MatTableDataSource<Task>(data);
      //   this.dataSource.paginator = this.paginator
      // })*/
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
