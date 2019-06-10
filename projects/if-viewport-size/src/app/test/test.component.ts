import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
