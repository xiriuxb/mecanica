import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { VehiculoEntity } from '../vehiculo.entity';

export class CrearVehiculoDto {
  @IsNotEmpty()
  @IsString()
  placa: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  anio: number;

  constructor(vehiculo: VehiculoEntity) {
    this.placa = vehiculo.placa;
    this.descripcion = vehiculo.descripcion;
    this.anio = vehiculo.anio;
  }
}
