import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ServicioEntity } from '../servicio.entity';
import { EstadoVehiculoEnum } from '../../constantes/enums/estado-vehiculo.enum';

export class EditarServicioDto {
  @IsOptional()
  @IsString()
  detalle: string;

  @IsOptional()
  @IsEnum(EstadoVehiculoEnum)
  @IsString()
  estado: string;

  @IsOptional()
  @IsNumber()
  costo: number;

  @IsOptional()
  @IsNumber()
  vehiculo: number;

  constructor(servicio: ServicioEntity) {
    this.detalle = servicio.detalle;
    this.estado = servicio.estado;
    this.costo = servicio.costo;
    this.vehiculo = servicio.vehiculo;
  }
}
