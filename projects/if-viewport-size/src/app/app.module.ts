import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {ViewportSizeModule} from './viewport-size/viewport-size.module';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ViewportSizeModule.forRoot({
      medium: 320,
      large: 480
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
