import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import { AddTask } from '../../../stores/actions/tasks.actions';
import { Settings } from '../../settings/models/settings.model';
import { StateUsers } from '../../../stores/reducers/users.reducer';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoteMessageService } from '../../../share/services/note-message.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit, OnDestroy {

  public settings: Observable<Settings>;
  public taskAddControl: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private store$: Store<any>,
    private note: NoteMessageService,
    private snackBar: MatSnackBar
  ) {
  }

  @ViewChild(FormGroupDirective, { static: true }) form;

  ngOnInit() {

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
