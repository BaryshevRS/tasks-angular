import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegsComponent} from "./regs.component";

const routes: Routes = [
  {path: 'regs', component: RegsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegsRoutingModule {
}
