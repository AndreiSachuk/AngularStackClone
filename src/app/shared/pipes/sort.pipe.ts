import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform<T>(arr: T[], prop: string, reverse: boolean = false): T[] {
    if (arr === undefined) return []
    const m = reverse ? -1 : 1
    return arr.sort((a: any, b: any): number => {
      const x = a[prop]
      const y = b[prop]
      return (x === y) ? 0 : (x < y) ? -1*m : 1*m
    })
  }
}

// export class SortPipe implements PipeTransform {
//   transform(arr: Question[], prop: string, reverse: boolean = false): Question[] {
//     if (arr === undefined) return []
//     const m = reverse ? -1 : 1
//     return arr.sort((a: Question, b: Question): number => {
//       // @ts-ignore
//       const x = a[prop]
//       // @ts-ignore
//       const y = b[prop]
//       return (x === y) ? 0 : (x < y) ? -1*m : 1*m
//     })
//   }
// }
