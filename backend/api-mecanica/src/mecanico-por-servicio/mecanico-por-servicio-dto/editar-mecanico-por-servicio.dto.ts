import { IsNumber, IsOptional } from 'class-validator';
import { MecanicoEntity } from '../../mecanico/mecanico.entity';
import { ServicioEntity } from '../../servicio/servicio.entity';
import { MecanicoPorServicioEntity } from '../mecanico-por-servicio.entity';

export class EditarMecanicoPorServicioDto {
  @IsOptional()
  @IsNumber()
  mecanico: number | MecanicoEntity;

  @IsOptional()
  @IsNumber()
  servicio: number | ServicioEntity;

  constructor(mecanicoPorServicio: MecanicoPorServicioEntity) {
    this.mecanico = mecanicoPorServicio.mecanico;
    this.servicio = mecanicoPorServicio.servicio;
  }
}
