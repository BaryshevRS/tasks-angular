import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {


  // this.taskFormControl = this.fb.group({
  //   id: null,
  //   name: [],
  //   description: [],
  //   createDate: (new Date()).toISOString(),
  //   plannedTime: [],
  //   usedTime: [],
  //   priority: [],
  //   status: [],
  //   uid: null
  // });


  constructor() { }

  ngOnInit() {
  }

}
