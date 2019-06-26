import { ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { StateSettings } from "../../stores/reducers/settings.reducer";
import { IPriorityRow, PriorityRow } from "./models/settings.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  panelOpenState = false;
  settings;
  private unsubscribe$ = new Subject<void>();

  public settingsFormControl: FormGroup;

  constructor(
    private store$: Store<StateSettings>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.store$.pipe(select('settings')).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(
        (settings: StateSettings) => {
          // console.log('settings', settings);
          this.setPrioritiesForm(settings);

          return of(null);
        }
      )
    ).subscribe();
  }

  setPrioritiesForm(settings) {
    let priorities = [];
    for (let i in settings.priorities) {
      const priority: IPriorityRow = { ...new PriorityRow(), ...settings.priorities[i], key: i };
      priorities.push(priority);
    }

    priorities.sort((a, b) => a.order - b.order);
    priorities = priorities.map((priority) => this.fb.group(new PriorityRow().formModel(priority)));

    this.settingsFormControl = null;
    this.settingsFormControl = this.fb.group({
      priorities: this.fb.array(priorities)
    });
  }

  remove(e) {
    e.preventDefault();
    this.removeIndex();
  }


  removeIndex() {
    const priorities = (this.settingsFormControl.get('priorities').value as FormArray);

    for (let i = 0; i < priorities.length; i++) {
      if (priorities[i].id) {
        (this.settingsFormControl.get('priorities') as FormArray).removeAt(i);
        return this.removeIndex();
      }
    }
  }

  add(e) {
    e.preventDefault();
    (this.settingsFormControl.get('priorities') as FormArray).push(this.fb.group(new PriorityRow().formModel()));
  }

  onSubmit() {
    // console.log('this.settingsFormControl.value', this.settingsFormControl.value);

  }

}
