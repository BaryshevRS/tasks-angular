import {EventEmitter, Output} from '@angular/core';

export class TabsService {

  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.change.emit();
  }

  setTabIndex(index = 0) {
    this.change.emit(index);
  }
}
