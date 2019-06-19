import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from '../login/login.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './task/task.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksScrumComponent } from './tasks-scrum/tasks-scrum.component';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatButtonToggleModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    TaskAddComponent,
    TasksTableComponent,
    TasksListComponent,
    TasksScrumComponent,
    TaskEditComponent
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
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonToggleModule,
    DragDropModule,
    ReactiveFormsModule,
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule {
}
