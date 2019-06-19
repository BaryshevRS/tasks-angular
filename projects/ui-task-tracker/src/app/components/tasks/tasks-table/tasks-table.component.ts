import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Task } from "../models/task.model";
import { TasksService } from "../services/tasks.service";
import { PRIORITY } from "../../settings/const";

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css']
})
export class TasksTableComponent {

  public priority: Array<string>;
  public dataSource: MatTableDataSource<Task> | null;
  public pageSize: 5;

  displayedColumns: string[] = ['createDate', 'name', 'status', 'priority'];
  displayedColumnsName = { createDate: 'Дата', name: 'Название', status: 'Статус', priority: 'Приоритет' };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private tasksService: TasksService
  ) {
    this.priority = PRIORITY;
    // todo отписаться
    this.tasksService.readTask().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Task>(data);
      console.log('this.tasks', data);
      this.dataSource.paginator = this.paginator
    })
  }
}
