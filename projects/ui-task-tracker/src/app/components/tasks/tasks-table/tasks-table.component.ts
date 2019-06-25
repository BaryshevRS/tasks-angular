import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Task, TaskView } from '../models/task.model';
import { TasksService } from '../services/tasks.service';
import { select, Store } from '@ngrx/store';
import { GetTasks } from '../../../stores/actions/tasks.actions';
import { selectAllTasks } from '../../../stores/selectors/tasks.selector';
import { StateTasks } from '../../../stores/reducers/tasks.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectTaskWithSettings } from '../../../stores/selectors/settings.selector';
import { StateSettings } from '../../../stores/reducers/settings.reducer';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements OnInit, OnDestroy {

  public dataSource: MatTableDataSource<Task> | null;
  public pageSize: 5;

  private unsubscribe$ = new Subject<void>();

  private displayedColumns: string[] = ['createDate', 'name', 'statusName'];
  private displayedColumnsName = { createDate: 'Дата', name: 'Название', statusName: 'Статус' };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private store$: Store<StateTasks>
  ) {
  }

  ngOnInit(): void {

    this.store$.pipe(select(selectTaskWithSettings))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([tasks, settings]: [TaskView[], StateSettings]) => {
        console.log('TasksTableComponent', settings);

        if (settings.priorities && settings.statuses) {
          tasks.map(task => {

            if (task.priority) {
              task.priorityList = settings.priorities[task.priority];
            }

            if (task.status) {
              task.statusList = settings.statuses[task.status];
              task.statusName = settings.statuses[task.status].name;
            }
            return task;
          });
        }

        // set tasks
        this.dataSource = new MatTableDataSource<Task>(tasks);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
