import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() tab: number;

  public ngOnInit() {
    console.log(`>>> TestComponent ${this.tab} initialized`);
  }

}
