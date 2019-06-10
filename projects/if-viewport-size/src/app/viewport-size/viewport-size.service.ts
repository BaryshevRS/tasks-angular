import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinct, map} from 'rxjs/operators';
import ViewportConfigSize from './enums/config';
import IConfig from './interface/config';

export class ViewportSizeService {

  private viewportWidth: number;
  private viewportConfig: IConfig;

  constructor(config: IConfig) {
    this.viewportConfig = config;
  }

  checkViewport(viewportType): Observable<any> {
    return fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
            distinct(),
            map(() => this.setViewport(viewportType))
        );
  }

  setViewport(viewportType): boolean {
    this.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    let show = false;

    switch (viewportType) {
      case ViewportConfigSize.SMALL:
        if (this.viewportWidth < this.viewportConfig.medium) {
          show = true;
        }
        break;
      case ViewportConfigSize.MEDIUM:
        if (
          this.viewportConfig.medium <= this.viewportWidth &&
          this.viewportWidth < this.viewportConfig.large
        ) {
          show = true;
        }
        break;
      case ViewportConfigSize.LARGE:
        if (
          this.viewportWidth >= this.viewportConfig.large
        ) {
          show = true;
        }
        break;
    }
    console.log('!show', viewportType, show);
    return show;
  }
}
