import { Component, OnInit, ViewChild } from '@angular/core';
import { PRIORITY } from "../settings/const";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  public priority: Array<string>;

  constructor(
  ) {
    this.priority = PRIORITY;
  }
}

