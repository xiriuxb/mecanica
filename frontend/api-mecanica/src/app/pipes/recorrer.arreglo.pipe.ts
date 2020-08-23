import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'RecorrerArregloCredito'
})
export class RecorrerArregloPipe implements PipeTransform {
  transform(movimiento: any[]): any {
    const fecha = movimiento.map((valor: any) => valor.fecha);
    return fecha;
  }
}
