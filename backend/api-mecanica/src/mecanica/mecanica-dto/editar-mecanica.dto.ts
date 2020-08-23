import {
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { MecanicaEntity } from '../mecanica.entity';
import { LugarEntity } from '../../lugar/lugar.entity';

export class EditarMecanicaDto {
  @IsOptional()
  @IsString()
  nombreMecanica: string;

  @IsOptional()
  @IsString()
  descripcionMecanica: string;

  @IsOptional()
  @IsNumberString()
  telefonoMecanica: string;

  @IsOptional()
  @IsBoolean()
  estadoMecanica: boolean;

  @IsOptional()
  @IsNumber()
  lugar: number | LugarEntity;

  @IsOptional()
  @IsString()
  direccionMecanica: string;

  constructor(mecanica: MecanicaEntity) {
    this.nombreMecanica = mecanica.nombreMecanica;
    this.descripcionMecanica = mecanica.descripcionMecanica;
    this.telefonoMecanica = mecanica.telefonoMecanica;
    this.estadoMecanica = mecanica.estadoMecanica;
    this.lugar = mecanica.lugar;
    this.direccionMecanica = mecanica.direccionMecanica;
  }
}
