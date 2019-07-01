import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule, MatExpansionPanelTitle,
  MatInputModule
} from '@angular/material';
import { ShareModule } from '../../share/modules/share.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class SettingsModule {
}
