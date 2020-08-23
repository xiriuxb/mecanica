import { Entity, ManyToOne } from 'typeorm';
import { MecanicaEntity } from '../mecanica/mecanica.entity';
import { MecanicoEntity } from '../mecanico/mecanico.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('mecanica_por_macanico')
export class MecanicaPorMecanicoEntity extends ClaseGenericaEntity {
  @ManyToOne(type => MecanicaEntity, mecanica => mecanica.mecanicaPorMecanico)
  mecanica: MecanicaEntity | number;

  @ManyToOne(type => MecanicoEntity, mecanico => mecanico.mecanicaPorMecanico)
  mecanico: MecanicoEntity | number;
}
