import {fromEvent} from "rxjs";
import {debounceTime, distinct, pairwise, takeUntil} from "rxjs/operators";
import ViewportConfigSize from "./enums/config";
import IConfig from "./interface/config";

export class ViewportSizeService {

  private viewportWidth: number;
  private viewportConfig: IConfig;
  private unsubscribe$;

  constructor(config: IConfig) {
    this.viewportConfig = config;

  }

  getViewport() {
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.unsubscribe$),
        // map((e: any) => this.scrollTop()),
        pairwise(),
        // filter(positions => this.isScrollingDown(positions)),
        debounceTime(200),
        distinct()
        // filter(_ => this.isScrollingActive()),

      ).subscribe(() => {
        this.getViewport();
    })
  }

  getViewportSize() {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('w', w);
    return w;
  }

  // small: viewportWidth < config.medium
// medium: config.medium <= viewportWidth < config.large
// large: config.large <= viewportWidth
  setViewport(viewportType): boolean {
    console.log('!IConfig', this.viewportConfig);
    console.log('!viewportType', viewportType);
    let show = true;

    switch (viewportType) {
      case ViewportConfigSize.small:
        // if (this.viewportWidth < this.viewportConfig.medium) {
        //
        // }
        break;
      case ViewportConfigSize.medium:
        if (
          this.viewportConfig.medium <= this.viewportWidth &&
          this.viewportWidth < this.viewportConfig.large
        ) {

        }
        break;
      case ViewportConfigSize.large:
        if (
          this.viewportWidth <= this.viewportConfig.large
        ) {

        }
        break;
      default:
        break;
    }

    return show;
  }
}
