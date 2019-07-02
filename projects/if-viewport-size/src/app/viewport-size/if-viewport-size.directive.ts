import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { ViewportSizeService } from './viewport-size.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private viewportSize: ViewportSizeService
  ) {
  }

  @Input() set ifViewportSize(viewportType: string) {

    const initShow = this.viewportSize.setViewport(viewportType);

    if (initShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

    this.viewportSize.checkViewport(viewportType)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((show) => {

        if (!this.viewContainer.length) {
          if (show) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        } else {
          if (!show) {
            this.viewContainer.clear();
          }
        }

      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
