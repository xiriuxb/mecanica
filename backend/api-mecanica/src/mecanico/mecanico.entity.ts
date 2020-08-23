import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MecanicaPorMecanicoEntity } from '../mecanica-por-mecanico/mecanica-por-mecanico.entity';
import { MecanicoPorServicioEntity } from '../mecanico-por-servicio/mecanico-por-servicio.entity';
import { TurnoPorUsuarioEntity } from '../turnos-por-usuario/turno-por-usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ActividadPorMecanicoEntity } from '../actividad-por-mecanico/actividad-por-mecanico.entity';

@Entity('mecanico')
export class MecanicoEntity extends ClaseGenericaEntity {
  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 20,
  })
  nombreMecanico: string;

  @Column({
    name: 'apellido',
    type: 'varchar',
    length: 20,
  })
  apellidoMecanico: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    length: 10,
  })
  telefonoMecanico: string;

  @Column({
    name: 'estado_civil',
    type: 'varchar',
    length: 10,
  })
  estadoCivilMecanico: string;

  @Column({
    name: 'cedula',
    type: 'varchar',
    length: 10,
    unique: true,
  })
  cedulaMecanico: string;

  @Column({
    name: 'estado',
    type: 'tinyint',
    default: 1,
  })
  estadoMecanico: boolean = true;

  @OneToMany(
    type => ActividadPorMecanicoEntity,
    actividadPorMecanico => actividadPorMecanico.mecanico,
  )
  actividadPorMecanico: ActividadPorMecanicoEntity[];

  @OneToMany(
    type => MecanicaPorMecanicoEntity,
    mecanicaPorMecanico => mecanicaPorMecanico.mecanico,
  )
  mecanicaPorMecanico: MecanicaPorMecanicoEntity[];

  @OneToMany(
    type => MecanicoPorServicioEntity,
    mecanicoPorServicio => mecanicoPorServicio.mecanico,
  )
  mecanicoPorServicio: MecanicoPorServicioEntity[];

  @OneToMany(
    type => TurnoPorUsuarioEntity,
    turnoPorUsuario => turnoPorUsuario.mecanico,
  )
  turnoPorUsuario: TurnoPorUsuarioEntity[];
}
