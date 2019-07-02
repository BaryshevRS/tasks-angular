import {
  Component,
  HostBinding,
} from '@angular/core';
import {TabsService} from './tabs.service';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  providers: [
    TabsService
  ]
})
export class TabsComponent {
  @HostBinding('class') classes = 'tabs__titles';
}
