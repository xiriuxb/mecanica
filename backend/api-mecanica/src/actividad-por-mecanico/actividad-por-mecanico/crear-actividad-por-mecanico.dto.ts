import { IsNotEmpty, IsNumber } from 'class-validator';
import { ActividadPorMecanicoEntity } from '../actividad-por-mecanico.entity';
import { MecanicoEntity } from '../../mecanico/mecanico.entity';
import { ActividadEntity } from '../../actividades/actividad.entity';

export class CrearActividadPorMecanicoDto {
  @IsNotEmpty()
  @IsNumber()
  mecanico: number | MecanicoEntity;

  @IsNotEmpty()
  @IsNumber()
  actividad: number | ActividadEntity;

  constructor(actividadPorMecanico: ActividadPorMecanicoEntity) {
    this.mecanico = actividadPorMecanico.mecanico;
    this.actividad = actividadPorMecanico.actividad;
  }
}
