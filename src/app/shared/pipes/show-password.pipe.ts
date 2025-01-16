import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showPassword',
})
export class ShowPasswordPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'text' : 'password';
  }
}
