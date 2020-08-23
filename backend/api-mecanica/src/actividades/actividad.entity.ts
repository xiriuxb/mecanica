import { Column, Entity, OneToMany } from 'typeorm';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ActividadPorMecanicaEntity } from '../actividad-po-mecanica/actividad-por-mecanica.entity';
import { ActividadPorMecanicoEntity } from '../actividad-por-mecanico/actividad-por-mecanico.entity';

@Entity('actividad')
export class ActividadEntity extends ClaseGenericaEntity {
  @Column({
    name: 'detalle_actividades',
    type: 'varchar',
    length: 50,
  })
  detalleActividad: string;

  @OneToMany(
    type => ActividadPorMecanicaEntity,
    actividadPorMecanica => actividadPorMecanica.actividad,
  )
  actividadPorMecanica: ActividadPorMecanicaEntity[];

  @OneToMany(
    type => ActividadPorMecanicoEntity,
    actividadPorMecanico => actividadPorMecanico.actividad,
  )
  actividadPorMecanico: ActividadPorMecanicoEntity[];
}
