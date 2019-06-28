import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'settings', loadChildren: './components/settings/settings.module#SettingsModule'},
  { path: 'tasks', loadChildren: './components/tasks/tasks.module#TasksModule'},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
