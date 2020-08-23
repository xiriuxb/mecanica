import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { TurnoEntity } from '../turno.entity';

export class CrearTurnoDto {
  @IsNotEmpty()
  @IsDate()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  hora: string;

  @IsNotEmpty()
  @IsBoolean()
  lunes: boolean;

  @IsNotEmpty()
  @IsBoolean()
  martes: boolean;

  @IsNotEmpty()
  @IsBoolean()
  miercoles: boolean;

  @IsNotEmpty()
  @IsBoolean()
  jueves: boolean;

  @IsNotEmpty()
  @IsBoolean()
  viernes: boolean;

  @IsNotEmpty()
  @IsBoolean()
  sabado: boolean;

  @IsNotEmpty()
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
