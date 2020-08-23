import {
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { EstadoCivilEnum } from '../../constantes/enums/estado-civil.enum';
import { UsuarioEntity } from '../usuario.entity';

export class EditarUsuarioDto {
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido: string;

  @IsOptional()
  @IsString()
  direccion: string;

  @IsOptional()
  @IsNumberString()
  telefono: string;

  @IsOptional()
  @IsEnum(EstadoCivilEnum)
  @IsString()
  estadoCivil: string;

  @IsOptional()
  @IsNumberString()
  cedula: string;

  @IsOptional()
  @IsBoolean()
  estado: boolean;

  @IsOptional()
  @IsString()
  password: string;

  constructor(usuario: UsuarioEntity) {
    this.nombre = usuario.nombreUsuario;
    this.apellido = usuario.apellidoUsuario;
    this.cedula = usuario.cedulaUsuario;
    this.direccion = usuario.direccionUsuario;
    this.estado = usuario.estadoUsuario;
    this.estadoCivil = usuario.estadoCivilUsuario;
    this.telefono = usuario.telefonoUsuario;
    this.password = usuario.password;
  }
}
