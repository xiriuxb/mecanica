import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'estadoDeCredito'
})
export class EstadoDeCreditoPipe implements PipeTransform {
  transform(estado: boolean): any {
    return estado ? 'Aumento' : 'Disminuyo';
  }
}
