import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from './components/login/login.module';
import {TasksModule} from './components/tasks/tasks.module';
import {SettingsModule} from './components/settings/settings.module';
import {RegsComponent} from './components/regs/regs.component';
import {RegsModule} from './components/regs/regs.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {metaReducers, reducers} from './stores/reducers';
import {AppEffects} from './stores/effects/app.effects';
import { HeaderModule } from "./components/header/header.module";
import { effectsList } from "./stores/effects";

@NgModule({
    declarations: [
        AppComponent,
        ErrorPageComponent,
        RegsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HeaderModule,
        LoginModule,
        RegsModule,
        TasksModule,
        SettingsModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        StoreModule.forRoot(reducers, {metaReducers}),
        !environment.production ? StoreDevtoolsModule.instrument({maxAge: 20}) : [],
        EffectsModule.forRoot(effectsList),
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
