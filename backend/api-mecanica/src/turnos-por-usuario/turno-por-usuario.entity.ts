import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TurnoPorMecanicaEntity } from '../turno-por-mecanica/turno-por-mecanica.entity';
import { MecanicoEntity } from '../mecanico/mecanico.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ServicioPorUsuarioEntity } from '../servicio-por-usuario/servicio-por-usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('turnos_por_usuario')
export class TurnoPorUsuarioEntity extends ClaseGenericaEntity {
  @Column({
    name: 'estado',
    type: 'tinyint',
  })
  estado: boolean;

  @ManyToOne(
    type => TurnoPorMecanicaEntity,
    turnoPorMecanica => turnoPorMecanica.turnoPorUsuario,
  )
  turnoPorMecanica: TurnoPorMecanicaEntity | number;

  @ManyToOne(type => MecanicoEntity, mecanico => mecanico.turnoPorUsuario)
  mecanico: MecanicoEntity | number;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.turnoPorUsuario)
  usuario: UsuarioEntity | number;

  @OneToMany(
    type => ServicioPorUsuarioEntity,
    servicioPorUsuario => servicioPorUsuario.turnoPorUsuario,
  )
  servicioPorUsuario: ServicioPorUsuarioEntity[];
}
