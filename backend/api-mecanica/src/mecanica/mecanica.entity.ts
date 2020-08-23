import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MecanicaPorMecanicoEntity } from '../mecanica-por-mecanico/mecanica-por-mecanico.entity';
import { LugarEntity } from '../lugar/lugar.entity';
import { TurnoPorMecanicaEntity } from '../turno-por-mecanica/turno-por-mecanica.entity';
import { ServicioEntity } from '../servicio/servicio.entity';
import { ClientePorMecanicaEntity } from '../clientes-por-mecanica/cliente-por-mecanica.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ActividadPorMecanicaEntity } from '../actividad-po-mecanica/actividad-por-mecanica.entity';

@Entity('mecanica')
export class MecanicaEntity extends ClaseGenericaEntity {
  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 20,
  })
  nombreMecanica: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 400,
  })
  descripcionMecanica: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    length: 20,
  })
  telefonoMecanica: string;

  @Column({
    name: 'estado',
    type: 'tinyint',
    default: 1,
  })
  estadoMecanica: boolean = true;

  @Column({
    name: 'direccion',
    type: 'varchar',
    length: 100,
  })
  direccionMecanica: string;

  @ManyToOne(type => LugarEntity, lugar => lugar.mecanica)
  lugar: LugarEntity | number;

  @OneToMany(
    type => ActividadPorMecanicaEntity,
    actividadPorMecanica => actividadPorMecanica.mecanica,
  )
  actividadPorMecanica: ActividadPorMecanicaEntity[];

  @OneToMany(
    type => MecanicaPorMecanicoEntity,
    mecanicaPorMecanico => mecanicaPorMecanico.mecanica,
  )
  mecanicaPorMecanico: MecanicaPorMecanicoEntity[];

  @OneToMany(
    type => TurnoPorMecanicaEntity,
    turnoPorMecanica => turnoPorMecanica.mecanica,
  )
  turnoPorMecanica: TurnoPorMecanicaEntity[];

  @OneToMany(type => ServicioEntity, servicio => servicio.mecanica)
  servicio: ServicioEntity[];

  @OneToMany(
    type => ClientePorMecanicaEntity,
    clientePorMecanica => clientePorMecanica.usuario,
  )
  clientePorMecanica: ClientePorMecanicaEntity[];
}
