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
    private store$: Store<any>
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
    const task: Task = { name, description, plannedTime, createDate, usedTime, priority, status, uid };

    this.store$.select('users')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: StateUsers) => {

        this.form.resetForm();

        task.createDate = (new Date()).toISOString();
        task.uid = users.profile.uid;

        this.store$.dispatch(new AddTask(task));
      });
  }

  trackByFn(index, item) {
    return item.key; // unique id corresponding to the item
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
