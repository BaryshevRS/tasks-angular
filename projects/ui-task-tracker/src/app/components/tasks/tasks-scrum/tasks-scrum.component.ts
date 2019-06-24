import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { STATUS } from '../../settings/const';
import { select, Store } from '@ngrx/store';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { selectAllTasks } from '../../../stores/selectors/tasks.selector';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { Observable, of, Subject, Subscribable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-tasks-scrum',
  templateUrl: './tasks-scrum.component.html',
  styleUrls: ['./tasks-scrum.component.scss']
})
export class TasksScrumComponent implements OnInit, OnDestroy, AfterViewInit {

  private statuses: Map<string, string>;
  private unsubscribe$ = new Subject<void>();
  private tasks: Subscribable<Dictionary<string>>
  private dropArray: any;
  tasksItem: Dictionary<string>;

  constructor(
    private store$: Store<StateTasks>
  ) {
  }

  @ViewChildren(CdkDropList) dropList: QueryList<CdkDropList>;

  ngOnInit(): void {

    this.statuses = STATUS;

    this.tasks = this.store$.pipe(select(selectAllTasks)).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(
        (tasks: Task[]) => {
          const tabs: Dictionary<string> = tasks.reduce((a, task: Task) => {

            a[task.status] = (<Array<Task>>(a[task.status] || []));
            a[task.status].push(task);
            return { ...a, ...{ [task.status]: a[task.status] } };

          }, {});

          return of(tabs);
        }
      )
    );

    this.tasks.subscribe(task => this.tasksItem = task);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  drop(event: CdkDragDrop<string[]>) {

    // console.log('event', event);
    // console.log('drop', event.container.data, event.previousIndex, event.currentIndex);
    // console.log('event.previousContainer', event.previousContainer, event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngAfterViewInit(): void {
    console.log('dropList', this.dropList.toArray());
    this.dropList.map(item => {
      item.connectedTo = this.dropList.toArray();
      return item;
    })
  }
}
