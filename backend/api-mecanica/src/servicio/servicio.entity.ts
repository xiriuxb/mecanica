import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MecanicaEntity } from '../mecanica/mecanica.entity';
import { MecanicoPorServicioEntity } from '../mecanico-por-servicio/mecanico-por-servicio.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ServicioPorUsuarioEntity } from '../servicio-por-usuario/servicio-por-usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('servicio')
export class ServicioEntity extends ClaseGenericaEntity {
  @Column({
    name: 'detalle',
    type: 'varchar',
    length: 400,
  })
  detalle: string;

  @Column({
    name: 'estado',
    type: 'varchar',
  })
  estado: string;

  @Column({
    name: 'costo',
    type: 'float',
  })
  costo: number;

  @Column({
    name: 'vehiculo',
    type: 'int',
  })
  vehiculo: number;

  @ManyToOne(type => MecanicaEntity, mecanica => mecanica.servicio)
  mecanica: MecanicaEntity | number;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.servicio)
  usuario: UsuarioEntity | number;

  @OneToMany(
    type => MecanicoPorServicioEntity,
    mecanicoPorServicio => mecanicoPorServicio.servicio,
  )
  mecanicoPorServicio: MecanicoPorServicioEntity[];

  @OneToMany(
    type => ServicioPorUsuarioEntity,
    servicioPorUsuario => servicioPorUsuario.servicio,
  )
  servicioPorUsuario: ServicioPorUsuarioEntity[];
}
