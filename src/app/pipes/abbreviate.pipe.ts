import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value.length > 75){
      return `${value.slice(0, 150)}...`
    } else {
      return value;
    }

  }

}
