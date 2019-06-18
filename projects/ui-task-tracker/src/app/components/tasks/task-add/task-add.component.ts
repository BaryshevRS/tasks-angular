import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksService } from "../services/tasks.service";
import { Task } from "../models/task.model";
import { PRIORITY, STATUS } from "../../settings/const";

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  priority: Array<String>;
  status: Array<String>;

  public taskFormControl: FormGroup;


  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService
  ) {

    this.priority = PRIORITY;
    this.status = STATUS;

    this.taskFormControl = this.fb.group({
      id: null,
      name: [],
      description: [],
      createDate: (new Date()).toISOString(),
      plannedTime: [],
      usedTime: [],
      priority: [],
      status: [],
      uid: null
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    const { name, description, plannedTime, createDate, usedTime, priority, status, id, uid } = this.taskFormControl.value;
    const task: Task = { name, description, plannedTime, createDate, usedTime, priority, status, id, uid };
    this.tasksService.addTask(task)
  }

}
