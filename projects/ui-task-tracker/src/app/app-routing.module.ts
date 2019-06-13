import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

const appRoutes: Routes = [
  //{path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: '', component: TasksComponent},
  {path: 'tasks', component: TasksComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
