import { IsNotEmpty, IsNumber } from 'class-validator';
import { ActividadEntity } from '../../actividades/actividad.entity';
import { MecanicaEntity } from '../../mecanica/mecanica.entity';
import { ActividadPorMecanicaEntity } from '../actividad-por-mecanica.entity';

export class CrearActividadPorMecanicaDto {
  @IsNotEmpty()
  @IsNumber()
  actividad: number | ActividadEntity;

  @IsNotEmpty()
  @IsNumber()
  mecanica: number | MecanicaEntity;

  constructor(actividadPorMecanica: ActividadPorMecanicaEntity) {
    this.actividad = actividadPorMecanica.actividad;
    this.mecanica = actividadPorMecanica.mecanica;
  }
}
