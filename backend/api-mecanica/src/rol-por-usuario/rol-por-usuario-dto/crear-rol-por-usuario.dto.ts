import { IsNotEmpty, IsNumber } from 'class-validator';
import { RolPorUsuarioEntity } from '../rol-por-usuario.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { RolEntity } from '../../rol/rol.entity';

export class CrearRolPorUsuarioDto {
  @IsNotEmpty()
  @IsNumber()
  usuario: number | UsuarioEntity;

  @IsNotEmpty()
  @IsNumber()
  rol: number | RolEntity;

  constructor(rolPorUsuario: RolPorUsuarioEntity) {
    this.usuario = rolPorUsuario.usuario;
    this.rol = rolPorUsuario.rol;
  }
}
