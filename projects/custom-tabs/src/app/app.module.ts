import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {TabsModule} from './tabs/tabs.module';

@NgModule({
  imports: [
    BrowserModule,
    TabsModule],
  declarations: [
    AppComponent,
    TestComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
