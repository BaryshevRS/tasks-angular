import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TasksModule } from "./tasks.module";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../stores/reducers";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TasksScrumModule } from "./tasks-scrum/tasks-scrum.module";

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TasksModule,
        TasksScrumModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
