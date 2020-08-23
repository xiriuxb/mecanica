import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolPorUsuarioEntity } from '../rol-por-usuario/rol-por-usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('rol')
export class RolEntity extends ClaseGenericaEntity {
  @Column({
    name: 'tipo_usuario',
    type: 'varchar',
    length: 20,
  })
  tipo: string;

  @OneToMany(type => RolPorUsuarioEntity, rolPorUsuario => rolPorUsuario.rol)
  rolPorUsuario: RolPorUsuarioEntity[];
}
