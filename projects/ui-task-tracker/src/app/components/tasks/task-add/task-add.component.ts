import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import { AddTask } from '../../../stores/actions/tasks.actions';
import { Settings } from '../../settings/models/settings.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit, OnDestroy {

  public settings: Observable<Settings>;
  public taskAddControl: FormGroup;
  private unsubscribe$ = new Subject<void>();
  public disabled: boolean;

  constructor(
    private fb: FormBuilder,
    private store$: Store<any>
  ) {
  }

  @ViewChild(FormGroupDirective, { static: true }) form;

  ngOnInit() {

    this.disabled = false;

    this.taskAddControl = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      plannedTime: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      usedTime: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.settings = this.store$.select('settings');
  }

  onSubmit() {
    const { name, description, plannedTime, createDate, usedTime, priority, status, uid } = this.taskAddControl.value;
    const task: Task = { name, description, plannedTime, createDate, usedTime, priority, status };
    task.createDate = (new Date()).toISOString();

    this.form.resetForm();
    this.store$.dispatch(new AddTask(task));
  }

  trackByFn(index, item) {
    return item.key; // unique id corresponding to the item
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
