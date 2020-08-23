import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HistorialDeCreditoEntity } from '../historial-de-credito/historial-de-credito.entity';
import { ClaseGenericaEntity } from '../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('credito')
export class CreditoEntity extends ClaseGenericaEntity {
  @Column({
    name: 'cantidad',
    type: 'float',
  })
  cantidad: number;

  @Column({
    name: 'aumenta',
    type: 'tinyint',
  })
  aumenta: boolean;

  @Column({
    name: 'movimiento_economico',
    type: 'float',
  })
  movimientoEconomico: number;

  @OneToMany(
    type => HistorialDeCreditoEntity,
    historialDeCredito => historialDeCredito.credito,
  )
  historialDeCredito: HistorialDeCreditoEntity[];
}
