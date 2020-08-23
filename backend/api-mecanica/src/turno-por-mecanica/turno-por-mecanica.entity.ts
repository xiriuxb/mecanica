import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TurnoEntity } from '../turno/turno.entity';
import { MecanicaEntity } from '../mecanica/mecanica.entity';
import { TurnoPorUsuarioEntity } from '../turnos-por-usuario/turno-por-usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('turno_por_mecanica')
export class TurnoPorMecanicaEntity extends ClaseGenericaEntity {
  @ManyToOne(type => MecanicaEntity, mecanica => mecanica.turnoPorMecanica)
  mecanica: MecanicaEntity | number;

  @OneToMany(type => TurnoEntity, turno => turno.turnoPorMecanica)
  turno: TurnoEntity[];

  @OneToMany(
    type => TurnoPorUsuarioEntity,
    turnoPorUsuario => turnoPorUsuario.turnoPorMecanica,
  )
  turnoPorUsuario: TurnoPorUsuarioEntity[];
}
