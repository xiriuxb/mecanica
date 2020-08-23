import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CreditoEntity } from '../credito.entity';

export class EditarCreditoDto {
  @IsOptional()
  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsBoolean()
  aumenta: boolean;

  @IsOptional()
  @IsNumber()
  movimientoEconomico: number;

  constructor(credito: CreditoEntity) {
    this.cantidad = credito.cantidad;
    this.aumenta = credito.aumenta;
    this.movimientoEconomico = credito.movimientoEconomico;
  }
}
