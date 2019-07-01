import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StateSettings } from '../../stores/reducers/settings.reducer';
import { IPriorityRow, IStatusRow, PriorityRow, StatusRow } from './models/settings.model';
import { UpdateSettings } from '../../stores/actions/settings.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  public settingsPanels = [{name: 'Приоритеты', key: 'priorities'}, {name: 'Статусы', key: 'statuses'}];
  public settingsFormControl: FormGroup[];

  constructor(
    private store$: Store<StateSettings>,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.settingsFormControl = null;

    this.store$.pipe(select('settings')).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(
        (settings: StateSettings) => {

          this.settingsFormControl = [];

          this.setPrioritiesForm(settings);
          this.setStatusesForm(settings);

          return of(null);
        }
      )
    ).subscribe();
  }

  setPrioritiesForm(settings) {
    let priorities = [];
    for (const i in settings.priorities) {
      if (settings.priorities[i]) {
        const priority: IPriorityRow = { ...new PriorityRow(), ...settings.priorities[i], key: i };
        priorities.push(priority);
      }
    }

    priorities.sort((a, b) => a.order - b.order);
    priorities = priorities.map((priority) => this.fb.group(new PriorityRow().formModel(priority)));

    this.settingsFormControl[0] = this.fb.group({
      priorities: this.fb.array(priorities)
    });
  }

  setStatusesForm(settings) {
    let statuses = [];
    for (const i in settings.statuses) {
      // add all properties
      if (settings.statuses[i]) {
        const status: IStatusRow = { ...new StatusRow(), ...settings.statuses[i], key: i };
        statuses.push(status);
      }
    }

    statuses.sort((a, b) => a.order - b.order);
    statuses = statuses.map((priority) => this.fb.group(new StatusRow().formModel(priority)));

    this.settingsFormControl[1] = this.fb.group({
      statuses: this.fb.array(statuses)
    });
  }

  remove(e, index, name) {
    e.preventDefault();
    this.removeIndex(index, name);
  }

  removeIndex(index: number, name: string) {
    const settings = (this.settingsFormControl[index].get(name).value as FormArray);

    for (let i = 0; i < settings.length; i++) {
      if (settings[i].checked) {
        (this.settingsFormControl[index].get(name) as FormArray).removeAt(i);
        return this.removeIndex(index, name);
      }
    }
  }

  add(e, index: number, name: string) {
    e.preventDefault();

    if (name === 'priorities') {
      (this.settingsFormControl[index].get(name) as FormArray).push(this.fb.group(new PriorityRow().formModel()));
    } else {
      (this.settingsFormControl[index].get(name) as FormArray).push(this.fb.group(new StatusRow().formModel()));
    }
  }

  onSubmit(e, index: number, name: string) {
    this.store$.dispatch(new UpdateSettings( this.settingsFormControl[index].value));
  }

}
