import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { TasksModule } from "../tasks.module";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../../stores/reducers";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TasksModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
