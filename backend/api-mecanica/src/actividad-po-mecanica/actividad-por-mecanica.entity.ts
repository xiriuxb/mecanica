import { Entity, ManyToOne } from 'typeorm';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ActividadEntity } from '../actividades/actividad.entity';
import { MecanicaEntity } from '../mecanica/mecanica.entity';

@Entity('actividad_por_mecanica')
export class ActividadPorMecanicaEntity extends ClaseGenericaEntity {
  @ManyToOne(
    type => ActividadEntity,
    actividad => actividad.actividadPorMecanica,
  )
  actividad: ActividadEntity | number;

  @ManyToOne(type => MecanicaEntity, mecanica => mecanica.actividadPorMecanica)
  mecanica: MecanicaEntity | number;
}
