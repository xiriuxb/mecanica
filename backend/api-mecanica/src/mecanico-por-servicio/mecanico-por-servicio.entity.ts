import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MecanicoEntity } from '../mecanico/mecanico.entity';
import { ServicioEntity } from '../servicio/servicio.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('mecanico_por_servicio')
export class MecanicoPorServicioEntity extends ClaseGenericaEntity {
  @ManyToOne(type => MecanicoEntity, mecanico => mecanico.mecanicoPorServicio)
  mecanico: MecanicoEntity | number;

  @ManyToOne(type => ServicioEntity, servicio => servicio.mecanicoPorServicio)
  servicio: ServicioEntity | number;
}
