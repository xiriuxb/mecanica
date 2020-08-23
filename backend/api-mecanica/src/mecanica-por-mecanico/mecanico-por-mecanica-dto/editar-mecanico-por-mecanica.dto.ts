import { IsNumber, IsOptional } from 'class-validator';
import { MecanicaEntity } from '../../mecanica/mecanica.entity';
import { MecanicoEntity } from '../../mecanico/mecanico.entity';
import { MecanicaPorMecanicoEntity } from '../mecanica-por-mecanico.entity';

export class EditarMecanicoPorMecanicaDto {
  @IsOptional()
  @IsNumber()
  mecanica: number | MecanicaEntity;

  @IsOptional()
  @IsNumber()
  mecanico: number | MecanicoEntity;

  constructor(mecanicoPorMecanica: MecanicaPorMecanicoEntity) {
    this.mecanica = mecanicoPorMecanica.mecanica;
    this.mecanico = mecanicoPorMecanica.mecanico;
  }
}
