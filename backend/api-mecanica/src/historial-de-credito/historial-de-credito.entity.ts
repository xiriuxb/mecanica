import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { CreditoEntity } from '../credito/credito.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('historial_de_credito')
export class HistorialDeCreditoEntity extends ClaseGenericaEntity {
  @Column({
    name: 'fecha',
    type: 'date',
  })
  fecha: Date;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.historiaDeCredito)
  usuario: UsuarioEntity | number;

  @ManyToOne(type => CreditoEntity, credito => credito.historialDeCredito)
  credito: CreditoEntity | number;
}
