import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { RolEntity } from '../rol/rol.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('rol_por_usuario')
export class RolPorUsuarioEntity extends ClaseGenericaEntity {
  @ManyToOne(type => UsuarioEntity, usuario => usuario.rolPorUsuario)
  usuario: UsuarioEntity | number;

  @ManyToOne(type => RolEntity, rol => rol.rolPorUsuario)
  rol: RolEntity | number;
}
