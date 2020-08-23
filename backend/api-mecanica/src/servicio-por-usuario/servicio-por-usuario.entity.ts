import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TurnoPorUsuarioEntity } from '../turnos-por-usuario/turno-por-usuario.entity';
import { ServicioEntity } from '../servicio/servicio.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('servicio_por_usuario')
export class ServicioPorUsuarioEntity extends ClaseGenericaEntity {
  @ManyToOne(
    type => TurnoPorUsuarioEntity,
    turnoPorUsuario => turnoPorUsuario.servicioPorUsuario,
  )
  turnoPorUsuario: TurnoPorUsuarioEntity | number;

  @ManyToOne(type => ServicioEntity, servicio => servicio.servicioPorUsuario)
  servicio: ServicioEntity | number;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.servicioPorUsuario)
  usuario: UsuarioEntity | number;
}
