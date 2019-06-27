import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { select, Store } from '@ngrx/store';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { selectAllTasks } from '../../../stores/selectors/tasks.selector';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Task, TaskView } from '../models/task.model';
import { Observable, of, Subject, Subscribable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { selectTaskWithSettings } from '../../../stores/selectors/settings.selector';
import { StateSettings } from '../../../stores/reducers/settings.reducer';
import { IStatus, Priority } from '../../settings/models/settings.model';
import { GetTasks, UpdateTask, UpdateStatusTask } from '../../../stores/actions/tasks.actions';

@Component({
  selector: 'app-tasks-scrum',
  templateUrl: './tasks-scrum.component.html',
  styleUrls: ['./tasks-scrum.component.scss']
})
export class TasksScrumComponent implements OnInit, OnDestroy, AfterViewInit {

  private statuses: Map<string, IStatus>[];
  private unsubscribe$ = new Subject<void>();
  private tasks: Subscribable<Dictionary<string>>;
  public tasksItem: Dictionary<string>;

  constructor(
    private store$: Store<StateTasks>
  ) {
  }

  @ViewChildren(CdkDropList) dropList: QueryList<CdkDropList>;

  ngOnInit(): void {

    this.tasks = this.store$.pipe(select(selectTaskWithSettings)).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(
        ([tasks, settings]: [TaskView[], StateSettings]) => {

          this.statuses = settings.statuses;

          //

          // set color
          if (settings.priorities) {
            tasks.map(task => {
              task.priorityList = settings.priorities[task.priority] || new Priority();
              return task;
            });
          }

          // set tabs for statuses
          let tabs: Dictionary<string> = tasks.reduce((a, task: Task) => {
            a[task.status] = ((a[task.status] || []) as Array<Task>);
            a[task.status].push(task);
            return { ...a, ...{ [task.status]: a[task.status] } };
          }, {});

          // set empty tabs for isset statuses
          const emptyTabs = {};
          const tabsKeys = Object.keys(settings.statuses);
          for (const index in tabsKeys) {
            emptyTabs[tabsKeys[index]] = [];
          }

          tabs = {...emptyTabs, ...tabs};

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
    // console.log('event.previousContainer', event.container.data, event.currentIndex);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const task = this.updateStatusTask(
        event.container.data as unknown as TaskView[],
        event.currentIndex,
        event.container.id
      );

      this.store$.dispatch(new UpdateStatusTask(task));
    }
  }

  updateStatusTask(tasks: Task[], index: number, id: string) {
    return { ...tasks[index], status: id};
  }

  ngAfterViewInit(): void {
    console.log('dropList', this.dropList.toArray());
    this.dropList.map(item => {
      item.connectedTo = this.dropList.toArray();
      return item;
    });
  }

  trackByFn(index, item) {
    return item.key; // unique id corresponding to the item
  }
}
