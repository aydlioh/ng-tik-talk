import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(imgUrl: string | null): string {
    return `${environment.apiUrl}/${imgUrl}`;
  }
}
