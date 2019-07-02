import {EventEmitter, Output} from '@angular/core';

export class TabsService {

  tabIndex = -1;

  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.change.emit();
  }

  setTabIndex(index = 0) {
    this.change.emit(index);
  }
}
