import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { TurnoEntity } from '../turno.entity';

export class EditarTurnoDto {
  @IsOptional()
  @IsDate()
  fecha: Date;

  @IsOptional()
  @IsString()
  hora: string;

  @IsOptional()
  @IsBoolean()
  lunes: boolean;

  @IsOptional()
  @IsBoolean()
  martes: boolean;

  @IsOptional()
  @IsBoolean()
  miercoles: boolean;

  @IsOptional()
  @IsBoolean()
  jueves: boolean;

  @IsOptional()
  @IsBoolean()
  viernes: boolean;

  @IsOptional()
  @IsBoolean()
  sabado: boolean;

  @IsOptional()
  @IsBoolean()
  domingo: boolean;

  constructor(turno: TurnoEntity) {
    this.fecha = turno.fecha;
    this.hora = turno.hora;
    this.lunes = turno.lunes;
    this.martes = turno.martes;
    this.miercoles = turno.miercoles;
    this.jueves = turno.jueves;
    this.viernes = turno.viernes;
    this.sabado = turno.sabado;
    this.domingo = turno.domingo;
  }
}
