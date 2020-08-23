import { IsDate, IsNotEmpty } from 'class-validator';
import { HistorialDeCreditoEntity } from '../historial-de-credito.entity';

export class CrearHistorialDeCreditoDto {
  @IsNotEmpty()
  @IsDate()
  fecha: Date;

  constructor(historialDeCredito: HistorialDeCreditoEntity) {
    const fechaAuxiliar = new Date(historialDeCredito.fecha);
    this.fecha = fechaAuxiliar;
  }
}
