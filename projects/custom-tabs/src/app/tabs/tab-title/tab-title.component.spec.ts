import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabTitleComponent} from './tab-title.component';
import {TabsService} from '../tabs.service';

describe('TabTitleComponent', () => {
  let component: TabTitleComponent;
  let fixture: ComponentFixture<TabTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabTitleComponent],
      providers: [TabsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
