import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class OrdersResolver implements Resolve<boolean> {
  constructor() { }

  resolve(): Observable<boolean> {

    return of(true);
    // return this.store.pipe(
    //   select(allDatasetsLoaded),
    //   tap(loaded => {
    //     if (!loaded) {
    //       this.store.dispatch(new AllDatasetsRequested());
    //     }
    //   }),
    //   filter(loaded => loaded),
    //   first()
    // );
  }
}
