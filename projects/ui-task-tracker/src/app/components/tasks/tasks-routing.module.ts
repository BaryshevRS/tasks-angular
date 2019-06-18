import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from './tasks.component';
import {TaskComponent} from './task/task.component';
import {TaskAddComponent} from './task-add/task-add.component';
import {AuthGuard} from '../../guards/auth.guard';


const routes: Routes = [
  {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
  {path: 'tasks/add', component: TaskAddComponent},
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  { path: 'tasks/:id', component: TaskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
