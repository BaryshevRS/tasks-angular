import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

//   date = new FormControl(new Date());
//   serializedDate = new FormControl((new Date()).toISOString());
// }

  public taskFormControl: FormGroup;

  constructor(private fb: FormBuilder) {

    this.taskFormControl = this.fb.group({

      name: [],
      description: [],
      id: [],
      create_date: [],
      planned_time: [],
      used_time: [],
      priority: [],
      status: [],
      uid: [],
    });

  }

  ngOnInit() {
  }

  onSubmit() {

    console.log('xx', this.taskFormControl.value);

  }

}
