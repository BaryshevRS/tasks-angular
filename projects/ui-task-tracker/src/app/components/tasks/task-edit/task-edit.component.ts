import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task.model';
import { UpdateTask } from '../../../stores/actions/tasks.actions';
import { Observable } from 'rxjs';
import { Settings } from '../../settings/models/settings.model';
import { TasksService } from '../services/tasks.service';
import { select, Store } from '@ngrx/store';
import { selectCurrentTask } from '../../../stores/selectors/tasks.selector';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  public task: Observable<Task>;
  public settings: Observable<Settings>;
  public taskControl: FormGroup;
  public disabled: boolean;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private store$: Store<any>
  ) {
    this.disabled = false;
  }

  ngOnInit() {
    this.settings = this.store$.select('settings');
    this.task = this.store$.pipe(select(selectCurrentTask)) as Observable<Task>;

    this.task.subscribe((task) => {
      const { name, description, plannedTime, usedTime, priority, status } = task;
      this.taskControl = this.fb.group({
        name: [name, Validators.required],
        description: [description],
        plannedTime: [plannedTime, [Validators.required, Validators.pattern('[0-9]+')]],
        usedTime: [usedTime, [Validators.required, Validators.pattern('[0-9]+')]],
        priority: [priority, Validators.required],
        status: [status, Validators.required],
      });
      this.disabled = false;
    });
  }

  onSubmit(e) {
    const { name, description, plannedTime, createDate, usedTime, priority, status } = this.taskControl.value;
    const task: Task = { name, description, plannedTime, usedTime, priority, status };
    this.disabled = true;
    this.store$.dispatch(new UpdateTask(task));
  }

  trackByFn(index, item) {
    return item.key;
  }

}
