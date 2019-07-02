import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTableComponent } from './tasks-table.component';
import { TasksModule } from "../tasks.module";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../../stores/reducers";
import { EffectsModule } from "@ngrx/effects";
import { effectsList } from "../../../stores/effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('TasksTableComponent', () => {
  let component: TasksTableComponent;
  let fixture: ComponentFixture<TasksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TasksModule,
        StoreModule.forRoot(reducers, { metaReducers })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
