import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksToolbarComponent } from './tasks-toolbar.component';

describe('TasksToolbarComponent', () => {
  let component: TasksToolbarComponent;
  let fixture: ComponentFixture<TasksToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksToolbarComponent ]
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
