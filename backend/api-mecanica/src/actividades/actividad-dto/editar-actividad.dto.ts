import { IsOptional, IsString } from 'class-validator';
import { ActividadEntity } from '../actividad.entity';

export class EditarActividadDto {
  @IsOptional()
  @IsString()
  detalleActividad: string;

  constructor(actividad: ActividadEntity) {
    this.detalleActividad = actividad.detalleActividad;
  }
}
