import {NgModule} from '@angular/core';
import {EstadoPipe} from '../estado.pipe';
import {EstadoDeCreditoPipe} from '../estadoDeCredito.pipe';
import {RecorrerArregloPipe} from '../recorrer.arreglo.pipe';

@NgModule({
  declarations: [EstadoPipe, EstadoDeCreditoPipe, RecorrerArregloPipe],
  exports: [EstadoPipe, EstadoDeCreditoPipe, RecorrerArregloPipe]
})
export class PipesModule {}
