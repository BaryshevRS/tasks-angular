import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskComponent } from './task/task.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { AuthGuard } from '../../guards/auth.guard';
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { TasksScrumComponent } from "./tasks-scrum/tasks-scrum.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TasksTableComponent } from "./tasks-table/tasks-table.component";

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TasksTableComponent},
      { path: 'scrum', loadChildren: './tasks-scrum/tasks-scrum.module#TasksScrumModule' },
      { path: 'list', component: TasksListComponent }
    ]
  },
  { path: 'tasks/add', component: TaskAddComponent, canActivate: [AuthGuard] },
  { path: 'tasks/edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskComponent, canActivate: [AuthGuard], resolve: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
