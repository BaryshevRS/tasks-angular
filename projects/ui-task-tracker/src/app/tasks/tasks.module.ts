import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginModule} from "../login/login.module";
import {
  MatButtonModule, MatCardModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {TasksComponent} from "./tasks.component";
import {TasksRoutingModule} from "./tasks-routing.module";
import {TaskComponent} from "./task/task.component";
import { TaskAddComponent } from './task-add/task-add.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksScrumComponent } from './tasks-scrum/tasks-scrum.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    TaskAddComponent,
    TasksTableComponent,
    TasksListComponent,
    TasksScrumComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    LoginModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule {
}
