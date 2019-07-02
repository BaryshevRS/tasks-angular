import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinct, map} from 'rxjs/operators';
import ViewportConfigSize from './enums/config';
import IConfig from './interface/config';

export class ViewportSizeService {

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
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    let show = false;

    switch (viewportType) {
      case ViewportConfigSize.SMALL:
        show = viewportWidth < this.viewportConfig.medium;
        break;
      case ViewportConfigSize.MEDIUM:
        show = this.viewportConfig.medium <= viewportWidth && viewportWidth < this.viewportConfig.large;
        break;
      case ViewportConfigSize.LARGE:
        show = viewportWidth >= this.viewportConfig.large;
        break;
    }

    return show;
  }
}
