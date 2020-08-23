import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { EstadoCivilEnum } from '../../constantes/enums/estado-civil.enum';
import { UsuarioEntity } from '../usuario.entity';

export class CrearUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

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
  // estado: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(usuario: UsuarioEntity) {
    this.nombre = usuario.nombreUsuario;
    this.apellido = usuario.apellidoUsuario;
    this.cedula = usuario.cedulaUsuario;
    this.direccion = usuario.direccionUsuario;
    this.password = usuario.password;
    this.estadoCivil = usuario.estadoCivilUsuario;
    this.telefono = usuario.telefonoUsuario;
  }
}
