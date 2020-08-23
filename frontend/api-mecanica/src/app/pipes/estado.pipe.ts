import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {
  transform(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }
}
