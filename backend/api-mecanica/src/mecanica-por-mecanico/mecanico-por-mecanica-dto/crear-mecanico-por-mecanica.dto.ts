import { IsNotEmpty, IsNumber } from 'class-validator';
import { MecanicaPorMecanicoEntity } from '../mecanica-por-mecanico.entity';
import { MecanicaEntity } from '../../mecanica/mecanica.entity';
import { MecanicoEntity } from '../../mecanico/mecanico.entity';

export class CrearMecanicoPorMecanicaDto {
  @IsNotEmpty()
  @IsNumber()
  mecanica: number | MecanicaEntity;

  @IsNotEmpty()
  @IsNumber()
  mecanico: number | MecanicoEntity;

  constructor(mecanicoPorMecanica: MecanicaPorMecanicoEntity) {
    this.mecanica = mecanicoPorMecanica.mecanica;
    this.mecanico = mecanicoPorMecanica.mecanico;
  }
}
