import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MecanicaEntity } from '../mecanica/mecanica.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('cliente_por_mecanica')
export class ClientePorMecanicaEntity extends ClaseGenericaEntity {
  @ManyToOne(type => MecanicaEntity, mecanica => mecanica.clientePorMecanica)
  mecanica: MecanicaEntity | number;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.clientePorMecanica)
  usuario: UsuarioEntity | number;
}
