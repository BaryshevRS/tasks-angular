import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksScrumComponent } from "./tasks-scrum.component";

const routes: Routes = [
  { path: '', component: TasksScrumComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksScrumRoutingModule {
}
