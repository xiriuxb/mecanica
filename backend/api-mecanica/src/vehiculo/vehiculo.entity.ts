import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('vehiculo')
export class VehiculoEntity extends ClaseGenericaEntity {
  @Column({
    name: 'placa',
    type: 'varchar',
    length: 8,
  })
  placa: string;

  @Column({
    name: 'anio',
    type: 'int',
  })
  anio: number;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 400,
  })
  descripcion: string;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.vehiculo)
  usuario: UsuarioEntity | number;
}
