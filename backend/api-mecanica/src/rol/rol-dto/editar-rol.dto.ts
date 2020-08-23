import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoUsuarioEnum } from '../../constantes/enums/tipo-usuario.enum';
import { RolEntity } from '../rol.entity';

export class EditarRolDto {
  @IsOptional()
  @IsEnum(TipoUsuarioEnum)
  @IsString()
  tipo: string;

  constructor(rol: RolEntity) {
    this.tipo = rol.tipo;
  }
}
