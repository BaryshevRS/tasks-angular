import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PRIORITY } from '../settings/const';
import { TasksService } from './services/tasks.service';
import { Task } from './models/task.model';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material';

export interface ITabsTableList {
  name: string;
  createDate?: number;
  priority?: number;
  status?: number;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  priority: Array<string>;
  tasks: Observable<Task[]> | null;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = null;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private tasksService: TasksService
  ) {
    this.priority = PRIORITY;
    this.tasks = this.tasksService.readTask();
    // this.dataSource = new MatTableDataSource<ITabsTableList>(this.tasks);
  }

  // ngOnInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  @ViewChild(MatTable, { static: true }) dataSource;

  @ViewChild(MatPaginator, { static: true }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  // https://stackoverflow.com/questions/49108432/how-to-attach-matpaginator-to-datasource-coming-from-server-in-angular-material/49110738#49110738
  // https://stackoverflow.com/questions/51462568/initialising-matpaginator-asynchronously

  ngOnInit(): void {
  }
}

