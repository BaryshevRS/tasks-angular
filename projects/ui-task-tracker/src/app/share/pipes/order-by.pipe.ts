import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, args?: boolean, depth?: string, depthInner?: string): any {

    if (value) {
      if (depth && depthInner) {
          return value.sort((a, b) => {
            return args ? b[depth][depthInner] - a[depth][depthInner] : a[depth][depthInner] - b[depth][depthInner];
          });
      } else if (depth) {
        return value.sort((a, b) => {
          return args ? b[depth] - a[depth] : a[depth] - b[depth];
        });
      } else {
        return value.sort((a, b) => {
          return args ? b - a : a - b;
        });
      }
    }

    return value;
  }
}
