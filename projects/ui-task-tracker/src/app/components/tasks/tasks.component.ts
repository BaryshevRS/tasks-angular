import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PRIORITY } from '../settings/const';
import { TasksService } from './services/tasks.service';
import { Task } from './models/task.model';
import { MatTable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  public priority: Array<string>;
  // public tasks: MatTableDataSource<Task> | null;
  // public pageSize: 5;
  //
  // displayedColumns: string[] = ['createDate', 'name', 'status', 'priority'];
  // displayedColumnsName = { createDate: 'Дата', name: 'Название', status: 'Статус', priority: 'Приоритет' };
  //
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //
  // constructor(
  //   private tasksService: TasksService
  // ) {
  //   this.priority = PRIORITY;
  //   // todo отписаться
  //   this.tasksService.readTask().subscribe((data) => {
  //     this.tasks = new MatTableDataSource<Task>(data);
  //     this.tasks.paginator = this.paginator
  //   })
  // }
}

