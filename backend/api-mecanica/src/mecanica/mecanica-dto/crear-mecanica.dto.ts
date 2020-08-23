import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { MecanicaEntity } from '../mecanica.entity';
import { LugarEntity } from '../../lugar/lugar.entity';

export class CrearMecanicaDto {
  @IsNotEmpty()
  @IsString()
  nombreMecanica: string;

  @IsNotEmpty()
  @IsString()
  descripcionMecanica: string;

  @IsNotEmpty()
  @IsNumberString()
  telefonoMecanica: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // estado: boolean;

  @IsNotEmpty()
  @IsNumber()
  lugar: number | LugarEntity;

  @IsNotEmpty()
  @IsString()
  direccionMecanica: string;

  constructor(mecanica: MecanicaEntity) {
    this.nombreMecanica = mecanica.nombreMecanica;
    this.descripcionMecanica = mecanica.descripcionMecanica;
    this.telefonoMecanica = mecanica.telefonoMecanica;
    this.lugar = mecanica.lugar;
    this.direccionMecanica = mecanica.direccionMecanica;
    // this.estado = mecanica.estadoMecanica;
  }
}
