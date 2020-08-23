import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { CreditoEntity } from '../credito.entity';

export class CrearCreditoDto {
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsBoolean()
  aumenta: boolean;

  @IsNotEmpty()
  @IsNumber()
  movimientoEconomico: number;

  constructor(credito: CreditoEntity) {
    this.cantidad = credito.cantidad;
    this.aumenta = credito.aumenta;
    this.movimientoEconomico = credito.movimientoEconomico;
  }
}
