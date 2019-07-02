import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './task/task.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatButtonToggleModule, MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TasksToolbarComponent } from './tasks-toolbar/tasks-toolbar.component';
import { ShareModule } from '../../share/modules/share.module';
import { getRuPaginatorIntl } from '../../ru-paginator-intl';

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    TaskAddComponent,
    TasksTableComponent,
    TaskEditComponent,
    TasksToolbarComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
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
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ShareModule
  ],
  exports: [
    TasksComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getRuPaginatorIntl() }
  ]
})
export class TasksModule {
}
