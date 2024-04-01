import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk',
  // standalone: true

})
export class ChunkPipe implements PipeTransform {

  transform(array: any[], size: number): any[] {
    if (!array || !Array.isArray(array) || size <= 0) {
      return array;
    }

    const chunkedArray = [];
    let index = 0;

    while (index < array.length) {
      chunkedArray.push(array.slice(index, size + index));
      index += size;
    }

    return chunkedArray;
  }

}
