import { IsNotEmpty, IsNumber } from 'class-validator';
import { MecanicoPorServicioEntity } from '../mecanico-por-servicio.entity';
import { MecanicoEntity } from '../../mecanico/mecanico.entity';
import { ServicioEntity } from '../../servicio/servicio.entity';

export class CrearMecanicoPorServicioDto {
  @IsNotEmpty()
  @IsNumber()
  mecanico: number | MecanicoEntity;

  @IsNotEmpty()
  @IsNumber()
  servicio: number | ServicioEntity;

  constructor(mecanicoPorServicio: MecanicoPorServicioEntity) {
    this.mecanico = mecanicoPorServicio.mecanico;
    this.servicio = mecanicoPorServicio.servicio;
  }
}
