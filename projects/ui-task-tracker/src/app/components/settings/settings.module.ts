import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { ShareModule } from "../../share/modules/share.module";

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
    ShareModule
  ]
})
export class SettingsModule {
}
