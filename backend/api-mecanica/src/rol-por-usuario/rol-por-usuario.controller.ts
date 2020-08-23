import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../clases-genericas/clase-generica-component/clase-generica.controller';
import { RolPorUsuarioEntity } from './rol-por-usuario.entity';
import { RolPorUsuarioService } from './rol-por-usuario.service';
import { CrearRolPorUsuarioDto } from './rol-por-usuario-dto/crear-rol-por-usuario.dto';
import { EditarRolPorUsuarioDto } from './rol-por-usuario-dto/editar-rol-por-usuario.dto';

@Controller('rol-por-usuario')
export class RolPorUsuarioController extends ClaseGenericaController<
  RolPorUsuarioEntity
> {
  crearDto = CrearRolPorUsuarioDto;
  editarDto = EditarRolPorUsuarioDto;

  constructor(private readonly _rolPorUsuarioService: RolPorUsuarioService) {
    super(_rolPorUsuarioService);
  }
}
