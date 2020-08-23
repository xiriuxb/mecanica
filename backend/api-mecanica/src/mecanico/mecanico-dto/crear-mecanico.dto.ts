import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { EstadoCivilEnum } from '../../constantes/enums/estado-civil.enum';
import { MecanicoEntity } from '../mecanico.entity';

export class CrearMecanicoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsNumberString()
  telefono: string;

  @IsNotEmpty()
  @IsEnum(EstadoCivilEnum)
  @IsString()
  estadoCivil: string;

  @IsNotEmpty()
  @IsNumberString()
  cedula: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // estado: boolean = true;

  constructor(mecanico: MecanicoEntity) {
    this.nombre = mecanico.nombreMecanico;
    this.apellido = mecanico.apellidoMecanico;
    this.telefono = mecanico.telefonoMecanico;
    // this.estado = mecanico.estadoMecanico;
    this.estadoCivil = mecanico.estadoCivilMecanico;
    this.cedula = mecanico.cedulaMecanico;
  }
}
