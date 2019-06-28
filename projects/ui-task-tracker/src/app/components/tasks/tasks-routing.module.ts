import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskComponent } from './task/task.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { AuthGuard } from '../users/guards/auth.guard';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { TasksResolver } from './resolver/tasks-resolver.resolver';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TasksTableComponent},
      { path: 'scrum', loadChildren: './tasks-scrum/tasks-scrum.module#TasksScrumModule' }
    ]
  },
  { path: 'add', component: TaskAddComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
  { path: ':id', component: TaskComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
