import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {debounceTime, distinct, pairwise, takeUntil} from "rxjs/operators";
import {fromEvent, Subject} from "rxjs";
import {ViewportSizeService} from "./viewport-size.service";

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective {

  // @Input() IfViewportSize: string;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private viewportSize: ViewportSizeService
  ) {
  }

  @Input() set ifViewportSize(viewportType: string) {
    if (this.viewportSize.setViewport(viewportType)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
