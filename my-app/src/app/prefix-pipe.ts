import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix'
})
export class PrefixPipe implements PipeTransform{
  transform(value: string, pref: string){
    let result = pref + ": " + value
    return result;
  }
}
