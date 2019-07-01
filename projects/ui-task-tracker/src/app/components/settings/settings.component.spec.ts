import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { SettingsModule } from "./settings.module";
import { MatExpansionPanelTitle } from "@angular/material";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../../stores/reducers";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SettingsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
