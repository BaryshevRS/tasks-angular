import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Task } from "../models/task.model";
import { TasksService } from "../services/tasks.service";
import { select, Store } from "@ngrx/store";
import { GetTasks } from "../../../stores/actions/tasks.actions";
import { selectAllTasks } from "../../../stores/selectors/tasks.selector";
import { StateTask } from "../../../stores/reducers/tasks.reducer";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements OnInit, OnDestroy {

  public dataSource: MatTableDataSource<Task> | null;
  public pageSize: 5;

  private unsubscribe$ = new Subject<void>();

  displayedColumns: string[] = ['createDate', 'name', 'status', 'priority'];
  displayedColumnsName = { createDate: 'Дата', name: 'Название', status: 'Статус', priority: 'Приоритет' };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private tasksService: TasksService,
    private store$: Store<StateTask>
  ) {

    // todo отписаться

    // this.store$.dispatch(new GetTasks());

    // this.tasksService.readTask().subscribe((data) => {
    //   this.dataSource = new MatTableDataSource<Task>(data);
    //   console.log('this.tasks', data);
    //   this.dataSource.paginator = this.paginator
    // })
  }

  ngOnInit(): void {

    this.store$.pipe(select(selectAllTasks))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        console.log('TasksTableComponent', data)
          this.dataSource = new MatTableDataSource<Task>(data);
          this.dataSource.paginator = this.paginator
        })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
