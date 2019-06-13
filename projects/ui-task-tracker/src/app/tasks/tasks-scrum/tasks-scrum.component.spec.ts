import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksScrumComponent } from './tasks-scrum.component';

describe('TasksScrumComponent', () => {
  let component: TasksScrumComponent;
  let fixture: ComponentFixture<TasksScrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksScrumComponent ]
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
