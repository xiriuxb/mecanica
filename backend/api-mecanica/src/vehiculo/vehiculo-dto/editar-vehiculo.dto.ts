import { IsNumber, IsOptional, IsString } from 'class-validator';
import { VehiculoEntity } from '../vehiculo.entity';

export class EditarVehiculoDto {
  @IsOptional()
  @IsString()
  placa: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  anio: number;

  constructor(vehiculo: VehiculoEntity) {
    this.placa = vehiculo.placa;
    this.descripcion = vehiculo.descripcion;
    this.anio = vehiculo.anio;
  }
}
