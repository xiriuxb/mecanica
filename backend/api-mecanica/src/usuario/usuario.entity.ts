import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HistorialDeCreditoEntity } from '../historial-de-credito/historial-de-credito.entity';
import { ClientePorMecanicaEntity } from '../clientes-por-mecanica/cliente-por-mecanica.entity';
import { ServicioEntity } from '../servicio/servicio.entity';
import { ServicioPorUsuarioEntity } from '../servicio-por-usuario/servicio-por-usuario.entity';
import { TurnoPorUsuarioEntity } from '../turnos-por-usuario/turno-por-usuario.entity';
import { VehiculoEntity } from '../vehiculo/vehiculo.entity';
import { RolPorUsuarioEntity } from '../rol-por-usuario/rol-por-usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('usuario')
export class UsuarioEntity extends ClaseGenericaEntity {
  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 20,
  })
  nombreUsuario: string;

  @Column({
    name: 'apellido',
    type: 'varchar',
    length: 20,
  })
  apellidoUsuario: string;

  @Column({
    name: 'direccion',
    type: 'varchar',
    length: 400,
  })
  direccionUsuario: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    length: 20,
  })
  telefonoUsuario: string;

  @Column({
    name: 'estado_civil',
    type: 'varchar',
    length: 20,
  })
  estadoCivilUsuario: string;

  @Column({
    name: 'cedula',
    type: 'varchar',
    length: 20,
  })
  cedulaUsuario: string;

  @Column({
    name: 'estado',
    type: 'tinyint',
    default: 1,
  })
  estadoUsuario: boolean = true;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 20,
  })
  password: string = 'A12345678a';

  @OneToMany(
    type => HistorialDeCreditoEntity,
    historiaDeCredito => historiaDeCredito.usuario,
  )
  historiaDeCredito: HistorialDeCreditoEntity[];

  @OneToMany(
    type => ClientePorMecanicaEntity,
    clientePorMecanica => clientePorMecanica.usuario,
  )
  clientePorMecanica: ClientePorMecanicaEntity[];

  @OneToMany(type => ServicioEntity, servicio => servicio.usuario)
  servicio: ServicioEntity[];

  @OneToMany(
    type => ServicioPorUsuarioEntity,
    servicioPorUsuario => servicioPorUsuario.usuario,
  )
  servicioPorUsuario: ServicioPorUsuarioEntity[];

  @OneToMany(
    type => TurnoPorUsuarioEntity,
    turnoPorUsuario => turnoPorUsuario.usuario,
  )
  turnoPorUsuario: TurnoPorUsuarioEntity[];

  @OneToMany(type => VehiculoEntity, vehiculo => vehiculo.usuario)
  vehiculo: VehiculoEntity[];

  @OneToMany(
    type => RolPorUsuarioEntity,
    rolPorUsuario => rolPorUsuario.usuario,
  )
  rolPorUsuario: RolPorUsuarioEntity[];
}
