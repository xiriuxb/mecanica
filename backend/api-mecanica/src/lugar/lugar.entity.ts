import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MecanicaEntity } from '../mecanica/mecanica.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('lugar')
export class LugarEntity extends ClaseGenericaEntity {
  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 15,
  })
  nombre: string;

  @OneToMany(type => MecanicaEntity, mecanica => mecanica.lugar)
  mecanica: MecanicaEntity[];
}
