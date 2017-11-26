import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elevate'
})
export class ElevationPipe implements PipeTransform {
  transform(value: number, power: number): number {
    if(power!==0) {
      return value * power;
    }
    else{
      return value;
    }
  }
}

