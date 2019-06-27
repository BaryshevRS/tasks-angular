import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksScrumComponent } from './tasks-scrum.component';
import { TasksScrumRoutingModule } from './tasks-scrum-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareModule } from '../../../share/modules/share.module';

@NgModule({
  declarations: [
    TasksScrumComponent
  ],
  imports: [
    CommonModule,
    TasksScrumRoutingModule,
    DragDropModule,
    ShareModule
  ],
  exports: [
    TasksScrumComponent
  ]
})
export class TasksScrumModule { }
