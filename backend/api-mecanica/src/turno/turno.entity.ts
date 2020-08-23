import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TurnoPorMecanicaEntity } from '../turno-por-mecanica/turno-por-mecanica.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('turno')
export class TurnoEntity extends ClaseGenericaEntity {
  @Column({
    name: 'fecha',
    type: 'date',
  })
  fecha: Date;

  @Column({
    name: 'hora',
    type: 'time',
  })
  hora: string;

  @Column({
    name: 'lunes',
    type: 'tinyint',
  })
  lunes: boolean;

  @Column({
    name: 'martes',
    type: 'tinyint',
  })
  martes: boolean;

  @Column({
    name: 'miercoles',
    type: 'tinyint',
  })
  miercoles: boolean;

  @Column({
    name: 'jueves',
    type: 'tinyint',
  })
  jueves: boolean;

  @Column({
    name: 'viernes',
    type: 'tinyint',
  })
  viernes: boolean;

  @Column({
    name: 'sabado',
    type: 'tinyint',
  })
  sabado: boolean;

  @Column({
    name: 'domingo',
    type: 'tinyint',
  })
  domingo: boolean;

  @ManyToOne(
    type => TurnoPorMecanicaEntity,
    turnoPorMecanica => turnoPorMecanica.turno,
  )
  turnoPorMecanica: TurnoPorMecanicaEntity | number;
}
