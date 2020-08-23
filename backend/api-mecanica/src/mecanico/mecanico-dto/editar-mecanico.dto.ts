import { MecanicoEntity } from '../mecanico.entity';
import {
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { EstadoCivilEnum } from '../../constantes/enums/estado-civil.enum';

export class EditarMecanicoDto {
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido: string;

  @IsOptional()
  @IsNumberString()
  telefono: string;

  @IsOptional()
  @IsBoolean()
  estado: boolean;

  @IsOptional()
  @IsEnum(EstadoCivilEnum)
  @IsString()
  estadoCivil: string;

  @IsOptional()
  @IsNumberString()
  cedula: string;

  constructor(mecanico: MecanicoEntity) {
    this.nombre = mecanico.nombreMecanico;
    this.apellido = mecanico.apellidoMecanico;
    this.telefono = mecanico.telefonoMecanico;
    this.estado = mecanico.estadoMecanico;
    this.estadoCivil = mecanico.estadoCivilMecanico;
    this.cedula = mecanico.cedulaMecanico;
  }
}
