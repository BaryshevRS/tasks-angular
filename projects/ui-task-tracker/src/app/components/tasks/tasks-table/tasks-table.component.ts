import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Task } from "../models/task.model";
import { TasksService } from "../services/tasks.service";
import { PRIORITY } from "../../settings/const";
import { select, Store } from "@ngrx/store";
import { State } from "../../../stores/reducers";
import { AddTask, GetTasks } from "../../../stores/actions/tasks.actions";
import { selectAllTasks } from "../../../stores/selectors/tasks.selector";
import * as fromTask from '../../../stores/reducers/tasks.reducer';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent implements OnInit {

  public dataSource: MatTableDataSource<Task> | null;
  public pageSize: 5;

  displayedColumns: string[] = ['createDate', 'name', 'status', 'priority'];
  displayedColumnsName = { createDate: 'Дата', name: 'Название', status: 'Статус', priority: 'Приоритет' };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private tasksService: TasksService,
    private store$: Store<fromTask.State>
  ) {

    // todo отписаться

    this.store$.dispatch(new GetTasks());

    // this.tasksService.readTask().subscribe((data) => {
    //   this.dataSource = new MatTableDataSource<Task>(data);
    //   console.log('this.tasks', data);
    //   this.dataSource.paginator = this.paginator
    // })
  }

  ngOnInit(): void {

    this.store$.pipe(select(selectAllTasks))
      .subscribe((data) => {
        console.log('data', data)
          this.dataSource = new MatTableDataSource<Task>(data);
          this.dataSource.paginator = this.paginator
        })
  }
}
