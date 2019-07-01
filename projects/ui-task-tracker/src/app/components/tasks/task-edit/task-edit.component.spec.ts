import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditComponent } from './task-edit.component';
import { TasksModule } from "../tasks.module";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../../stores/reducers";
import { RouterTestingModule } from "@angular/router/testing";

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TasksModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
