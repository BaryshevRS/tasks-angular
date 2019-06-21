import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-toolbar',
  templateUrl: './tasks-toolbar.component.html',
  styleUrls: ['./tasks-toolbar.component.scss']
})
export class TasksToolbarComponent implements OnInit {

  private colorButton = 'left';

  constructor() { }

  ngOnInit() {
  }

}
