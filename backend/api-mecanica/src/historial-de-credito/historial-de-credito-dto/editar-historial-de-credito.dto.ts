import { IsDate, IsOptional } from 'class-validator';
import { HistorialDeCreditoEntity } from '../historial-de-credito.entity';

export class EditarHistorialDeCreditoDto {
  @IsOptional()
  @IsDate()
  fecha: Date;

  constructor(historialDeCredito: HistorialDeCreditoEntity) {
    this.fecha = historialDeCredito.fecha;
  }
}
