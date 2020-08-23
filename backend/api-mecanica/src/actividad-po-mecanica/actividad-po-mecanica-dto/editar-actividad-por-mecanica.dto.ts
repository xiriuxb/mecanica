import { IsNumber, IsOptional } from 'class-validator';
import { ActividadPorMecanicaEntity } from '../actividad-por-mecanica.entity';
import { ActividadEntity } from '../../actividades/actividad.entity';
import { MecanicaEntity } from '../../mecanica/mecanica.entity';

export class EditarActividadPorMecanicaDto {
  @IsOptional()
  @IsNumber()
  actividad: number | ActividadEntity;

  @IsOptional()
  @IsNumber()
  mecanica: number | MecanicaEntity;

  constructor(actividadPorMecanica: ActividadPorMecanicaEntity) {
    this.actividad = actividadPorMecanica.actividad;
    this.mecanica = actividadPorMecanica.mecanica;
  }
}
