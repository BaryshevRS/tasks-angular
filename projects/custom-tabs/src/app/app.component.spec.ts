import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TabsModule} from './tabs/tabs.module';
import {TestComponent} from './test/test.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestComponent
      ],
      imports: [
        TabsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
