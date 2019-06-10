import {AfterContentInit, Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {TabsService} from '../tabs.service';

@Component({
    selector: 'tab-content',
    templateUrl: './tab-content.component.html',
    styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements AfterContentInit {

    public tabIndex: number;

    @HostBinding('hidden') hidden = true;

    constructor(private tabsService: TabsService) {
    }

    ngAfterContentInit() {

        this.tabsService.change.subscribe(tabIndex => {
            if (tabIndex === this.tabIndex) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        });
    }
}
