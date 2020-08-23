import { Entity, ManyToOne } from 'typeorm';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ActividadEntity } from '../actividades/actividad.entity';
import { MecanicoEntity } from '../mecanico/mecanico.entity';

@Entity('actividad_por_mecanico')
export class ActividadPorMecanicoEntity extends ClaseGenericaEntity {
  @ManyToOne(
    type => ActividadEntity,
    actividad => actividad.actividadPorMecanico,
  )
  actividad: ActividadEntity | number;

  @ManyToOne(type => MecanicoEntity, mecanico => mecanico.actividadPorMecanico)
  mecanico: MecanicoEntity | number;
}
