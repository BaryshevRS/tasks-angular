import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { ActivatedRoute } from "@angular/router";
import { map, take } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { selectCurrentTask } from "../../../stores/selectors/tasks.selector";
import { StateTask } from "../../../stores/reducers/tasks.reducer";
import { GetTask, GetTasks } from "../../../stores/actions/tasks.actions";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {

  private task: Task;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<StateTask>
  ) {

  }

  ngOnInit() {
    // todo unsubcribe
    // this.route.data
    //   .pipe(map(task => task[0]))
    //   .subscribe((data) => {
    //     this.task = <Task>data;
    //   });

    // this.route.params
    //   .subscribe(({id}) => {
    //       console.log('data params', id);
    //     this.store$.dispatch(new GetTask(id));
    //
    //   });

    // this.store$.dispatch(new GetTask('KFhCh7xjCtAbRQhBCrfk'));

    //     this.store$.dispatch(new GetTasks());

    // this.store$.dispatch(new GetTask('KFhCh7xjCtAbRQhBCrfk'));

    return this.store$.pipe(select(selectCurrentTask)).subscribe((data) => {
      this.task = <Task>data;
    });
  }

}
