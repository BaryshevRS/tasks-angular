import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskComponent } from './task/task.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { AuthGuard } from '../../guards/auth.guard';
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { TaskResolver } from "../../resolver/task-resolver.resolver";


const routes: Routes = [
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'tasks/add', component: TaskAddComponent, canActivate: [AuthGuard] },
  { path: 'tasks/edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskComponent, canActivate: [AuthGuard], resolve: [TaskResolver] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
