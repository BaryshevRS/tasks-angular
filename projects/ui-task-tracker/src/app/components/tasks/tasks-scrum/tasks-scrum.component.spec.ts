import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksScrumComponent } from './tasks-scrum.component';
import { CommonModule } from "@angular/common";
import { TasksScrumRoutingModule } from "./tasks-scrum-routing.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ShareModule } from "../../../share/modules/share.module";
import { TasksScrumModule } from "./tasks-scrum.module";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../../stores/reducers";

describe('TasksScrumComponent', () => {
  let component: TasksScrumComponent;
  let fixture: ComponentFixture<TasksScrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        TasksScrumModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksScrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
