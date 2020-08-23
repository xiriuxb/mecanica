import { IsNotEmpty, IsString } from 'class-validator';
import { ActividadEntity } from '../actividad.entity';

export class CrearActividadDto {
  @IsNotEmpty()
  @IsString()
  detalleActividad: string;

  constructor(actividad: ActividadEntity) {
    this.detalleActividad = actividad.detalleActividad;
  }
}
