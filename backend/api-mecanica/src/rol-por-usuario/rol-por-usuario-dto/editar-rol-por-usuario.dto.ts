import { IsNumber, IsOptional } from 'class-validator';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { RolEntity } from '../../rol/rol.entity';
import { RolPorUsuarioEntity } from '../rol-por-usuario.entity';

export class EditarRolPorUsuarioDto {
  @IsOptional()
  @IsNumber()
  usuario: number | UsuarioEntity;

  @IsOptional()
  @IsNumber()
  rol: number | RolEntity;

  constructor(rolPorUsuario: RolPorUsuarioEntity) {
    this.usuario = rolPorUsuario.usuario;
    this.rol = rolPorUsuario.rol;
  }
}
