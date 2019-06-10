import {
    Component,
    HostBinding,
} from '@angular/core';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
    @HostBinding('class') classes = 'tabs__titles';
}
