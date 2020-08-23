import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoUsuarioEnum } from '../../constantes/enums/tipo-usuario.enum';
import { RolEntity } from '../rol.entity';

export class CrearRolDto {
  @IsNotEmpty()
  @IsEnum(TipoUsuarioEnum)
  @IsString()
  tipo: string;

  constructor(rol: RolEntity) {
    this.tipo = rol.tipo;
  }
}
