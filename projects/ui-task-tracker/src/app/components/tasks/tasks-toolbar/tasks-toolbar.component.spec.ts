import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksToolbarComponent } from './tasks-toolbar.component';
import { TasksModule } from "../tasks.module";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../../stores/reducers";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TasksToolbarComponent', () => {
  let component: TasksToolbarComponent;
  let fixture: ComponentFixture<TasksToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TasksModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
