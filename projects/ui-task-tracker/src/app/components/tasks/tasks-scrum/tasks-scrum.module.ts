import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksScrumComponent } from './tasks-scrum.component';
import { TasksScrumRoutingModule } from './tasks-scrum-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TasksScrumComponent
  ],
  imports: [
    CommonModule,
    TasksScrumRoutingModule,
    DragDropModule
  ],
  exports: [
    TasksScrumComponent
  ]
})
export class TasksScrumModule { }
