import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ServicioEntity } from '../servicio.entity';
import { EstadoVehiculoEnum } from '../../constantes/enums/estado-vehiculo.enum';

export class CrearServicioDto {
  @IsNotEmpty()
  @IsString()
  detalle: string;

  @IsNotEmpty()
  @IsEnum(EstadoVehiculoEnum)
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsNumber()
  costo: number;

  @IsNotEmpty()
  @IsNumber()
  vehiculo: number;

  constructor(servicio: ServicioEntity) {
    this.detalle = servicio.detalle;
    this.estado = servicio.estado;
    this.costo = servicio.costo;
    this.vehiculo = servicio.vehiculo;
  }
}
